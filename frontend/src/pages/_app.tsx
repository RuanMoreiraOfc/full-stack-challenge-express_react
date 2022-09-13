import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import EnsureAuthenticated from '@middlewares/EnsureAuthenticated';
import SignIn from '@pages/signin';
import SignUp from '@pages/signup';

export default App;

function App() {
   return (
      <Router>
         <EnsureAuthenticated>
            <Routes>
               <Route path='/signin' element={<SignIn />} />
               <Route path='/signup' element={<SignUp />} />
            </Routes>
         </EnsureAuthenticated>
      </Router>
   );
}
