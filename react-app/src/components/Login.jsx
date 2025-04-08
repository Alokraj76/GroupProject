import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from 'axios';
import "./login.css";

function Login(){
    const navigate = useNavigate()

    const[username,setusername]= useState('');
    const[password,setpassword]= useState('');
    const handleApi = ()=>{
        const url = 'http://localhost:5000/login';
        const data = {username , password};
        axios.post(url,data)
        .then((res)=>{
            if(res.data.message){
                if(res.data.token){
                    localStorage.setItem('token',res.data.token)
                    localStorage.setItem('userId',res.data.userId)
                    navigate('/')
                }
                alert(res.data.message);
            }
        })
        .catch((err)=>{
            alert('SERVER ERR')
        })
    }

    return (
        <div className="login-page">
        <div className="wrapper">
            {/* <Header /> */}
            <form>
                <h2>Login</h2>

                <div className="input-field">
                    <input
                        type="text"
                        required
                        value={username}
                        onChange={(e)=> setusername(e.target.value)}
                    />
                    <label>USERNAME</label>
                </div>

                <div className="input-field">
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e)=> setpassword(e.target.value)}
                    />
                    <label>PASSWORD</label>
                </div>

                <button type="button" onClick={handleApi}>Login</button>
                <div className="register">
                    <p>Don't have an account? <Link to="/signup">SIGNUP</Link></p>
                </div>
            </form>
        </div>
        </div>
    )
}

export default Login;
