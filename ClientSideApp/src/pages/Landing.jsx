//import React from "react";

import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-balham.css"
import { Link } from "react-router-dom";
import React from 'react';

export default function Landing() {
  return (
    
    <main>
      
      <Hero />
    </main>
  
  );
}



/*--Content to Display--*/
const Hero = () => (
  
  <section className="hero">
    <div className="hero__content">
    <h1 className="hero__title">Flick Finder</h1>
      <p className="hero__subtitle">The place to find movies</p>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      </div>
  </section>
);

