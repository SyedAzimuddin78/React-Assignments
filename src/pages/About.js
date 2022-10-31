import "./About.css";
import mainlogo from "../images/imgone.jpg";

function About() {
  return (
    <div className="section">
      <div className="containers">
        <div className="content-section">
          <div className="title">
            <h1>About Us</h1>
          </div>
          <div className="content">
            <h3>
              It is very important to take care of the patient, and the
              adipiscing will be followed
            </h3>
            <p>
              It is important to take care of the pain itself, and it will be
              followed by the growth of the patient, but at the same time it
              will happen that there is a lot of work and pain. For to come to
              the smallest detail, no one should practice any kind of work
              unless he derives some benefit from it.
            </p>
            <div className="button">
              <a href="">Read More</a>
            </div>
          </div>
        </div>
        <div className="image-section">
          <img src={mainlogo} />
        </div>
      </div>
    </div>
  );
}

export default About;
