import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import userSlice from "../../redux/reducer/reducer";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "firebase/app";
import "firebase/auth";
import "./header.css";
const Header1 = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.todo.loggedInUser);
  console.log(username);
  const errorMsg = useSelector((state) => state.todo.errorMessage);
  const navigate = useNavigate();
  async function logout() {
    try {
      await auth.signOut();
      console.log("hello");
      dispatch(userSlice.actions.errorMessage({ errorMessage: null }));
      dispatch(userSlice.actions.createdUser({ email: "", displayName: "" }));
      navigate("/");
    } catch {
      dispatch(
        userSlice.actions.errorMessage({ errorMessage: "Failed to signOut" })
      );
    }
  }
  return (
    <div>
      <nav className="header">
        <h1 className="logo">
          <Link to="/">todoapp📝</Link>
        </h1>
        <ul className="nav-links align-items-center mt-3">
          <li>
            <Button variant="dark" onClick={logout}>
              Log out
            </Button>
          </li>
          <li>{username !== "" && <span>Hi,{username}</span>}</li>
          <li>
            <Link to="/About">About</Link>
          </li>
          <li>
            <Link to="/Contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header1;
