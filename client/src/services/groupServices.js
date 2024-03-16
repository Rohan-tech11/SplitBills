import * as api from "../api/index";

export const createGroupService = async (data, setAlert, setAlertMessage) => {
  try {
    const create_response = await api.createGroup(data);
    return create_response;
  } catch (err) {
    setAlert(true);
    err.response.status === 400 || err.response.status === 401
      ? setAlertMessage(err.response.data.message)
      : setAlertMessage("Oops! Something went worng");
    return false;
  }
};

export const editGroupService = async (data, setAlert, setAlertMessage) => {
  try {
    const edit_response = await api.editGroup(data);
    return edit_response;
  } catch (err) {
    setAlert(true);
    err.response.status === 400 || err.response.status === 401
      ? setAlertMessage(err.response.data.message)
      : setAlertMessage("Oops! Something went worng");
    return false;
  }
};

export const getGroupDetailsService = async (
  data,
  setAlert,
  setAlertMessage
) => {
  try {
    const group_details = await api.getGroupDetails(data);
    return group_details;
  } catch (err) {
    setAlert(true);
    err.response.status === 400 || err.response.status === 401
      ? setAlertMessage(err.response.data.message)
      : setAlertMessage("Oops! Something went worng");
    return false;
  }
};
