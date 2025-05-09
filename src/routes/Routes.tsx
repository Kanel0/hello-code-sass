"use client";
import CreateDatabase from '@/pages/createDataBase/CreateDatabase';
import Contact from '@/pages/dashboard/Contact';
import Diagram from '@/pages/dashboard/Diagram';
import Information from '@/pages/dashboard/Information';
import Licences from '@/pages/dashboard/Licences';
import PaymentMethod from '@/pages/dashboard/PaymentMethod';
import Settings from '@/pages/dashboard/Settings';
import ErrorPage from '@/pages/error/ErrorPage';
import ForgotPassword from '@/pages/forgotPassword/ForgotPassword';
import HomePage from '@/pages/home/HomePage';
import LoginPage from '@/pages/login/LoginPage';
import ProfilePage from '@/pages/profil/ProfilePage';
import Register from '@/pages/register/Register';
import TemplateRoutes from '@/template/routes/Routes';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
  
  function RouteContent() {
      return (
          <>
          <Router>
           <Routes>

                {/* Home  */}
                <Route path='/' element={<HomePage/>}></Route>
             
                {/*Login  */}
                <Route path='/login' element={<LoginPage/>}></Route>

                {/*Register  */}
                <Route path='/register' element={<Register/>}></Route>
              
                {/* Reset Password */}
                <Route path='/forgot-password' element={<ForgotPassword/>}></Route>

                {/* Create Database */}
                <Route path='/create-database' element={<CreateDatabase/>}></Route>

                {/* Dasboard */}
                <Route path='/dashboard' element={<Diagram/>}></Route>
                <Route path='/contact' element={<Contact/>}></Route>
                <Route path='/payment' element={<PaymentMethod/>}></Route>
                <Route path='/info' element={<Information/>}></Route>
                <Route path='/licences' element={<Licences/>}></Route>
                <Route path='/parametres' element={<Settings/>}></Route>

                {/* Profile */}
                <Route path='/profile' element={<ProfilePage/>}></Route>

                
                {/* Template Route  */}
               {TemplateRoutes()}
                

                {/* Error page */}
                <Route path='*' element={<ErrorPage/>}></Route>
           </Routes>
          </Router>
          </>
         );
       }
  
  export default RouteContent;
  