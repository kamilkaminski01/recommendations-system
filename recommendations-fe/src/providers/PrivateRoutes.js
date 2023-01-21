import React from 'react';
import { Outlet, Navigate  } from 'react-router-dom';
 
const PrivateRoutes = () => {
 
   function hasJWT() {
       let flag = false;
 
       //check user has JWT token
       localStorage.getItem("token") ? flag=true : flag=false
      
       return flag
   }
   console.log(hasJWT());

   return (
       hasJWT() ? <Outlet/> : <Navigate to="/singin"/>
   );
};
 
export default PrivateRoutes;