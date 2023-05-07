import { useContext, useState } from "react";
import { AuthContext } from "providers/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS, LOCAL_STORAGE, PATHS } from "utils/consts";
import axiosAuth from "setup/axios/authInstance";

const useAuth = () => {
  const { login: loginContext } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const login = (data) => {
    axiosAuth
      .post(ENDPOINTS.getToken, data)
      .then((response) => {
        localStorage.setItem(LOCAL_STORAGE.accessToken, response.data.access);
        localStorage.setItem(LOCAL_STORAGE.refreshToken, response.data.refresh);
        loginContext();
        navigate(PATHS.home);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const register = (data) => {
    localStorage.removeItem(LOCAL_STORAGE.accessToken);
    axiosAuth
      .post(ENDPOINTS.users, data)
      .then((response) => {
        navigate(PATHS.login);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return {
    login,
    register,
    error,
  };
};

export default useAuth;
