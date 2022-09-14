import { CanceledError } from 'axios';
import Cookies from 'js-cookie';

import { apiGet } from '@services/api';

import { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Flex, Grid, Heading, Text } from '@chakra-ui/react';

import Player from './Player';

export default WordCard;
export type { WordCardProps, WordCardTreatedApiData };

type WordCardApiData = {
   word: string;
   meanings?: Array<{
      partOfSpeech: string;
      definitions: Array<{
         definition: string;
      }>;
   }>;
} & (
   | {
        phonetic?: never;
        phonetics: Array<
           | {
                text?: never;
                audio: string;
             }
           | {
                text: string;
                audio: string;
             }
        >;
     }
   | {
        phonetic: string;
        phonetics?: never;
     }
);

type WordCardTreatedApiData = {
   word: string;
   phonetic?: {
      text: string;
      audio?: string;
   };
   meaning?: {
      partOfSpeech: string;
      definition: string;
   };
};

type WordCardProps = {
   isFavorite: boolean;
   onToggleFavorite: (data: { word: string; shouldRemove: boolean }) => void;
   prev?: string;
   word: string;
   next?: string;
   onNavigateLeft: () => void;
   onNavigateRight: () => void;
};

WordCard.Player = Player;

function WordCard({
   isFavorite,
   onToggleFavorite,
   prev,
   word,
   next,
   onNavigateLeft,
   onNavigateRight,
}: WordCardProps) {
   const abortController = useRef<AbortController>();

   const navigate = useNavigate();

   const [isFetching, setIsFetching] = useState(false);
   const [cardTreatedApiData, setCardTreatedApiData] =
      useState<WordCardTreatedApiData | null>(null);

   // -- Setup Abort Controller
   useEffect(() => {
      abortController.current = new AbortController();

      return () => {
         abortController.current?.abort();
      };
   }, []);

   // -- Mark as viewed via api
   useEffect(() => {
      async function main() {
         setIsFetching(true);

         const { error, data } = await apiGet<{
            success: WordCardApiData[];
         }>(`/entries/en/${word}`, {
            signal: abortController.current?.signal,
            headers: {
               authorization: `Bearer ${Cookies.get('jwt_token')}`,
            },
         });

         setIsFetching(false);

         if (error) {
            if (error instanceof CanceledError) {
               return;
            }

            if (error.response?.status === 401) {
               Cookies.remove('jwt_token');
               navigate('/signin', {
                  state: {
                     reason: 'Login again, your token expired!',
                  },
               });
               return;
            }

            setCardTreatedApiData({ word });
            return;
         }

         const phonetic = ((phonetic, phonetics) => {
            if (!phonetics && !phonetic) {
               return undefined;
            }

            if (phonetics) {
               const result = phonetics
                  .map(({ audio, text }) => ({
                     audio,
                     text: text as string,
                  }))
                  .find((p) => p.text !== undefined && p.audio !== undefined);

               if (result) {
                  return result;
               }
            }

            if (phonetic) {
               return { text: phonetic };
            }
         })(data[0]?.phonetic, data[0]?.phonetics);

         const meaning = ((meanings) => {
            const result = meanings?.map(({ definitions, partOfSpeech }) => ({
               partOfSpeech,
               definition: definitions[0].definition,
            }))[0];

            return result;
         })(data[0].meanings);

         const treatedData: WordCardTreatedApiData = {
            word: data[0].word,
            phonetic,
            meaning,
         };

         setCardTreatedApiData(treatedData);
         return;
      }

      main();
   }, [word]);

   // -- Mark as favorite via api
   const toggleFavoriteHandler = useCallback(async () => {
      const { error } = await apiGet(
         `/entries/en/${word}/${isFavorite ? 'un' : ''}favorite`,
         {
            method: isFavorite ? 'DELETE' : 'POST',
            signal: abortController.current?.signal,
            headers: {
               authorization: `Bearer ${Cookies.get('jwt_token')}`,
            },
         },
      );

      if (!error) {
         onToggleFavorite({ shouldRemove: isFavorite, word });
         return;
      }

      if (error instanceof CanceledError) {
         return;
      }

      if (error.response?.status === 401) {
         Cookies.remove('jwt_token');
         navigate('/signin', {
            state: {
               reason: 'Login again, your token expired!',
            },
         });
         return;
      }
   }, [word, isFavorite, onToggleFavorite]);

   // ***

   const hideOnFetch = (value: any) => (isFetching ? '...' : value);

   const wordFromApi = hideOnFetch(cardTreatedApiData?.word);
   const phoneticWord = hideOnFetch(cardTreatedApiData?.phonetic?.text);
   const audioSrc = cardTreatedApiData?.phonetic?.audio;
   const partOfSpeech = hideOnFetch(cardTreatedApiData?.meaning?.partOfSpeech);
   const definition = hideOnFetch(cardTreatedApiData?.meaning?.definition);

   return (
      <Grid placeItems='left center' gap='4'>
         <Grid
            maxW='100%'
            w='max(75%, 17.5rem)'
            margin='0 auto'
            gap='inherit'
            alignContent='center'
            textAlign='center'
            bgColor='#FBB6CE55'
            border='1px solid'
            sx={{ aspectRatio: '16/9' }}
         >
            <Heading fontSize='100%'>{wordFromApi}</Heading>
            <Text as='span' fontSize='125%'>
               {phoneticWord}
            </Text>
         </Grid>
         {audioSrc && <Player audioSrc={audioSrc} />}
         <Button
            border='1px solid currentColor'
            onClick={toggleFavoriteHandler}
            colorScheme={isFavorite ? 'red' : undefined}
         >
            {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
         </Button>
         {partOfSpeech && (
            <Grid gap='inherit'>
               <Heading as='h3'>Meanings</Heading>
               <Text>
                  <Text as='span' textTransform='capitalize'>
                     {partOfSpeech}
                  </Text>{' '}
                  - {definition}
               </Text>
            </Grid>
         )}
         <Flex
            gap='8'
            sx={{ '> *': { flex: 1, border: '1px solid currentColor' } }}
         >
            <Button isDisabled={prev === undefined} onClick={onNavigateLeft}>
               Previous
            </Button>
            <Button isDisabled={next === undefined} onClick={onNavigateRight}>
               Next
            </Button>
         </Flex>
      </Grid>
   );
}
