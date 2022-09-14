import { useCallback } from 'react';
import { useToast } from '@chakra-ui/react';

export default useErrorToast;

function useErrorToast() {
   const toast = useToast();

   const openToast = useCallback(
      ({ title }: { title: string }) => {
         const id = 'toast-error';

         if (toast.isActive(id)) {
            return;
         }

         toast({
            id,
            status: 'error',
            duration: 2000,
            position: 'top-right',
            title,
         });
         return;
      },

      [],
   );

   return {
      openToast,
   };
}
