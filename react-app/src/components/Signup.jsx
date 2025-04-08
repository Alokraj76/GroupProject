import { Link } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from 'axios';
import "./login.css";


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
        <div className = "login-page">
        <div className="wrapper">
            {/* <Header /> */}
            <form>
               <h2>Sign Up</h2>
                <div className="input-field">
                    <input 
                    type = "text"
                    required
                    value={username} onChange ={(e)=>{
                    setusername(e.target.value)
                    } }/>
                    <label>USERNAME</label>
                 </div>
                
                <div className="input-field">
                <input 
                    type = "password" 
                    required
                    value={password}
                    onChange={(e)=>{setpassword(e.target.value)     
                    }}/>
                <label>PASSWORD</label>
                </div>

                <button onClick={handleApi}>Signup</button>
                <div className="register">
                <p>Already have an account? <Link to ="/Login">Login</Link></p>
                </div>
                </form>
        </div>
        </div>
    )
}

export default Signup;