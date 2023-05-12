import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import "./Admin.css";
import BusTicket from "../Home/BusTicket";
import CreateModal from "./CreateModal";
import UpdateModal from "./UpdateModal";

export default function AdminBus() {
  const [input, setInput] = useState({
    date: "",
  });
  const [cookies] = useCookies(["admin"]);
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState({
    key: 0,
    show: false,
  });

  var result = [
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
        event={"bus"}
      />
      <UpdateModal
        event={"bus"}
        modal={modal}
        setModal={setModal}
      />
      <div className="admin-title">Bus Tickets</div>
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
              <BusTicket
                info={item}
                isticket={false}
                isupdate={true}
                setModal={setModal}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
