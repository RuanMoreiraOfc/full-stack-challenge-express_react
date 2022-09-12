import { theme } from '@styles/theme';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { ChakraProvider } from '@chakra-ui/react';

import App from '@pages/_app';

const rootElement = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(rootElement).render(
   <React.StrictMode>
      <ChakraProvider theme={theme}>
         <App />
      </ChakraProvider>
   </React.StrictMode>,
);
