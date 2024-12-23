import React, {useEffect, useState} from "react";
import axios from "axios";

function Register() {

    let [usersData, setUsersData] = useState({
        Name : "",
        Age : "",
        City : "",
        Email : "",
        Password : "",
        SelectRole : ""
    })

    async function registerUser() {
        let res = await axios.post('http://localhost:8000/register', usersData)
        .then((res) => {
            setUsersData(res)
            console.log(res);
            
        })
    }


    return(
        <div style={{marginLeft : "300px", marginTop : "50px"}}>
            <h3>Register Here</h3>
            <p style={{marginBottom : "2px"}}>Name</p>
            <input
            onChange={(e) => {
                setUsersData({...usersData, Name : e.target.value})
            }}
            value={usersData}
            placeholder="Enter Your Name"/>
            <p style={{marginBottom : "2px"}}>Age</p>
            <input
            onChange={(e) => {
                setUsersData({...usersData, Age : e.target.value})
            }}
            value={usersData}
            placeholder="Enter Your Age"/>
            <p style={{marginBottom : "2px"}}>City</p>
            <input 
            onChange={(e) => {
                setUsersData({...usersData, City : e.target.value})
            }}
            value={usersData}
            placeholder="Enter Your City"/>
            <p style={{marginBottom : "2px"}}>Email</p>
            <input 
            onChange={(e) => {
                setUsersData({...usersData, Email : e.target.value})
            }}
            value={usersData}
            placeholder="Enter Your Email"/>
            <p style={{marginBottom : "2px"}}>Password</p>
            <input 
            onChange={(e) => {
                setUsersData({...usersData, Password : e.target.value})
            }}
            value={usersData}
            placeholder="Enter Your Password"/>
            <p style={{marginBottom : "2px"}}>Select Role</p>
            <select
            onChange={(e) => {
                setUsersData({...usersData, Role : e.target.value})
            }}
            value={usersData}>
                <option>Admin</option>
                <option>Customer</option>
            </select>
            <button 
            style={{marginLeft : "2px"}}
            onClick={() => {registerUser()}}>Submit</button>
        </div>
    )
}

export default Register;