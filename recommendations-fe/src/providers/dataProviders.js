import axios from "axios";
import { setAuthToken } from "./setAuthToken";
import jwtDecode from "jwt-decode";

const API_URL = "http://localhost:8000/api/";

export function Login(data) {
  axios
    .post(API_URL + "token/", data)
    .then((response) => {
      console.log(`response: ${JSON.stringify(response)}`);
      const token = response.data.access;
      const decode = jwtDecode(token);
      localStorage.setItem("user_id", decode.user_id);
      console.log(`token: ${token}`);
      localStorage.setItem("token", token);

      setAuthToken(token);
      window.location.href = "/mainPage";
    })
    .catch((err) => console.log(err));
}

export function Register(data) {
  axios
    .post(API_URL + "users/", data)
    .then((response) => {
      window.location.href = "/login";
    })
    .catch((err) => console.log(err));
}

export function Recommender(data) {
  axios
    .post(API_URL + "users/", data)
    .then((response) => {
      window.location.href = "/login";
    })
    .catch((err) => console.log(err));
}

export function UserRanking() {
  axios.get(API_URL + "User/rank").then((response) => {});
}
