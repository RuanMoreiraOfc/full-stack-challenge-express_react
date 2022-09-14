import type { ReactNode, MouseEventHandler } from 'react';

import type { TableBodyProps } from '@chakra-ui/react';
import { Box, Grid, Tr, Td, Tbody } from '@chakra-ui/react';
import { Never } from '@~types/never';

export default WordsTableBody;
export type {
   WordsTableBodyProps,
   WordsTableBodyDefaultProps,
   WordsTableBodyExclusiveProps,
   InitSelectWordHandlerWordsTableBodyExclusiveProp,
};

type WordsTableBodyProps = TableBodyProps & WordsTableBodyDefaultProps;

type InitSelectWordHandlerWordsTableBodyExclusiveProp = (data: {
   word: string;
   index: number;
}) => MouseEventHandler<HTMLElement>;

type WordsTableBodyExclusiveProps = {
   wordList?: string[];
   initSelectWordHandler?: InitSelectWordHandlerWordsTableBodyExclusiveProp;
};

type WordsTableBodyDefaultProps =
   | ({
        children: (props: WordsTableBodyExclusiveProps) => ReactNode;
     } & WordsTableBodyExclusiveProps)
   | ({
        children: ReactNode;
     } & Never<WordsTableBodyExclusiveProps>);

const defaultProps: WordsTableBodyDefaultProps = {
   children: ({ wordList = [], initSelectWordHandler }) => (
      <Grid as={Tr} gridTemplateColumns='repeat(auto-fit, minmax(150px, 1fr))'>
         {wordList.map((word, index) => (
            <Td key={word} border='1px solid black' pos='relative'>
               <Box
                  as='button'
                  pos='absolute'
                  inset='0'
                  outlineColor='blue.600'
                  onClick={initSelectWordHandler?.({ word, index })}
               >
                  {word}
               </Box>
               {/* JUST TO AVOID REMOVE `TD` PADDING */}
               <Box as='span' visibility='hidden'>
                  .
               </Box>
            </Td>
         ))}
      </Grid>
   ),
};

WordsTableBody.defaultProps = defaultProps;

function WordsTableBody({
   wordList,
   initSelectWordHandler,
   children,
   ...props
}: WordsTableBodyProps) {
   let childrenTransformed: ReactNode = children;

   if (typeof children === 'function') {
      childrenTransformed = children({
         wordList,
         initSelectWordHandler,
      });
   }

   return <Tbody {...props}>{childrenTransformed}</Tbody>;
}
