import React from "react";
import { useState } from "react";
import {  useContext} from "react";
import AppContext from "../components/AppContext"
const API_URL = `http://sefdb02.qut.edu.au:3000`;

export default function Login() {
  return (
   <LoginBar/>
  )
  }

function LoginBar(){
  /*--Initialise Varaibles--*/
  const [innerSearch, setInnerSearch] = useState("");
  const [innerPass, setPass] = useState("");
  const context = useContext(AppContext)
  const [error, setError] = useState("");
  var loggedin = localStorage.getItem("token")
  if(localStorage.getItem('login') == null){
    localStorage.setItem('login', 'Login') /*--Initialise login button should achieve--*/
  }
  /*--Login Function--*/
  const login = () => {
    
    const url = `${API_URL}/user/login`;
  
    return fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({ email: innerSearch, password: innerPass }),
   })
     .then((res) =>
       res.json().then((res) => {
         setError(res)
         console.log(res)
         localStorage.setItem("token", res.bearerToken.token);
         localStorage.setItem("refreshToken", res.refreshToken.token)
         localStorage.setItem("user", innerSearch);
         localStorage.setItem("login", 'Logout');
         context.setSession('Logout')
       })
       
     )
     .catch((error) => console.log(error));
  };
  /*--Logout Function--*/
  const logout = () => {
  
    const url = `${API_URL}/user/logout`;
  
    return fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({ refreshToken: localStorage.getItem("refreshToken")}),
   })
     .then((res) =>
       res.json().then((res) => {
         localStorage.removeItem("token", res.bearerToken);
         localStorage.removeItem("refreshToken", res.refreshToken);
         localStorage.removeItem("user");
         localStorage.setItem("login", 'Login');
         context.setSession('Login')
         console.log(res);
       })
     )
     .catch((error) => console.log('Logout Error:' + error));
  };

  var functionchoice = login;

  if(loggedin != null){
    functionchoice = logout;
    context.setSession('Logout')
    localStorage.setItem("login", "Logout")
  }
  
  return(
  
    <section className="hero_login">
      <div className="body2">
    <div className="login">
    <div className= "form-field">
      <input
      className="userName"
      type="username"
      placeholder="Username" required
      value={innerSearch}
      onChange={(e) => setInnerSearch(e.target.value)}
      /></div>
      
      <div className="form-field">
      <input
      className="password"
      placeholder="Password" required
      name="password"
      id="password"
      type="password"
      value={innerPass}
      onChange={(e) => setPass(e.target.value)}
      /></div>
      <div className="form-field">
      <button className='btn' type="submit" onClick={() => {
        
        functionchoice();
        
    }}>
        {context.session}
      </button>
     
      
      </div>
      <div className="register_hero_content">{error.message}</div>
      
    </div>
    
    
    
    
    </div>
    </section>
  )
}

