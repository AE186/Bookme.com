import { useState } from "react";

import "./Admin.css";
import CricketTicket from "../Home/CricketTicket";
import CreateModal from "./CreateModal";

export default function AdminCricket() {
  const [input, setInput] = useState({
    date: "",
  });
  const [show, setShow] = useState(true);
  const [modal, setModal] = useState({
    key: 0,
    show: false,
  });

  var result = [
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
    // {
    //   key: 3,
    //   team1: "Pakistan",
    //   team2: "New Zealand",
    //   team1_img:
    //     "https://bookmepk.s3.eu-central-1.amazonaws.com/static/cricket/storage/teams/PAK%20Logo.png",
    //   team2_img:
    //     "https://bookmepk.s3.eu-central-1.amazonaws.com/static/cricket/storage/teams/new-zealand.png",
    //   time: "3:30 PM",
    //   date: "05-05-2023",
    //   venue: "National Bank Stadium",
    //   city: "Karachi",
    // },
  ];

  function handleChange(e) {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function handleCreate() {
    setShow(true);
  }

  return (
    <div className="admin-service">
      <CreateModal
        show={show}
        setShow={setShow}
        event={"cricket"}
      />
      <div className="admin-title">Cricket Tickets</div>
      <div className="admin-body">
        <div className="admin-search">
          <input
            className="admin-inp"
            type="date"
            name="date"
            id="date"
            onChange={handleChange}
            value={input.date}
          />
          <button
            className="admin-inp admin-btn"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
        <div className="admin-results">
          {result.map((item) => {
            return (
              <CricketTicket
                info={item}
                isticket={true}
                setModal={setModal}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}