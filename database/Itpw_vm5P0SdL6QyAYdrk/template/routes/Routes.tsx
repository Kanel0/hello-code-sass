"use client";
  import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
  import ErrorPage from '../error/ErrorPage';
  import LoginPage from '../login/LoginPage';
  
  function RouteContent() {
      return (
          <>
          <Router>
           <Routes>
             {/* Template Route  */}
             <Route path='/WebData/login' element={<LoginPage/>}></Route>
  
             {/* Error page */}
             <Route path='*' element={<ErrorPage/>}></Route>
           </Routes>
          </Router>
          </>
         );
       }
  
  export default RouteContent;
  