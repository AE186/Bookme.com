import React from "react";
// import axios from 'axios';
import authservice from "../../services/auth_service";
import { useNavigate } from "react-router-dom";


const Welcome = (props) => {
    const navigate = useNavigate();
    if (props.match.path === '/confirm/:confirmationCode'){
        // axios.get(`http://localhost:5001/confirm/${props.match.params.confirmationCode}`)
        authservice.verifyUser(props.match.params.confirmationCode)
    }

    return (
        <div className="container">
            <h3>
                Account verified
            </h3>
            <button onClick={() => navigate("/Signin")}>Sign in</button>
        </div>

    );
};

export default Welcome;
