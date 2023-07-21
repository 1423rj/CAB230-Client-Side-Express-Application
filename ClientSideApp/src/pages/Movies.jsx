
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-balham.css"

import {useNavigate} from "react-router-dom";
import React, {useState} from 'react';

import { useBase } from "../functions";
import {SearchBar} from "../functions";

export default function Movies() {
  /*--Initialise Variables--*/
  const[search, setSearch] = useState("");
  const navigate = useNavigate();
  const rowData = useBase(search); 
  const columns = [
    {headerName:"Title", field: "title"},
    {headerName:"Year", field:"year", sortable:true, filter:"agNumberColumnFilter"},
    {headerName:"ID", field: "imdbID"},
    {headerName:"Rating", field: "imdbRating"},
    {headerName:"RottenTomatoes", field: "rottenTomatoesRating"},
    {headerName:"Metacritic", field: "metacriticRating"},
    {headerName:"Rated", field: "classification"}

  ];
  
  /*--Return Movie Data--*/
  return(
    <div className="bg">
    <div className="container">
      <h1 className="details_hero_title">Find a Movie</h1>
    <div className="ag-theme-alpine-dark"
    style={{height: "400px", width: "1300px"}} >
      <SearchBar onSubmit={setSearch}/>
      <AgGridReact
      columnDefs={columns}
      rowData={rowData}
      pagination={true}
      paginationPageSize={10}
      onRowClicked={(row) => navigate('/details?imdbID=' + row.data.imdbID)}/>
    </div>
    <div className="movie_padding"></div>
    </div>
    </div>
  );
}
