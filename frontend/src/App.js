import React from "react";
import { Route, Routes } from "react-router-dom";
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
import Offers from "./pages/Offers";
import OffersDetail from "./pages/OffersDetail";
import ProfilePage from "./pages/ProfilePage";

function App(props) {
  // check jwt token
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }

  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<UserMainPage />} path="/mainPage" />
        <Route path="/profilePage" element={<ProfilePage />} />
        <Route element={<UserRank />} path="/rank" />
        <Route path="/product/:userId" element={<Product />} />
        <Route path="/advertisements/:productId" element={<OffersDetail />} />
        <Route path="/advertisements" element={<Offers />} />
        <Route element={<Shop />} path="/shop/rewards" />
        <Route element={<UserRank />} path="/rank" />
      </Route>
      <Route element={<LoginForm />} path="/login" />
      <Route element={<RegisterForm />} path="/register" />
      <Route element={<Home />} path="/" />
      <Route element={<Home />} path="" />
      <Route element={<AboutUs />} path="/aboutus" />
    </Routes>
  );
}

export default App;
