import type { ReactElement } from 'react';
import Cookies from 'js-cookie';
import { keyframes } from '@chakra-ui/react';

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Grid, Heading } from '@chakra-ui/react';

export default EnsureAuthenticated;

function EnsureAuthenticated({ children }: { children: ReactElement | null }) {
   const location = useLocation();
   const navigate = useNavigate();
   const [verified, setVerified] = useState(false);

   useEffect(() => {
      const token = Cookies.get('jwt_token');

      setVerified(false);

      verification: {
         if (token) {
            if (['/signin', '/signup'].includes(location.pathname)) {
               navigate('/');
               break verification;
            }

            break verification;
         }

         if (!['/', '/signin', '/signup'].includes(location.pathname)) {
            navigate('/signin');
            break verification;
         }
      }

      setVerified(true);
   }, [location]);

   if (verified) {
      return children;
   }

   const animation = keyframes`
      0%, 33% { content: '.' }
      44%, 66% { content: '..' }
      80%, 100% { content: '...' }
   `;

   return (
      <Grid w='full' h='100vh' placeItems='center'>
         <Heading
            as='h1'
            _after={{
               content: '"."',
               animation: `${animation} 3s infinite`,
            }}
         >
            Verifying your token
         </Heading>
      </Grid>
   );
}
