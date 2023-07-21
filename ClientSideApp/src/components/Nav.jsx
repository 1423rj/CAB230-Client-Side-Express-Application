// navigation links
import{Link} from "react-router-dom";
import AppContext from "../components/AppContext"
import { useContext } from "react";

const API_URL = `http://sefdb02.qut.edu.au:3000`;
export default function Nav() {
/*--Initialise variables such as context--*/
const context = useContext(AppContext)
/*--Function to display the Nav Bar--*/
  function Navbar(){ 

/*--Refresh Token--*/
    const refresh = () => { 
      
      const url = `${API_URL}/user/refresh`;
    
      return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({refreshToken: localStorage.getItem("refreshToken")}),
     })
       .then((res) =>
         res.json().then((res) => {
          console.log(res)
          localStorage.setItem("token", res.bearerToken.token);
          localStorage.setItem("refreshToken", res.refreshToken.token)
         })
       )
       .catch((error) => console.log(error));
       
    };
    /*--Upon each render, this will dynamically change what is displayed in the nav bar--*/
    var user;
    if(localStorage.getItem("user") === null){
      user = 'Register'
      return (
        <nav>
          <ul >
            <li><Link to ="/">Home</Link></li>
            <li ><Link to ="/movies">Movies</Link></li>
            <li ><Link to ="/login">{context.session}</Link></li>
            <li><Link to ='/register'>Register</Link></li>  
          </ul>
        </nav>
        );
    
    }
    else{
      user = localStorage.getItem("user")
      return (
        <nav>
          <ul >
            <li><Link to ="/">Home</Link></li>
            <li ><Link to ="/movies">Movies</Link></li>
            <li ><Link to ="/login">{context.session}</Link></li>
            <li>{user}</li>
            
          <li style={{float:"right"} }>< button onClick={refresh}>Refresh</button> </li>
          
        </ul>
         
        </nav>
       
        );
    }
    }
/*--Return function NavBar--*/
  return (
    <Navbar />
  
    );
}
  

