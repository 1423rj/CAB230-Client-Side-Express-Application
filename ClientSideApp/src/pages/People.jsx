import {useSearchParams} from "react-router-dom";

import {usePeople, usePeopleExtend} from "../functions";
import {AgGridReact} from "ag-grid-react";
import { CategoryScale } from "chart.js";
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-balham.css"
import Chart from "chart.js/auto";
import {BarChart} from "../components/BarChart";
import { Dataset } from "../functions";

Chart.register(CategoryScale);
export default function People() {
/*--Initialise Variables--*/
    const [searchParams] =useSearchParams();
    const id = searchParams.get("id"); 
    const rowData = usePeopleExtend(id);
    const columns = [
      {headerName:"Movie Name", field: "movieName"},
      {headerName:"ID", field:"movieId"},
      {headerName:"Category", field: "category", sortable:true, filter:"agNumberColumnFilter"},
      {headerName:"Characters", field: "characters"},
  
    ];
    const PeopleData = usePeople(id) /*--Data for individuals--*/
    const Data = Dataset(rowData) /*--This function rounds imdbRatings and displays them in a usable format for the chart-*/

    /*--Charting Function--*/
    function Chart(){
      const chartData ={
        labels: [0,1,2,3,4,5,6,7,8,9,10], 
      datasets: [
        {
          label: "IMDB skewed ratings",
          data: Data,
            backgroundColor: [
              "rgba(75,192,192,1)",
            ],
            borderColor: "black",
            borderWidth: 2
          }
        ]
      };
      return(chartData)
    }
    /*--Ensure the user is loggedin--*/
while(PeopleData.error === true){
  return(
    <div className="bg">
  <div className="container">
  <h1 className="details_hero_title" >Error... </h1>
  <p className="error_hero_content">Error Code: {PeopleData.message}</p>
  </div>
  </div>)
}
/*--Ensure the Chart Data has loaded--*/
while(Data.length === 0){
  return(
    <div className="bg">
  <div className="container">
  <h1 className="details_hero_title" >Loading...</h1>
  </div>
  </div>)
  }
  /*--Return desired Data--*/
  return(
<div className="bg">
    <div className="container">
      <div>
      <h1 className="details_hero_title">{PeopleData.name}</h1>
        <p className="details_hero_content" >Date of Birth: {PeopleData.birthYear }</p>
        <p className="details_hero_content" >Date of Death: {PeopleData.deathYear}</p>
        </div>
    <div className="ag-theme-alpine-dark"
    style={{height: "310px", width: "800px"}} >
     
     <AgGridReact
      columnDefs={columns}
      rowData={rowData}
      pagination={true}
      paginationPageSize={5}
      />  
    </div>
    <div className="chart">
    <BarChart  chartData={Chart()}/>
    </div>
    </div>
    </div>
      )
    }

      

  