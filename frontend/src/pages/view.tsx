import { useState, useEffect, Fragment, useCallback } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import type {
   SelectedWordData,
   UseInfiniteWordTableReturn,
} from '@hooks/useInfiniteWordTable';
import useInfiniteWordTable from '@hooks/useInfiniteWordTable';

import {
   Box,
   Flex,
   Grid,
   CloseButton,
   Tabs,
   TabList,
   TabPanels,
   Tab,
   TabPanel,
   Th,
   Tr,
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet';

import WordCard from '@components/WordCard';
import WordsTable from '@components/WordsTable';

export default View;

function View() {
   const [selectedTabIndex, setSelectedTabIndex] = useState(0);
   const [lastSelectedWordData, setSelectedWordData] =
      useState<SelectedWordData | null>(null);

   const { isOpen, onClose, onOpen } = useDisclosure();

   const wordListData = useInfiniteWordTable('/entries/en');
   const historyListData = useInfiniteWordTable('/user/me/history');
   const favoriteListData = useInfiniteWordTable('/user/me/favorites');

   const tabs: Array<{ heading: string; data: UseInfiniteWordTableReturn }> = [
      { heading: 'Word List', data: wordListData },
      { heading: 'History', data: historyListData },
      { heading: 'Favorites', data: favoriteListData },
   ];

   const tabDataList = [
      wordListData.selectedWordData,
      historyListData.selectedWordData,
      favoriteListData.selectedWordData,
   ];

   // -- Set selected word of the current tab
   useEffect(() => {
      setSelectedWordData(tabDataList[selectedTabIndex]);
   }, tabDataList);

   // -- Separate - Prev | Current | Next - based on select word
   // Only is a bug if you don't use as a feature
   const prevWord =
      lastSelectedWordData?.prevWord ??
      wordListData.results[(lastSelectedWordData?.index || 0) - 1];

   const currentWord = lastSelectedWordData?.word ?? wordListData.results[0];

   const nextWord = lastSelectedWordData?.word
      ? lastSelectedWordData?.nextWord ??
        wordListData.results[lastSelectedWordData?.index + 1]
      : wordListData.results[1];

   // -- Mark as viewed without refetching
   useEffect(() => {
      const selectedWord = lastSelectedWordData?.word;
      if (selectedWord === undefined) {
         return;
      }

      const { PER_PAGE, results } = historyListData;

      const newCursor = Math.ceil(results.length / PER_PAGE);

      historyListData.manipulateCursor((oldCursor) => newCursor);
      historyListData.manipulateResults((oldResults) => {
         if (oldResults.includes(selectedWord)) {
            return oldResults;
         }

         return [...oldResults, selectedWord];
      });
   }, [currentWord]);

   // -- Card Handlers
   const toggleFavoriteHandler = useCallback(
      ({ word, shouldRemove }: { word: string; shouldRemove: boolean }) => {
         const { PER_PAGE, results } = favoriteListData;

         const newCursor = Math.ceil(results.length / PER_PAGE);

         favoriteListData.manipulateCursor((oldCursor) => newCursor);
         favoriteListData.manipulateResults((oldResults) => {
            if (oldResults.includes(word)) {
               if (!shouldRemove) {
                  return oldResults;
               }

               return oldResults.filter((result) => result !== word);
            }

            return [...oldResults, word];
         });
      },
      [favoriteListData.manipulateResults],
   );

   const navigateLeftHandler = useCallback(() => {
      setSelectedWordData((oldState) => {
         const tabData = tabs[selectedTabIndex];
         const wordList = tabData.data.results;

         const currentIndex =
            wordList.findIndex((e) => e === oldState?.word) - 1;
         const prevIndex = currentIndex + -1;
         const nextIndex = currentIndex + 1;

         return {
            index: currentIndex,
            prev: wordList[prevIndex],
            word: wordList[currentIndex],
            next: wordList[nextIndex],
         };
      });
   }, []);

   const navigateRightHandler = useCallback(() => {
      setSelectedWordData((oldState) => {
         const tabData = tabs[selectedTabIndex];
         const wordList = tabData.data.results;

         const oldIndex = wordList.findIndex((e) => e === oldState?.word);

         const currentIndex = oldIndex === -1 ? 1 : oldIndex + 1;

         const prevIndex = currentIndex + -1;
         const nextIndex = currentIndex + 1;

         return {
            index: currentIndex,
            prev: wordList[prevIndex],
            word: wordList[currentIndex],
            next: wordList[nextIndex],
         };
      });
   }, [prevWord, currentWord, nextWord]);

   return (
      <Fragment>
         <Box as='header' h={70} bgColor='blue.400' />
         <Flex
            as='main'
            data-limited-box
            h='calc(100vh - 70px)'
            placeItems='center'
            gap='12'
         >
            <Helmet>
               <title>View | Fullstack Challenge</title>
            </Helmet>

            {/* Card  */}
            <Grid
               maxW={{
                  md: '17.5rem',
               }}
               w='full'
               h='full'
               px={{ base: 'mobile-base', md: 'unset' }}
               bgColor='base'
               zIndex='popover'
               alignContent='center'
               gap='4'
               pos={{ base: 'fixed', md: 'relative' }}
               display={{ base: isOpen ? 'grid' : 'none', md: 'grid' }}
               top='0'
               left='0'
            >
               <CloseButton onClick={onClose} display={{ md: 'none' }} />
               {currentWord && (
                  <WordCard
                     isFavorite={favoriteListData.results.includes(currentWord)}
                     onToggleFavorite={toggleFavoriteHandler}
                     prev={prevWord}
                     word={currentWord}
                     next={nextWord}
                     onNavigateLeft={navigateLeftHandler}
                     onNavigateRight={navigateRightHandler}
                  />
               )}
            </Grid>

            {/* TABS  */}
            <Grid w='full'>
               <Tabs w='full' onChange={setSelectedTabIndex}>
                  <TabList>
                     {tabs.map(({ heading, data }) => (
                        <Tab
                           key={'tab:' + heading}
                           isDisabled={data.results.length === 0}
                        >
                           {heading}
                        </Tab>
                     ))}
                  </TabList>

                  <TabPanels>
                     {tabs.map(({ heading, data }) => (
                        <TabPanel key={'tabpanel:' + heading} tabIndex={-1}>
                           <WordsTable>
                              <WordsTable.Head borderBottom='1px solid'>
                                 <Tr
                                    display='flex'
                                    sx={{
                                       '> *': {
                                          h: '10',
                                          px: { base: '0', sm: '6' },
                                       },
                                    }}
                                 >
                                    <Th>{heading}</Th>
                                    <Th flex='1' />
                                    <Th role='alert'>
                                       {data.isFetching &&
                                          (data.hasMore
                                             ? 'Fetching more...'
                                             : 'End Reached')}
                                    </Th>
                                 </Tr>
                              </WordsTable.Head>
                              <WordsTable.Body
                                 wordList={data.results}
                                 initSelectWordHandler={(wordData) => (e) => {
                                    onOpen();
                                    data.initSelectWordHandler(wordData)(e);
                                 }}
                                 data-thin-scroller
                                 h={175}
                                 display='block'
                                 overflowY='scroll'
                                 onScroll={data.onScroll}
                              />
                           </WordsTable>
                        </TabPanel>
                     ))}
                  </TabPanels>
               </Tabs>
            </Grid>
         </Flex>
      </Fragment>
   );
}
