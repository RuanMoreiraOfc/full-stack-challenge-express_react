import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { Flex, Grid, Link as StyledLink } from '@chakra-ui/react';

import EnsureAuthenticated from '@middlewares/EnsureAuthenticated';
import SignIn from '@pages/signin';
import SignUp from '@pages/signup';

export default App;

function App() {
   return (
      <Router>
         <EnsureAuthenticated>
            <Routes>
               <Route
                  path='/'
                  element={
                     <Grid w='full' h='100vh' placeItems='center'>
                        Fullstack Challenge 2022
                        <Flex flexWrap='wrap' gap='8' color='blue'>
                           <StyledLink as={Link} to='/signin'>
                              Login in your account
                           </StyledLink>
                           <StyledLink as={Link} to='/signup'>
                              Create an account
                           </StyledLink>
                        </Flex>
                     </Grid>
                  }
               />
               <Route path='/signin' element={<SignIn />} />
               <Route path='/signup' element={<SignUp />} />
            </Routes>
         </EnsureAuthenticated>
      </Router>
   );
}
