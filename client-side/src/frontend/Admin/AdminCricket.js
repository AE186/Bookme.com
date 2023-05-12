import { useEffect, useState } from "react";

import "./Admin.css";
import CricketTicket from "../Home/CricketTicket";
import CreateModal from "./CreateModal";
import UpdateModal from "./UpdateModal";
import axios from "axios";

export default function AdminCricket() {
  const [input, setInput] = useState({
    date: "",
  });
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState({
    key: 0,
    show: false,
  });
  const cookies = useCookies(["admin"]);
  //API call for getting cricket Tickets info from the db
  useEffect(() => {
    axios.post("http://localhost:5001/admin/getDataCricket", {
      id: cookies.admin.username,
      }).then((response) => {
        console.log(response) //response.data is the array of the cricket tickets received from the database")
      }).catch((error) => {
        console.log(error)
      }
    )
  }, []);
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
      <UpdateModal
        event={"cricket"}
        modal={modal}
        setModal={setModal}
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
