import type { ReactNode } from 'react';

import { Fragment } from 'react';
import type { TableProps } from '@chakra-ui/react';
import { Table } from '@chakra-ui/react';

import WordsTableHead from './Head';
import type { WordsTableBodyDefaultProps } from './Body';
import WordsTableBody from './Body';

export default WordsTable;
export type { WordsTableProps, WordsTableDefaultProps };

type WordsTableProps = TableProps & WordsTableDefaultProps;
type WordsTableDefaultProps = WordsTableBodyDefaultProps;

const defaultProps: WordsTableDefaultProps = {
   children: (props) => (
      <Fragment>
         <WordsTableHead />
         <WordsTableBody {...props} />
      </Fragment>
   ),
};

WordsTable.defaultProps = defaultProps;
WordsTable.Head = WordsTableHead;
WordsTable.Body = WordsTableBody;

function WordsTable({
   children,
   wordList,
   initSelectWordHandler: selectWord,
   ...props
}: WordsTableProps) {
   let childrenTransformed: ReactNode = children;

   if (typeof children === 'function') {
      childrenTransformed = children({
         wordList,
         initSelectWordHandler: selectWord,
      });
   }

   return <Table {...props}>{childrenTransformed}</Table>;
}
