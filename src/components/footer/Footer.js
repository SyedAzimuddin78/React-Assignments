import React from "react";
import { FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-description">
          <h3>Todo APP</h3>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old.
          </p>
        </div>
        <div className="footer-links-content">
          <ul className="footer-links">
            <li>
              <FaFacebook />
            </li>
            <li>
              <FaTwitter />
            </li>
            <li>
              <FaFacebook />
            </li>
            <li>
              <FaGoogle />
            </li>
          </ul>
        </div>
        <div className="copyright">Copyright</div>
      </div>
    </footer>
  );
};

export default Footer;
