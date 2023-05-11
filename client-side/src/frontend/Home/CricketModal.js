import { useState } from "react";

import "./Home.css";
import Payment from "./Payment";

export default function CricketModal({ show, setShow, ticket, setTicket }) {
  const [step, setStep] = useState("enclosure");
  const [success, setSuccess] = useState(false);

  var date = new Date(ticket.date);
  var day = {
    0: "Saturday",
    1: "Sunday",
    2: "Monday",
    3: "Tuesday",
    4: "Wednesday",
    5: "Thursday",
    6: "Friday",
  };
  var month = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sept",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  };

  var enclosures = [
    {
      key: 100,
      name: "Wasim Akram",
      type: "First-Class",
      price: "600",
      seats: 100,
      left: 49,
    },
    {
      key: 2,
      name: "Imran Khan",
      type: "Premium",
      price: "1000",
      seats: 120,
      left: 60,
    },
    {
      key: 3,
      name: "Hanif Muhammad",
      type: "VIP",
      price: "1700",
      seats: 90,
      left: 47,
    },
  ];

  function handleClose() {
    setSuccess(false);
    setShow(show ? false : true);
    setStep("enclosure");
    setTicket((prevState) => ({
      ...prevState,
      tickets: 1,
    }));
  }

  function handleBook(e) {
    console.log(e.target);
    let enclosure;
    for (let i = 0; i < enclosures.length; i++) {
      if (enclosures[i].key == e.target.name) {
        enclosure = enclosures[i];
        console.log(enclosure);
      }
    }

    setTicket((prevState) => ({
      ...prevState,
      enclosure: {
        ...prevState.enclosure,
        ...enclosure,
      },
    }));
    setStep("confirm");

    console.log(ticket);
  }

  function handleTicketInput(e) {
    setTicket((prevState) => ({
      ...prevState,
      tickets: e.target.value,
    }));

    console.log(ticket);
  }

  function handleConfirm() {
    console.log("payment", ticket.tickets, ticket.enclosure.left);
    if (ticket.tickets > 0 && ticket.tickets <= ticket.enclosure.left) {
      console.log("confirm");
      setStep("payment");
    }
  }

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
        <div className="modal-title">
          {step === "enclosure" && "Choose Your Enclosure"}
          {step === "confirm" && "Select your seats"}
          {step === "payment" && "Payment"}
        </div>

        <div
          className="payment-modal-body"
          style={{ display: step === "payment" ? "flex" : "none" }}
        >
          <Payment
            ticket={ticket}
            success={success}
            setSuccess={setSuccess}
          />
        </div>

        <div
          className="enclosure-modal-body"
          style={{ display: step === "enclosure" ? "grid" : "None" }}
        >
          {enclosures.map((item) => {
            return (
              <div className="enclosure-info">
                <div className="enclosure-info-name">{item.name}</div>
                <div className="enclosure-info-type">Type: {item.type}</div>
                <div className="enclosure-info-seats">
                  Seats left: {item.left}
                </div>
                <div className="enclosure-info-price">
                  Price: Rs {item.price}
                </div>
                <button
                  name={item.key}
                  className="enclosure-info-book"
                  onClick={handleBook}
                >
                  bookme
                </button>
              </div>
            );
          })}
        </div>

        <div
          className="confirm-modal-body"
          style={{ display: step === "confirm" ? "flex" : "none" }}
        >
          <div className="confirm-title">
            Match: {ticket.team1} vs {ticket.team2}
          </div>

          <div className="confirm-time">Time: {ticket.time}</div>

          <div className="confirm-date">
            Date: {day[date.getDay()]} {date.getDate()} {month[date.getMonth()]}
            , {date.getFullYear()}
          </div>

          <div className="confirm-enclosure">
            Enclosure: {ticket.enclosure.name}
          </div>

          <div className="confirm-enclosure-type">
            Type: {ticket.enclosure.type}
          </div>

          <div className="confirm-seatleft">
            Seats Left: {ticket.enclosure.left}
          </div>

          <div className="confirm-ticket-num">
            Tickets:{" "}
            <input
              type="number"
              value={ticket.tickets}
              onInput={handleTicketInput}
            />
          </div>

          <div className="confirm-price">
            Price: Rs {ticket.enclosure.price * ticket.tickets}
          </div>

          <div className="confirm-stadium">
            Stadium: {ticket.venue}, {ticket.city}
          </div>

          <button
            className="confirm-btn"
            style={{
              backgroundColor:
                ticket.tickets > 0 && ticket.tickets <= ticket.enclosure.left
                  ? "#f91111c7"
                  : "rgb(220, 220, 220)",
            }}
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>

        <div className="modal-footer">
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
