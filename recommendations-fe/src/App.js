import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import UserMainPage from "./pages/UserMainPage";
import { setAuthToken } from "./providers/setAuthToken";
import PrivateRoutes from "./providers/PrivateRoutes";
import UserRank from "./pages/UserRank";
import AboutUs from "./pages/AboutUs";
import Product from "./pages/Product";
import Shop from "./pages/Shop";

function App(props) {

 //check jwt token
 const token = localStorage.getItem("token");
 if (token) {
     setAuthToken(token);
 }

  return (
    <BrowserRouter>
      <Routes>      
        <Route element={<PrivateRoutes/>}>
            <Route element={<UserMainPage/>} path="/mainPage" />
            <Route element={<Home />} path="/home" />
            <Route element={<UserRank/>} path="/rank"/>
            <Route element={<AboutUs/>} path="/aboutus"/>
        </Route>
      <Route element={<LoginForm/>} path="/login"/>
      <Route element={<RegisterForm/>} path="/register"/>
      <Route element={<UserRank/>} path="/rank"/>
      <Route element={<Shop/>} path="/shop/rewards"/>
      <Route path='/product/:userId' element={<Product/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
