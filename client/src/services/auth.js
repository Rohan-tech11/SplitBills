import * as api from "../api/index";
import configData from "../config.json";

export const login = async (formData, setShowAlert, setAlertMessage) => {
  try {
    const { data } = await api.loginIn(formData);
    localStorage.setItem("profile", JSON.stringify(data));
    window.location.href = configData.DASHBOARD_HOME_URL;
    return data;
  } catch (err) {
    setShowAlert(true);
    err.response.status === 400 || err.response.status === 401
      ? setAlertMessage(err.response.data.message)
      : setAlertMessage(
          " Something went wrong ! please try again after sometime"
        );
    return false;
  }
};

export const register = async (formData, setShowAlert, setAlertMessage) => {
  try {
    //registering user to the DB
    const { data } = await api.register(formData);
    login(formData, setShowAlert, setAlertMessage);
    return data;
  } catch (err) {
    setShowAlert(true);
    err.response.status === 400 || err.response.status === 401
      ? setAlertMessage(err.response.data.message)
      : setAlertMessage(
          "Oops! Something went wrong ! please try again after sometime"
        );
    return false;
  }
};

export const getEmailList = async () => {
  try {
    const data = await api.getEmailList();
    return data;
  } catch (err) {
    return null;
  }
};
