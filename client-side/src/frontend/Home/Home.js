import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import "./Home.css";
import Info from "./Info";
import Bus from "./Bus";
import Cricket from "./Cricket";
import UserWidget from "../User/UserWidget";

export default function Home() {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookies] = useCookies(["user"]);

  // for selecting options: Info or Bus or Cricket Page
  const [state, setState] = useState("info");

  return (
    <div className="Home">
      <div className="home-navbar">
        <img
          className="home-logo"
          src="https://bookmepk.s3.eu-central-1.amazonaws.com/static/custom/V3/images/new-logo-header.png"
          alt="BookMe Logo"
          onClick={() => setState("info")}
        />

        {cookies.user == undefined ? (
          <button
            className="home-btn"
            onClick={() => navigate("/signin")}
          >
            Login
          </button>
        ) : (
          <UserWidget />
        )}
      </div>

      <div className="services">
        <div
          className="service-tag"
          id="bus"
          onClick={() => setState("bus")}
        >
          Bus
        </div>

        <div
          className="service-tag"
          id="cricket"
          onClick={() => setState("cricket")}
        >
          Cricket
        </div>

        <div
          className="service-tag"
          id="cricket"
          onClick={() => removeCookies("user")}
        >
          Log out
        </div>
      </div>

      {state === "info" && (
        <div className="info">
          <Info></Info>
        </div>
      )}

      {state === "bus" && (
        <div className="info">
          <Bus></Bus>
        </div>
      )}

      {state === "cricket" && (
        <div className="info">
          <Cricket></Cricket>
        </div>
      )}
    </div>
  );
}
