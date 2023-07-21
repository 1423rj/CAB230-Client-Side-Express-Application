import "./styles.css";
import Header from "./components/Header"
import Footer from "./components/Footer"


import Landing from "./pages/Landing"
import Movies from "./pages/Movies"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Details from "./pages/Details"
import People from "./pages/People"
import AppContext from './components/AppContext';


import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

export default function App({component, pageProps}) {

  if(localStorage.getItem('login') == null){
    localStorage.setItem('login', 'Login')
  }
  const [session, setSession] = useState(localStorage.getItem('login'))
  
  /*--Use browser Router to setup navigation. Context to provide login states--*/
  return ( 
    <BrowserRouter> 
<AppContext.Provider value={{ session, setSession }}>
    <div className="App">
    
      <Header/>
      {}
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/people" element={<People/>}/>
        <Route path="/details" element={<Details/>}/>
        
      </Routes>
    
      <Footer/>
    </div>
    </AppContext.Provider>
    </BrowserRouter>
  );
}