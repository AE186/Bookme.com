import { useState } from "react";

import "./Home.css";
import BusTicket from "./BusTicket";
import BusModal from "./BusModal";

export default function Bus() {
  const [search, setSearch] = useState({ pickup: "", arrival: "", date: "" });
  const [show, setShow] = useState(false);
  const [ticket, setTicket] = useState({
    key: 0,
    pickup: "",
    arrival: "",
    date: "",
    pickup_time: "",
    arrival_time: "",
    seats: 0,
    left: 0,
    price: 0,
    tickets: 1,
  });

  const city = ["Karachi", "Lahore", "Hyderabad", "Islamabad", "peshawar"];

  const today = new Date("05-10-2023");
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate() + 1;

  console.log(month + day + year);

  var result = [];
  result = [
    {
      key: 42069,
      pickup: "Karachi",
      arrival: "Lahore",
      date: "05-10-2023",
      pickup_time: "10:00 AM",
      arrival_time: "03:45 PM",
      seats: 50,
      left: 33,
      price: 7999,
    },
    {
      key: 42069,
      pickup: "Karachi",
      arrival: "Lahore",
      date: "05-10-2023",
      pickup_time: "10:00 AM",
      arrival_time: "03:45 PM",
      seats: 50,
      left: 33,
      price: 7999,
    },
    {
      key: 42069,
      pickup: "Karachi",
      arrival: "Lahore",
      date: "05-10-2023",
      pickup_time: "10:00 AM",
      arrival_time: "03:45 PM",
      seats: 50,
      left: 33,
      price: 7999,
    },
    {
      key: 42069,
      pickup: "Karachi",
      arrival: "Lahore",
      date: "05-10-2023",
      pickup_time: "10:00 AM",
      arrival_time: "03:45 PM",
      seats: 50,
      left: 33,
      price: 7999,
    },
  ];

  var no_inputs = false;
  if (
    search.arrival.length === 0 ||
    search.pickup.length === 0 ||
    search.date.length === 0
  ) {
    no_inputs = true;
  }

  function handleInputChange(e) {
    console.log(e.target.name, e.target.value);
    setSearch({ ...search, [e.target.name]: e.target.value });
  }

  function handleSearch() {}

  return (
    <div className="home-wrapper">
      <BusModal
        ticket={ticket}
        setTicket={setTicket}
        show={show}
        setShow={setShow}
      />

      <div className="home-cover">
        <img
          className="home-cover-img"
          src="https://bookmepk.s3.eu-central-1.amazonaws.com/static/images/banners/rmbmwebimage.jpg?1"
          alt=""
        />
      </div>

      <div className="bus-input-group">
        <select
          name="pickup"
          className="bus-input"
          id="bus-input-pickup"
          value={search.pickup}
          onChange={handleInputChange}
        >
          <option
            value=""
            disabled
            selected
          >
            Pick up
          </option>
          {city.map((item) => {
            return <option value={item}>{item}</option>;
          })}
        </select>

        <select
          name="arrival"
          className="bus-input"
          id="bus-input-arrival"
          value={search.arrival}
          onChange={handleInputChange}
        >
          <option
            value=""
            disabled
            selected
          >
            Arrival
          </option>
          {city.map((item) => {
            return <option value={item}>{item}</option>;
          })}
        </select>

        <input
          type="date"
          name="date"
          min={year + "-" + month + "-" + day}
          className="bus-input"
          id="bus-input-date"
          placeholder="Date"
          value={search.date}
          onChange={handleInputChange}
        />

        <button
          className="bus-input"
          id="bus-input-btn"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="result-box">
        {no_inputs && (
          <div className="no-result">Input all the required Fields.</div>
        )}

        {result.length === 0 && !no_inputs && (
          <div className="no-result">
            Oops! We could not find any bus at this time. Please select a
            different date.
          </div>
        )}

        {result.length > 0 && !no_inputs && (
          <div className="bus-ticket-space">
            {result.map((item) => {
              return (
                <BusTicket
                  info={item}
                  setTicket={setTicket}
                  setShow={setShow}
                  isticket={false}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
