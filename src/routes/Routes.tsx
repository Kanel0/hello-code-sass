"use client"

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
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom'

function RouteContent() {
    return (
        <>
        <Router>
         <Routes>

           <Route path='/' element={<HomePage/>}></Route>
           <Route path='/login' element={<LoginPage/>}></Route>
           <Route path='/register' element={<Register/>}></Route>
           <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
           <Route path='/create-database' element={<CreateDatabase/>}></Route>
           
           {/* Dashboard */}
           <Route path='/dashboard' element={<Diagram/>}></Route>
           <Route path='/parametres' element={<Settings/>}></Route>
           <Route path='/licences' element={<Licences/>}></Route>
           <Route path='/info' element={<Information/>}></Route>
           <Route path='/payment' element={<PaymentMethod/>}></Route>
           <Route path='/contact' element={<Contact/>}></Route>
          
           {/* Profile */}
           <Route path='/profile' element={<ProfilePage/>}></Route>
               
           {/* Error page */}
           <Route path='*' element={<ErrorPage/>}></Route>
         </Routes>
        </Router>
        </>
       );
     }
     

export default RouteContent