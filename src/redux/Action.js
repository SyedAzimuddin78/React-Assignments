import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import userSlice from "./reducer/reducer";
import { useNavigate } from "react-router";

export const createUser = (email, password, name) => {
  return async (dispatch) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const user = res.user;
        await updateProfile(user, {
          displayName: name,
        });
        dispatch(
          userSlice.actions.createdUser({
            email,
            displayName: user.displayName,
          })
        );
        dispatch(userSlice.actions.errorMessage({ errorMessage: "" }));
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          userSlice.actions.errorMessage({ errorMessage: "Signup error" })
        );
      });
  };
};
export const loginUser = (email, password) => {
  return async (dispatch) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const displayName = res.user.displayName;
        console.log(displayName);
        dispatch(userSlice.actions.createdUser({ email, displayName }));
        dispatch(userSlice.actions.errorMessage({ errorMessage: "" }));
      })
      .catch((errorMessage) => {
        console.log(errorMessage);
        dispatch(
          userSlice.actions.errorMessage({ errorMessage: "login error" })
        );
      });
  };
};
