import "./LandingPage.css";
import KeyIcon from "@mui/icons-material/Key";
import { Button } from "@mui/material";
import { AnimationOnScroll } from "react-animation-on-scroll";

export default function LandingPage() {
  return (
    <div>
      <div className="bgimg">
        <div className="topleft">
          <KeyIcon className="key" />
        </div>
        <div className="middle">
          <h1>Passwordian</h1>
          <hr />
          <h1>
            <Button
              variant="contained"
              href="/app"
              color="success"
              size="large"
            >
              Open Passwordian
            </Button>
          </h1>
        </div>
        <div className="bottomleft">
          <p>Created by Silvan Chervet and Jonas Marschall</p>
        </div>
      </div>

      <div id="spacer" style={{ height: "250px" }} />

      <h1>What is passwordian?</h1>
      <div>
        <AnimationOnScroll
          animateIn="animate__shakeY"
          animateOut="animate__bounceOutRight"
        >
          <p>
            Passwordian is a very basic password manager. It is a simple web
            application that allows you to store your passwords in a secure way.
          </p>
        </AnimationOnScroll>
        <h2>Try out passwordian now!</h2>
        <AnimationOnScroll animateIn="animate__bounceIn">
          <Button variant="contained" href="/app" color="success" size="large">
            Open Passwordian
          </Button>
        </AnimationOnScroll>
      </div>
    </div>
  );
}
