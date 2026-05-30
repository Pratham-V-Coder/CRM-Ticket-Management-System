import { getUserPending, getUserFail, getUserSuccess } from "./userSlice";
import { fetchUser } from "../api/userApi";

// It is a high order function.
// What is high order function
// High order function is function which takes function as input and gives function as output

export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch(getUserPending());
    const result = await fetchUser();

    if (result.user && result.user._id) {
      dispatch(getUserSuccess(result.user));
    }
  } catch (error) {
    dispatch(getUserFail(error.message));
  }
};
