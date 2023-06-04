import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { PATHS } from "utils/consts";
import HomePage from "pages/HomePage/HomePage";
import LoginForm from "components/molecules/LoginForm/LoginForm";
import RegisterForm from "components/molecules/RegisterForm/RegisterForm";
import RankingPage from "pages/RankingPage/RankingPage";
import RewardPage from "pages/RewardPage/RewardPage";
import RewardShopPage from "pages/RewardShopPage/RewardShopPage";
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
            <Route path={PATHS.advertisement} element={<Advertisement />} />
            <Route path={PATHS.advertisements} element={<AdvertisementsPage />} />
            <Route path={PATHS.rewardShop} element={<RewardShopPage />} />
            <Route path={PATHS.reward} element={<RewardPage />} />
            <Route path={PATHS.ranking} element={<RankingPage />} />
            <Route path={PATHS.profile} element={<ProfilePage />} />
          </Route>

          <Route path={PATHS.login} element={<LoginForm />} />
          <Route path={PATHS.register} element={<RegisterForm />} />
          <Route path={PATHS.home} element={<HomePage />} />
          <Route path={PATHS.about} element={<AboutPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
