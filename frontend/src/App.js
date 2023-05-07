import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { PATHS } from "utils/consts";
import HomePage from "pages/HomePage/HomePage";
import LoginForm from "components/molecules/LoginForm/LoginForm";
import RegisterForm from "components/molecules/RegisterForm/RegisterForm";
import RankingPage from "pages/RankingPage/RankingPage";
import Reward from "components/molecules/Reward/Reward";
import ShopPage from "pages/ShopPage/ShopPage";
import AdvertisementsPage from "pages/AdvertisementsPage/AdvertisementsPage";
import Advertisement from "components/molecules/Advertisement/Advertisement";
import ProtectedRoutes from "components/atoms/ProtectedRoutes";
import SharedLayout from "components/atoms/SharedLayout/SharedLayout";
import AboutPage from "pages/AboutPage/AboutPage";
import ProfilePage from "pages/ProfilePage/ProfilePage";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<SharedLayout />}>
          <Route element={<ProtectedRoutes />}>
            <Route path={PATHS.reward} element={<Reward />} />
            <Route path={PATHS.advertisement} element={<Advertisement />} />
            <Route path={PATHS.advertisements} element={<AdvertisementsPage />} />
            <Route element={<ShopPage />} path={PATHS.rewardShop} />
            <Route element={<RankingPage />} path={PATHS.ranking} />
            <Route element={<ProfilePage />} path={PATHS.profile} />
          </Route>

          <Route element={<LoginForm />} path={PATHS.login} />
          <Route element={<RegisterForm />} path={PATHS.register} />
          <Route element={<HomePage />} path={PATHS.home} />
          <Route element={<AboutPage />} path={PATHS.about} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
