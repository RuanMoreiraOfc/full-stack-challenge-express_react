import Cookies from 'js-cookie';

import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UseScrollLoadingReturn } from '@hooks/useScrollLoading';
import useScrollLoading from '@hooks/useScrollLoading';

import type { InitSelectWordHandlerWordsTableBodyExclusiveProp } from '@components/WordsTable/Body';

export default useInfiniteWordTable;
export type {
   SelectedWordData,
   UseInfiniteWordTableHTTPSuccess,
   UseInfiniteWordTableHTTPError,
   UseInfiniteWordTableHTTPParams,
   UseInfiniteWordTableReturn,
};

type SelectedWordData = {
   index: number;
   word: string;
   prevWord?: string;
   nextWord?: string;
};

type UseInfiniteWordTableHTTPSuccess = {
   results: string[] | { word: string }[];
   hasNext: boolean;
};
type UseInfiniteWordTableHTTPError = {
   message: string;
};
type UseInfiniteWordTableHTTPParams = {
   page: number;
   limit: number;
};

type UseInfiniteWordTableReturn = UseScrollLoadingReturn<
   string[],
   {
      success: UseInfiniteWordTableHTTPSuccess;
      error: UseInfiniteWordTableHTTPError;
      params: UseInfiniteWordTableHTTPParams;
   }
> & {
   PER_PAGE: number;
   selectedWordData: SelectedWordData;
   initSelectWordHandler: InitSelectWordHandlerWordsTableBodyExclusiveProp;
};

const PER_PAGE = 20;

function useInfiniteWordTable(
   url: string,
   depsList: unknown[] = [],
): UseInfiniteWordTableReturn {
   const [selectedWordData, setSelectedWordData] = useState(
      {} as SelectedWordData,
   );
   const navigate = useNavigate();
   const loadingData = useScrollLoading<
      string[],
      {
         success: UseInfiniteWordTableHTTPSuccess;
         error: UseInfiniteWordTableHTTPError;
         params: UseInfiniteWordTableHTTPParams;
      }
   >({
      url,
      initialCursor: 1,
      getConfig(cursor) {
         return {
            params: {
               page: Number(cursor),
               limit: PER_PAGE,
            },
            headers: {
               authorization: `Bearer ${Cookies.get('jwt_token')}`,
            },
         };
      },
      onSuccess({ data }) {
         return {
            resolveCursor: (oldCursor) =>
               data.hasNext ? Number(oldCursor) + 1 : null,
            resolveResults: (oldResults) => {
               const newResults = data.results.map((result) =>
                  typeof result === 'string' ? result : result.word,
               );

               return oldResults.concat(newResults);
            },
         };
      },
      onError({ response }) {
         if (response?.status === 401) {
            Cookies.remove('jwt_token');
            navigate('/signin', {
               state: {
                  reason: 'Login again, your token expired!',
               },
            });

            return {};
         }

         return {
            maxRetryCount: 2,
            retryMilliseconds: 2000,
         };
      },
      depsList,
   });

   useEffect(() => {
      loadingData.forceFetch();
   }, []);

   const initSelectWordHandler: InitSelectWordHandlerWordsTableBodyExclusiveProp =
      useCallback(
         (data) => (_event) => {
            const list = loadingData.results;

            setSelectedWordData({
               ...data,
               prevWord: list[data.index - 1],
               nextWord: list[data.index + 1],
            });
         },
         [loadingData.results],
      );

   return {
      ...loadingData,
      selectedWordData,
      initSelectWordHandler,
      PER_PAGE,
   };
}
