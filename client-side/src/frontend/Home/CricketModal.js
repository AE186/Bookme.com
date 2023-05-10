import { useState } from "react";

import "./Home.css";

export default function EnclosureModal({ show, setShow, ticket, setTicket }) {
  const [step, setStep] = useState("enclosure");

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

  function handleClose(e) {
    setShow(show ? false : true);
    setStep("enclosure");
  }

  function handleBook(e) {
    let enclosure;
    for (let i = 0; i < enclosures.length; i++) {
      if (enclosures[i].key === e.target.name) {
        enclosure = enclosures[i];
      }
    }
    // console.log(enclosure);

    setTicket((prevState) => ({
      ...prevState,
      enclosure: enclosure,
    }));
    setStep("confirm");

    console.log(ticket);
  }

  return (
    <div
      className="cricket-modal"
      style={{ display: show ? "Block" : "None" }}
      onClick={handleClose}
    >
      <div
        className="cricket-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cricket-modal-title">
          {step === "enclosure" && "Choose Your Enclosure"}
          {step === "confirm" && "Select your seats"}
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
          style={{ display: step === "confirm" ? "Block" : "None" }}
        >
          Confirm
        </div>

        <div className="cricket-modal-footer">
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
