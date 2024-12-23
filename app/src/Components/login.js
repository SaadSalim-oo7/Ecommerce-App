import React, {useEffect, useState} from "react";
import axios from 'axios';



function Login() {

    let [userDetails, setUserDetails] = useState({ Email : "", Password : "" });
    let [responseStatus, setResponseStatus] = useState({ isLoggedIn : null, message : ""  })

    async function loginUser() {
    let res = await axios.post('http://localhost:8000/login', userDetails);
    console.log(res);
    if (res.data.Success) {
        setResponseStatus({
            isLoggedIn : true,
            message : res.data.Success
        })
    } else {
        setResponseStatus({
            isLoggedIn : false,
            message : res.data.Error
        })
    }
    }

    return(
        <div style={{marginLeft : "200px", marginTop : "50px"}}>
            <h1>Log In</h1>
            <p>Email</p>
            <input 
            onChange={(e) => {
                setUserDetails({...userDetails, Email : e.target.value })
            }}
            value={userDetails.Email}
            placeholder="Enter Your Email"/>
            <p>Password</p>
            <input type="password"
            onChange={(e) => {
                setUserDetails({...userDetails, Password : e.target.value})
            }}
            value={userDetails.Password}
            placeholder="Enter Your Password"/>
            <br/>
            <br/>
            <button 
             onClick={() => {loginUser()}}
            >Login</button>
            { responseStatus.isLoggedIn == true ? <p style={{color : "green"}}> {responseStatus.message} </p> : responseStatus.isLoggedIn == false ? <p style={{color : "red"}}> {responseStatus.message} </p> : "" }
        </div>
    )
}

export default Login;