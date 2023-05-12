// import React from "react";
// import {useEffect, useState} from "react";
// // import axios from 'axios';
// // import authservice from "../../services/auth_service";
// import { useNavigate } from "react-router-dom";
// // import './Login/Login.css'
// import axios from "axios";

// export default function login(){
//     const navigate = useNavigate();
//     const [token, setToken] = useState("");

//     useEffect(() => {
//         axios.get(`http://localhost:5001/confirm/${tokenReceived}`).then((response)=> {
//         setToken("tokenReceived")
//         })

//     }, []);
    
//     function handlesubmit(){
//         axios.get(`http://localhost:5001/confirm/${token}`).then((response)=>{
//         navigate("/signin");
//         })
//     }


//     return (
//         <div className="centerPage">
//             <h1> Thank you for registering </h1>
//         <button
//           className="login-ele btn"
//           onClick={handlesubmit}
//         >
//           Sign In
//         </button>
//         </div>

//     )
// }
