import React from 'react';
import { Route  } from 'react-router-dom';
import LoginPage from '../login/LoginPage';
import ErrorPage from '../error/ErrorPage';
import CreateDataBase from '../createDataBase/CreateDataBase';
  
const TemplateRoutes = () => {
  return (
    <>
      <Route  path='/template/login' element={<LoginPage />} />
      <Route  path='/template/create-database' element={<CreateDataBase />} />
      <Route  path='/template/*' element={<ErrorPage />} />
      
    </>
  );
};

export default TemplateRoutes;
