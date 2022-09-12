import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignIn from '@pages/signin';
import SignUp from '@pages/signup';

export default App;

function App() {
   return (
      <Router>
         <Routes>
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
         </Routes>
      </Router>
   );
}
