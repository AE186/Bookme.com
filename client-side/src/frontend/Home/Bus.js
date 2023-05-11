import { useState } from "react";
import { useCookies } from "react-cookie";
import "./Home.css";
import BusTicket from "./BusTicket";
import BusModal from "./BusModal";
// import axios from "axios";



export default function Bus() {
  const [cookies] = useCookies(["user"])


  const [search, setSearch] = useState({ pickup: "", arrival: "", date: "" });
  const [show, setShow] = useState(false);
  const [ticket, setTicket] = useState({
    key: 0,
    _id:cookies.user,
    type: "bus",
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
  // const city = []

  const today = new Date("05-10-2023");
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate() + 1;

  console.log(month + day + year);
  // var result = [];

  // axios.get("http://localhost:5001/bus").then((res) => {

  //   for (let i = 0; i < res.data.length; i++) {
  //     var temp = {
  //       key : res.data[i]._id,
  //       pickup: res.data[i].pickup,
  //       arrival: res.data[i].arrival,
  //       date: res.data[i].date,
  //       pickup_time: res.data[i].pickup_time,
  //       arrival_time: res.data[i].arrival_time,
  //       seats: res.data[i].seats,
  //       left: res.data[i].left,
  //       price: res.data[i].price,
  //     }
  //     if (!city.includes(temp.pickup)){
  //       city.push(temp.pickup)
  //     }
  //     if (!city.includes(temp.arrival)){
  //       city.push(temp.arrival)
  //     }
  //     result.push(temp);
  //   }
  //   // result = res.data;
  //   console.log(result)

  // } , (err) => {
  //   console.log('Could not get the Buses from database')
  // })


  var result = [

    {
      key : '645d16870bef102f815e1f1c',
      pickup: "Lahore",
      arrival: "Islamabad",
      date: "10-10-2023",
      pickup_time: "11:00 AM",
      arrival_time: "16:00 PM",
      seats: 50,
      left: 50,
      price: 3500,
    },
    {
      key : '645d16870bef102f815e1f1d',
      pickup: "Karachi",
      arrival: "Lahore",
      date: "05-10-2023",
      pickup_time: "10:00 AM",
      arrival_time: "03:45 PM",
      seats: 100,
      left: 100,
      price: 7500,
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
