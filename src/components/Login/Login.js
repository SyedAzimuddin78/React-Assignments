import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import InputControl from "../InputControl/InputControl";

import styles from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import userSlice from "../../redux/reducer/reducer";
import { loginUser } from "../../redux/Action";

function Login() {
  const errorMsg = useSelector((state) => state.todo.errorMessage);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const handleSubmission = (e) => {
    e.preventDefault();
    if (!values.email || !values.pass) {
      dispatch(
        userSlice.actions.errorMessage({ errorMessage: "Fill all fields" })
      );
      return;
    }
    dispatch(loginUser(values.email, values.pass));
  };
  const nextPage = () => {
    dispatch(userSlice.actions.errorMessage({ errorMessage: null }));
    navigate("/signup");
  };
  useEffect(() => {
    if (errorMsg === "") {
      navigate("/todo");
    }
  }, [errorMsg]);
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmission}>
        <div className={styles.innerBox}>
          <h1 className={styles.heading}>Login</h1>

          <InputControl
            label="Email"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
            placeholder="Enter email address"
          />
          <InputControl
            label="Password"
            type="password"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, pass: event.target.value }))
            }
            placeholder="Enter Password"
          />

          <div className={styles.footer_login}>
            <b className={styles.error}>{errorMsg}</b>
            <button type="submit">Login</button>
            <p>
              Already have an account?{" "}
              <span>
                <a href="#" onClick={nextPage}>
                  Sign up
                </a>
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
