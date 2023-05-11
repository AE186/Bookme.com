import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import axios from "axios";

import "../Home/Home.css";
import "./User.css";

export default function Setting({ user, setUser }) {
  const [input, setInput] = useState({
    fname: user.fname,
    lname: user.lname,
    email: user.email,
    Password: "",
    reenter_pass: "",
  });

  const [cookies, setCookies, removeCookies] = useCookies(["user"]);

  function handleInput(e) {
    console.log("change");
    document.getElementsByClassName("setting-btn")[0].style.backgroundColor =
      "#f91111c7";

    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit() {
    if (input.Password !== input.reenter_pass) {
      alert("Passwords Don't Match");
      return;
    }

    axios
      .post("http://localhost:5001/user/update", {
        _id: cookies.user,
        fname: input.fname,
        lname: input.lname,
        email: input.email,
        Password: input.Password,
      })
      .then((res) => {
        console.log(res);

        if (res.data.acknowledged) {
          console.log("Changed");
          setUser((prevState) => ({
            ...prevState,
            ...input,
          }));
        } else {
          console.log("error");
        }
      });
  }

  return (
    <div className="setting">
      <div className="home-title title">Settings</div>
      <div className="setting-box">
        <div className="setting-label">First Name </div>
        <input
          type="text"
          className="setting-inp"
          name="fname"
          value={input.fname}
          onChange={handleInput}
        />
        <div className="setting-label">Last Name </div>
        <input
          type="text"
          className="setting-inp"
          name="lname"
          value={input.lname}
          onChange={handleInput}
        />
        <div className="setting-label">Email </div>
        <input
          type="email"
          className="setting-inp"
          name="email"
          value={input.email}
          onChange={handleInput}
        />
        <div className="setting-label">Password </div>
        <input
          type="password"
          className="setting-inp"
          name="Password"
          value={input.Password}
          onChange={handleInput}
        />
        <div className="setting-label">Re-enter Password </div>
        <input
          type="password"
          className="setting-inp"
          name="reenter_pass"
          value={input.reenter_pass}
          onChange={handleInput}
        />
        <button
          className="setting-btn"
          onClick={handleSubmit}
        >
          Apply Changes
        </button>
      </div>
    </div>
  );
}
