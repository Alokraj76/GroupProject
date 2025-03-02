import { Link } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from 'axios';

function Signup(){

    const[username,setusername]= useState('');
    const[password,setpassword]= useState('');
    // console.log(username);

    const handleApi = ()=>{
        // console.log({username , password});
        const url = 'http://localhost:5000/signup';
        const data = {username , password};
        axios.post(url,data)
        .then((res)=>{
            // console.log(res.data)
            if(res.data.message){
                alert(res.data.message);
            }
        })
        .catch((err)=>{
            // console.log(err);
            alert('SERVER ERR3')
        })
    }
    return (
        <div>
            <Header />
            Welcome to Signup page
            <br></br>
            USERNAME
            <input type = "text" value={username} onChange ={(e)=>{
                setusername(e.target.value)
            } }/>
            <br></br>
            PASSWORD
            <input type = "text" value={password}
            onChange={(e)=>{setpassword(e.target.value)}}/>
            <br></br>
            <button onClick={handleApi}>Signup</button>
            <Link to ="/Login">Login</Link>
        </div>
    )
}

export default Signup;