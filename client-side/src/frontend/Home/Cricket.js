import { useState } from "react";

import "./Home.css";
import CricketTicket from "./CricketTicket";
import CricketModal from "./CricketModal";
import axios from "axios";
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
    enclosure: {
      key: 0,
      name: "",
      type: "",
      price: "",
      seats: 0,
      left: 0,
    },
    tickets: 1,
  });
  var alltickets = [];

  axios.get("http://localhost:5001/cricket").then((res) => {
    for (let i=0 ; i<res.data.length ; i++){
      temp = {
        key: res.data[i]._id,
        team1: res.data[i].team1,
        team2: res.data[i].team2,
        time: res.data[i].time,
        date: res.data[i].date,
        venue: res.data[i].venue,
        city: res.data[i].city,
      }
      alltickets.push(temp)
    }
  });

  // var alltickets = [
  //   {
  //     key: 1,
  //     team1: "Pakistan",
  //     team2: "New Zealand",
  //     team1_img:
  //       "https://bookmepk.s3.eu-central-1.amazonaws.com/static/cricket/storage/teams/PAK%20Logo.png",
  //     team2_img:
  //       "https://bookmepk.s3.eu-central-1.amazonaws.com/static/cricket/storage/teams/new-zealand.png",
  //     time: "3:30 PM",
  //     date: "05-05-2023",
  //     venue: "National Bank Stadium",
  //     city: "Karachi",
  //   },
  //   {
  //     key: 2,
  //     team1: "Pakistan",
  //     team2: "New Zealand",
  //     team1_img:
  //       "https://bookmepk.s3.eu-central-1.amazonaws.com/static/cricket/storage/teams/PAK%20Logo.png",
  //     team2_img:
  //       "https://bookmepk.s3.eu-central-1.amazonaws.com/static/cricket/storage/teams/new-zealand.png",
  //     time: "3:30 PM",
  //     date: "05-05-2023",
  //     venue: "National Bank Stadium",
  //     city: "Karachi",
  //   },
  //   {
  //     key: 3,
  //     team1: "Pakistan",
  //     team2: "New Zealand",
  //     team1_img:
  //       "https://bookmepk.s3.eu-central-1.amazonaws.com/static/cricket/storage/teams/PAK%20Logo.png",
  //     team2_img:
  //       "https://bookmepk.s3.eu-central-1.amazonaws.com/static/cricket/storage/teams/new-zealand.png",
  //     time: "3:30 PM",
  //     date: "05-05-2023",
  //     venue: "National Bank Stadium",
  //     city: "Karachi",
  //   },
  // ];

  return (
    <div className="home-wrapper">
      <CricketModal
        ticket={ticket}
        setTicket={setTicket}
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
                isticket={false}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
