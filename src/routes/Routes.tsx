"use client"
import Apps from '@/pages/apps/Apps';
import CreateDatabase from '@/pages/createDataBase/CreateDatabase';
import Dashboard from '@/pages/dashboard/dashboard';
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
           <Route path='/dashboard' element={<Dashboard/>}></Route>
           <Route path='/apps' element={<Apps/>}></Route>
             
           <Route path='/profile' element={<ProfilePage/>}></Route>
           <Route path='/create-database' element={<CreateDatabase/>}></Route>
               
           {/* Error page */}
           <Route path='*' element={<ErrorPage/>}></Route>
         </Routes>
        </Router>
        </>
       );
     }
     

export default RouteContent