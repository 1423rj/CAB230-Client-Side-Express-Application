import React from "react";
import { useState } from "react";
const API_URL = `http://sefdb02.qut.edu.au:3000`;

export default function Register() {
 
  return(
    <RegisterBar/>
  )

}

function RegisterBar() {
  const [innerSearch, setInnerSearch] = useState("");
  const [innerPass, setPass] = useState("");
  const [error, setError] = useState("");
  /*--Auth function to register--*/
  const register = () => {
  
    const url = `${API_URL}/user/register`;
  
    return fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({ email: innerSearch, password: innerPass }),
   })
     .then((res) =>
       res.json().then((res) => {
         setError(res);
         console.log(res)
         
       })
       
       
     )
     .catch((error) => console.log(error));
     
  };
  
  
  /*--Register Bar and Buttons--*/
  return(
    
    <section className="hero_register">
      <div className="body2">
    <div className="register">
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
    <button className='btn' type="submit" onClick={register}>
        Register
      </button>
      
      </div>
      <div className="register_hero_content">{error.message}</div>
      
      
    </div>
    
    
    
    
    
    </div>
    
    </section>
    
    
  )
}