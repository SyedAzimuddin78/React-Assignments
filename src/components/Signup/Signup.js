import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import InputControl from "../InputControl/InputControl";
import { auth } from "../../firebase";

import styles from "./Signup.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../redux/Action";
import userSlice from "../../redux/reducer/reducer";

function Signup() {
  const load = useRef(true);
  const errorMsg = useSelector((state) => state.todo.errorMessage);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
    confirmPass: "",
  });

  const handleSubmission = (e) => {
    e.preventDefault();
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    const validation = strongRegex.test(values.pass);
    if (!values.name || !values.email || !values.pass || !values.confirmPass) {
      dispatch(
        userSlice.actions.errorMessage({ errorMessage: "Fill All Fields" })
      );
      return;
    }
    if (values.pass !== values.confirmPass) {
      dispatch(
        userSlice.actions.errorMessage({
          errorMessage: "Passwords do not match",
        })
      );
      return;
    }
    if (values.pass !== values.confirmPass) {
      dispatch(
        userSlice.actions.errorMessage({
          errorMessage: "Passwords do not match",
        })
      );
      return;
    }
    if (validation === false) {
      dispatch(
        userSlice.actions.errorMessage({
          errorMessage:
            "Invalid Password! Password should contain atleast one smallercase, one uppercase, numbers, special characters and should be minimum of 8 characters in length.",
        })
      );
      return;
    }
    dispatch(createUser(values.email, values.pass, values.name));
  };
  const nextPage = () => {
    dispatch(userSlice.actions.errorMessage({ errorMessage: null }));
    navigate("/");
  };

  useEffect(() => {
    console.log(errorMsg);
    if (errorMsg === "") {
      dispatch(userSlice.actions.errorMessage({ errorMessage: "" }));
      navigate("/todo");
    }
  }, [errorMsg]);
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmission}>
        <div className={styles.innerBox}>
          <h1 className={styles.heading}>Signup</h1>

          <InputControl
            label="Name"
            type="text"
            placeholder="Enter your name"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, name: event.target.value }))
            }
          />
          <InputControl
            label="Email"
            type="email"
            placeholder="Enter email address"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
          />
          <InputControl
            label="Password"
            type="password"
            placeholder="Enter password"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, pass: event.target.value }))
            }
          />
          <InputControl
            label="Confirm Password"
            type="password"
            placeholder="Confirm password"
            onChange={(event) =>
              setValues((prev) => ({
                ...prev,
                confirmPass: event.target.value,
              }))
            }
          />

          <div className={styles.footer}>
            <div className={styles.error}>{errorMsg}</div>
            <button type="submit">Signup</button>
            <p>
              Already have an account?{" "}
              <span>
                <a href="#" onClick={nextPage}>
                  Login
                </a>
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
