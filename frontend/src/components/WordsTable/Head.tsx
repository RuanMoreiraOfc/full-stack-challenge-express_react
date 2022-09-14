import type { TableHeadProps } from '@chakra-ui/react';
import { Thead } from '@chakra-ui/react';

export default WordsTableHead;
export type { WordsTableHeadProps };

type WordsTableHeadProps = TableHeadProps;

function WordsTableHead({ children, ...props }: WordsTableHeadProps) {
   return <Thead {...props}>{children}</Thead>;
}
