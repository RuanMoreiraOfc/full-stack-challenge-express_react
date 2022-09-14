import type { UIEventHandler } from 'react';
import { AxiosError, AxiosResponse, CanceledError } from 'axios';

import type { HttpProps, ConfigRequest } from '@services/api';
import { apiGet } from '@services/api';

import { useRef, useState, useEffect, useCallback } from 'react';

export default useScrollLoading;
export type {
   TImplementation,
   Cursor,
   GetConfigCallback,
   ResolveSuccessResponseCallback,
   ResolveErrorResponseCallback,
   UseScrollLoadingProps,
   UseScrollLoadingReturn,
};

type TImplementation = Array<unknown>;

type Cursor = string | number | null;

type GetConfigCallback<TParmas> = (
   cursor: Cursor,
) => ConfigRequest<TParmas, never>;

type ResolveSuccessResponseCallback<TResult, TSuccess> = (
   response: AxiosResponse<TSuccess>,
) => {
   resolveCursor: (oldCursor: Cursor) => Cursor;
   resolveResults: (oldResults: TResult) => TResult;
};

type ResolveErrorResponseCallback<TError> = (error: AxiosError<TError>) =>
   | {
        maxRetryCount?: never;
        retryMilliseconds?: never;
        retryMillisecondsBase: number;
     }
   | {
        maxRetryCount?: number;
        retryMilliseconds?: number;
        retryMillisecondsBase?: never;
     }
   | {
        maxRetryCount?: number;
        retryMilliseconds?: never;
        retryMillisecondsBase?: number;
     };

type FetchMoreOptions<T, THttp extends HttpProps> = {
   getConfig?: GetConfigCallback<THttp['params']>;
   onSuccess?: ResolveSuccessResponseCallback<T, THttp['success']>;
   onError?: ResolveErrorResponseCallback<THttp['error']>;
};

type UseScrollLoadingProps<T, THttp extends HttpProps> = {
   url: string;
   initialCursor: Exclude<Cursor, null>;
   depsList: Array<unknown>;
} & Required<FetchMoreOptions<T, THttp>>;

type UseScrollLoadingReturn<
   T extends TImplementation,
   THttp extends HttpProps,
> = {
   isFetching: boolean;
   hasMore: boolean;
   cursor: Cursor;
   results: T;
   forceFetch: (options?: FetchMoreOptions<T, THttp>) => Promise<void>;
   onScroll: UIEventHandler<HTMLElement>;
   manipulateCursor: (callback: (oldCursor: Cursor) => Cursor) => void;
   manipulateResults: (callback: (oldResults: T) => T) => void;
};

function useScrollLoading<
   TResult extends TImplementation,
   THttp extends HttpProps,
>({
   url,
   initialCursor,
   getConfig,
   onSuccess,
   onError,
   depsList,
}: UseScrollLoadingProps<TResult, THttp>): UseScrollLoadingReturn<
   TResult,
   THttp
> {
   const abortController = useRef<AbortController>();
   const retryCount = useRef(0);
   const retryInstance = useRef(-1);

   const getConfigRef = useRef(getConfig);
   const onSuccessRef = useRef(onSuccess);
   const onErrorRef = useRef(onError);

   const [isFetching, setIsFetching] = useState(false);
   const [cursor, setCursor] = useState<Cursor>(initialCursor);
   const [results, setResults] = useState<TResult>([] as unknown as TResult);

   const hasMore = cursor !== null;

   useEffect(() => {
      abortController.current = new AbortController();

      return () => {
         abortController.current?.abort();
         clearTimeout(retryInstance.current);
      };
   }, []);

   useEffect(() => {
      getConfigRef.current = getConfig;
      onSuccessRef.current = onSuccess;
      onErrorRef.current = onError;
   }, depsList);

   const forceFetch = useCallback(
      async (options: FetchMoreOptions<TResult, THttp> = {}) => {
         if (!hasMore) {
            return;
         }

         const getConfig = options.getConfig ?? getConfigRef.current;
         const onSuccess = options.onSuccess ?? onSuccessRef.current;
         const onError = options.onError ?? onErrorRef.current;

         setIsFetching(true);

         const apiResponse = await apiGet<THttp>(url, {
            signal: abortController.current?.signal,
            ...getConfig(cursor),
         });

         const error = apiResponse.error;
         if (error) {
            if (error instanceof CanceledError) {
               return;
            }

            retryCount.current += 1;
            const currentRetry = retryCount.current;

            const errorProcedure = onError(error);
            const maxRetries = errorProcedure.maxRetryCount ?? Infinity;
            const interval =
               errorProcedure.retryMilliseconds ??
               (errorProcedure.retryMillisecondsBase || 0) * currentRetry;

            if (
               errorProcedure.retryMilliseconds &&
               currentRetry <= maxRetries
            ) {
               retryInstance.current = setTimeout(forceFetch, interval);
            }
            return;
         }

         retryCount.current = 0;

         const resolvedData = onSuccess(apiResponse);
         setIsFetching(false);
         setCursor(resolvedData.resolveCursor);
         setResults(resolvedData.resolveResults);
      },
      [cursor, hasMore],
   );

   const onScroll: UIEventHandler<HTMLElement> = useCallback(
      (event) => {
         if (isFetching || !hasMore) {
            return;
         }

         const target = event.target as HTMLElement;
         const maxY = target.scrollHeight - target.offsetHeight;
         const currentYInPercentage = target.scrollTop / maxY || 0;

         if (currentYInPercentage === 1) {
            forceFetch();
         }
      },
      [isFetching, hasMore, forceFetch],
   );

   return {
      cursor,
      isFetching,
      hasMore,
      results,
      forceFetch,
      onScroll,
      manipulateCursor: setCursor,
      manipulateResults: setResults,
   };
}
