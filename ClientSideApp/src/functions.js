
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-balham.css"
import React, {useState, useEffect} from 'react';
const API_URL = `http://sefdb02.qut.edu.au:3000`;
export function useBase(Search){
  
    const [rowData, setRowData] = useState([]);
    //const navigate = useNavigate()
  
    useEffect(() => {fetch("http://sefdb02.qut.edu.au:3000/movies/search?title=" + Search)
    .then(res => res.json())
    .then(data => data.data)
    .then(data => data.map(movie => { return{
      title: movie.title,
      year: movie.year,
      imdbID: movie.imdbID,
      imdbRating: movie.imdbRating,
      rottenTomatoesRating: movie.rottenTomatoesRating,
      metacriticRating: movie.metacriticRating,
      classification: movie.classification
    };
    })
    ) 
    .then(movie => setRowData(movie))
    .catch(error => console.log(error));
    }, [Search])
    return(rowData)
    
  }
  export function useUrl(search){
    const[details, setDetails] = useState([])
  useEffect(() => {fetch("http://sefdb02.qut.edu.au:3000/movies/data/" + search)
  .then(res => res.json())
  .then(data => setDetails(data))
  
  }, [search]);
    return(details)
  }

  export function SearchBar(props) {
    const [innerSearch, setInnerSearch] = useState("");
    return(
      <div>
        <input
        aria-labelledby="search-button"
        name="search"
        id="search"
        type="search"
        value={innerSearch}
        onChange={(e) => setInnerSearch(e.target.value)}
        />
        <button id="search button" type="button" onClick={() => props.onSubmit(innerSearch)}>
          Search
        </button>
        <button id="reset button" type="button" onClick={() => props.onSubmit("")}> 
        Reset 
        </button>
      </div>
    )
  }

export function useMovieSpecific(Search){
  
  const [rowData, setRowData] = useState([]);
  //const navigate = useNavigate();

  useEffect(() => {fetch("http://sefdb02.qut.edu.au:3000/movies/data/" + Search)
  .then(res => res.json())
  .then(data => data.principals)
  .then(principals => principals.map(movie => { return{
    category: movie.category,
    name: movie.name,
    characters: movie.characters,
    id: movie.id
  };

  })
  )
   
  .then(movie => setRowData(movie))
  .catch(error => console.log(error));
  }, [Search])
  return(rowData)
}
export function usePeople(id){
  
    const url = `${API_URL}/people/${id}`;
  
    //console.log(yyet)
    const token = localStorage.getItem("token")
    
    const [details, setDetails] = useState([]);
    
      
    useEffect(() => {fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
       },
     })
        .then((res) => res.json())
        .then(res => setDetails(res))
        
        .catch(error => setDetails(error));
},[url, token])

return(details)
}

export function usePeopleExtend(id){
  
  const url = `${API_URL}/people/${id}`;

  
  const token = localStorage.getItem("token")
  
  const [details, setDetails] = useState([]);
  
    
  useEffect(() => {fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
     },
   })
      .then((res) => res.json())
      .then(data => data.roles)
  .then(roles => roles.map(movie => { return{
    movieName: movie.movieName,
    movieId: movie.movieId,
    category: movie.category,
    characters: movie.characters,
    imdbRating: movie.imdbRating
  }}))
  .then(movie => setDetails(movie))
  .catch(error => setDetails(error));
  
},[token, url])

return(details)
}

/*--Get data for graph in Person.jsx--*/

export function Dataset(dataset){
 
    
      var row = [];
    var rowammended = [];
    
    
    for(let i = 0; i<dataset.length; i++){
      row[i] = Math.round(dataset[i].imdbRating)
    }
    
    for(let i = 0; i<row.length; i++){
      rowammended[i] = row.filter(x => x === i).length 
    }
   

  return(rowammended)
}

