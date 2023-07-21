import { useNavigate, useSearchParams } from "react-router-dom";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMovieSpecific, useUrl } from "../functions";


export default function Details() {
  /*-- Get Row Data using ID and MovieSpecific Function--*/
  /*-- Initialise functions ie Navigate--*/
  const [searchParams] =useSearchParams();
  const id = searchParams.get("imdbID"); 
  const rowData = useMovieSpecific(id); 
  const navigate = useNavigate();
  const detailData= useUrl(id);
  const columns = [
    {headerName:"Role", field:"category", sortable:true, filter:"agNumberColumnFilter"},
    {headerName:"Name", field: "name"},
    {headerName:"Character", field: "characters"},
  ];
  while(rowData.length === 0){
    return(
      <div className="bg">
    <div className="container">
    <h1 className="details_hero_title" >Error... </h1>
    <p className="error_hero_content">No provided information</p>
    </div>
    </div>)
  }
  /*--What to display--*/
      return (
        <div className="bg">
        <div className="container">
          <div className="details_hero_title">
            {detailData.title}
          </div>
          <div>
          <div className="details_hero_img"> <img src={detailData.poster} alt="Failed to load" align="right" style={{height: "40%", width: "40%"}}></img>: </div>
          <div className="details_hero_content">
          Released in: {detailData.year} <br />
            Runtime: {detailData.runtime}<br />
            Genres: {detailData.genres}<br />
            Country: {detailData.country}<br />
            Box Office: ${detailData.boxoffice}<br />
            <br />
            {detailData.plot} <br />
            
          </div>
          
          <div className="details_hero_table">
    <div className="ag-theme-alpine-dark"
    style={{height: "400px", width: "600px", }} >
      <AgGridReact
      columnDefs={columns}
      rowData={rowData}
      pagination={true}
      paginationPageSize={10}
      onRowClicked={(row) => navigate('/people?id=' + row.data.id)}/>
    </div>
    </div>
        </div>
        </div>
        </div>
      );
}

