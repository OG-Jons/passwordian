import "./LandingPage.css";
import KeyIcon from "@mui/icons-material/Key";
import { Button } from "@mui/material";

export default function LandingPage() {
  return (
    <div>
      <div className="bgimg">
        <div className="topleft">
          <KeyIcon className="key" />
        </div>
        <div className="middle">
          <h1>Paswordian</h1>
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
      <h1>test</h1>
    </div>
  );
}
