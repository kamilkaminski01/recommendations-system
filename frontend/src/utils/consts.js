const url = window.location;

export const API_URL =
  url.port !== "" ? `${url.protocol}//${url.hostname}:8000/api/` : `${url.origin}/api/`;

export const ENDPOINTS = {
  getToken: "token/",
  refreshToken: "token/refresh/",

  users: "users/",
  userDetails: "users/details/",
  ranking: "recommenders/ranking/",

  advertisements: "advertisements/",
  advertisementDetails: "advertisements/details/:id/",

  rewards: "shop/rewards/",
  reward: "shop/rewards/:id/",

  candidates: "candidates/",
  candidateUpdate: "candidates/update/:id/",
};

export const PATHS = {
  home: "/",
  login: "/login",
  register: "/register",
  profile: "/profile",
  about: "/about",
  rewardShop: "/reward-shop",
  advertisements: "/advertisements",
  advertisement: "/advertisements/:id",
  ranking: "/ranking",
  reward: "/reward/:id",
};

export const LOCAL_STORAGE = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
};
