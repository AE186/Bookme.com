import { useState } from "react";

import "./Home.css";
import CricketTicket from "./CricketTicket";
import EnclosureModal from "./EnclosureModal";

export default function Cricket() {
  const [show, setShow] = useState(false);
  const [ticket, setTicket] = useState({
    key: 0,
    team1: "",
    team2: "",
    team1_img: "",
    team2_img: "",
    time: "",
    date: "",
    venue: "",
    city: "",
  });

  var alltickets = [
    {
      key: 1,
      team1: "Pakistan",
      team2: "New Zealand",
      team1_img:
        "https://bookmepk.s3.eu-central-1.amazonaws.com/static/cricket/storage/teams/PAK%20Logo.png",
      team2_img:
        "https://bookmepk.s3.eu-central-1.amazonaws.com/static/cricket/storage/teams/new-zealand.png",
      time: "3:30 PM",
      date: "05-05-2023",
      venue: "National Bank Stadium",
      city: "Karachi",
    },
    {
      key: 2,
      team1: "Pakistan",
      team2: "New Zealand",
      team1_img:
        "https://bookmepk.s3.eu-central-1.amazonaws.com/static/cricket/storage/teams/PAK%20Logo.png",
      team2_img:
        "https://bookmepk.s3.eu-central-1.amazonaws.com/static/cricket/storage/teams/new-zealand.png",
      time: "3:30 PM",
      date: "05-05-2023",
      venue: "National Bank Stadium",
      city: "Karachi",
    },
    {
      key: 3,
      team1: "Pakistan",
      team2: "New Zealand",
      team1_img:
        "https://bookmepk.s3.eu-central-1.amazonaws.com/static/cricket/storage/teams/PAK%20Logo.png",
      team2_img:
        "https://bookmepk.s3.eu-central-1.amazonaws.com/static/cricket/storage/teams/new-zealand.png",
      time: "3:30 PM",
      date: "05-05-2023",
      venue: "National Bank Stadium",
      city: "Karachi",
    },
  ];

  return (
    <div className="home-wrapper">
      <EnclosureModal
        show={show}
        setShow={setShow}
      />

      <div className="home-cover">
        <img
          className="home-cover-img"
          src="https://bookmepk.s3.eu-central-1.amazonaws.com/static/images/banners/nzweb.jpg"
          alt=""
        />
      </div>

      <div className="home-title select-match-title">
        Select your favourite match
      </div>

      <div
        className="result-box"
        style={{ minHeight: "300px" }}
      >
        <div className="cricket-ticket-space">
          {alltickets.map((item) => {
            return (
              <CricketTicket
                info={item}
                setTicket={setTicket}
                setShow={setShow}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
