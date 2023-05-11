import { useState } from "react";

import "./Admin.css";
import "../Home/Home.css";

export default function CreateModal({ event, show, setShow }) {
  const [cricket, setCricket] = useState({
    key: 0,
    team1: "",
    team2: "",
    time: "",
    date: "",
    venue: "",
    city: "",
  });

  const [bus, setBus] = useState({
    key: 0,
    pickup: "",
    arrival: "",
    date: "",
    pickup_time: "",
    arrival_time: "",
    price: 0,
  });

  function handleClose() {
    setShow(false);
  }

  //   {
  //       key: 2,
  //       team1: "Pakistan",
  //       team2: "New Zealand",
  //       team1_img:
  //         "https://bookmepk.s3.eu-central-1.amazonaws.com/static/cricket/storage/teams/PAK%20Logo.png",
  //       team2_img:
  //         "https://bookmepk.s3.eu-central-1.amazonaws.com/static/cricket/storage/teams/new-zealand.png",
  //       time: "3:30 PM",
  //       date: "05-05-2023",
  //       venue: "National Bank Stadium",
  //       city: "Karachi",
  //     },

  function handleCricket(e) {
    setCricket((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function handleBus(e) {
    setBus((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function handleCreate() {}

  return (
    <div
      className="modal"
      style={{ display: show ? "Block" : "None" }}
      onClick={handleClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-title">Create Ticket</div>

        <div className="admin-create-body">
          {event === "cricket" && (
            <div>
              <div className="admin-create-inp">
                Team 1:
                <input
                  type="text"
                  name="team1"
                  onChange={handleCricket}
                  value={cricket.team1}
                />
              </div>
              <div className="admin-create-inp">
                Team 2:
                <input
                  type="text"
                  name="team2"
                  onChange={handleCricket}
                  value={cricket.team2}
                />
              </div>
              <div className="admin-create-inp">
                Date:
                <input
                  type="date"
                  name="date"
                  onChange={handleCricket}
                  value={cricket.date}
                />
              </div>
              <div className="admin-create-inp">
                Time:
                <input
                  type="time"
                  name="time"
                  onChange={handleCricket}
                  value={cricket.time}
                />
              </div>
              <div className="admin-create-inp">
                Venue:
                <input
                  type="text"
                  name="venue"
                  onChange={handleCricket}
                  value={cricket.venue}
                />
              </div>
              <div className="admin-create-inp">
                City:
                <input
                  type="text"
                  name="city"
                  onChange={handleCricket}
                  value={cricket.city}
                />
              </div>
            </div>
          )}
          {event === "bus" && (
            <div>
              <div className="admin-create-inp">
                Pick UP:
                <input
                  type="text"
                  name="pickup"
                  onChange={handleBus}
                  value={bus.pickup}
                />
              </div>
              <div className="admin-create-inp">
                arrival:
                <input
                  type="text"
                  name="arrival"
                  onChange={handleBus}
                  value={bus.arrival}
                />
              </div>
              <div className="admin-create-inp">
                Date:
                <input
                  type="date"
                  name="date"
                  onChange={handleBus}
                  value={bus.date}
                />
                <div className="admin-create-inp">
                  Pick up time:
                  <input
                    type="time"
                    name="pickup_time"
                    onChange={handleBus}
                    value={bus.pickup_time}
                  />
                </div>
                <div className="admin-create-inp">
                  Arrival Time:
                  <input
                    type="time"
                    name="arrival_time"
                    onChange={handleBus}
                    value={bus.arrival_time}
                  />
                </div>
              </div>
              <div className="admin-create-inp">
                Price:
                <input
                  type="number"
                  name="price"
                  onChange={handleBus}
                  value={bus.price}
                />
              </div>
            </div>
          )}
          <button
            className="admin-create-btn"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>

        <div className="modal-footer">
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
