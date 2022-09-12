import Cookies from 'js-cookie';

import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default EnsureAuthenticated;

function EnsureAuthenticated() {
   const location = useLocation();
   const navigate = useNavigate();

   useEffect(() => {
      const token = Cookies.get('token');

      if (token) {
         if (['/signin', '/signup'].includes(location.pathname)) {
            navigate('/');
            return;
         }

         return;
      }

      if (!['/', '/signin', '/signup'].includes(location.pathname)) {
         navigate('/signin');
         return;
      }
   }, [location]);

   return null;
}
