import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import userSlice from "../../redux/reducer/reducer";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "firebase/auth";
import "./header.css";
const Header = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.todo.loggedInUser);
  const email = useSelector((state) => state.todo.username);
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          userSlice.actions.createdUser({
            email: user.email,
            displayName: user.displayName,
          })
        );
        dispatch(userSlice.actions.errorMessage({ errorMessage: "" }));
      } 
    });
  }, [username]);

  async function logout() {
    try {
      await auth.signOut();
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
    <header>
      <nav className="header">
        <h1 className="logo">
          <Link to="/">todoapp📝</Link>
        </h1>
        <ul className="nav-links align-items-center mt-3">
          <li>
            {username !== null && email !== "" ? (
              <span>Hi,{username}</span>
            ) : (
              <span></span>
            )}
          </li>
          <li>
            <Link to="/About">About</Link>
          </li>
          <li>
            <Link to="/Contact">Contact</Link>
          </li>
          <li>
            {email !== "" && (
              <Button variant="dark" onClick={logout}>
                Log out
              </Button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
