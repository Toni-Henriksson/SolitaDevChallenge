import "./App.css";
import {useState, useEffect} from 'react';
import Axios from 'axios';
import axios from "axios";

function App() {
  const [listOfRoutes, setListOfRoutes] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/getData").then((response) => {
      setListOfRoutes(response.getData)
    })
  }, [])
  
  return (
    <div className="App">
      <h1>Routes</h1>
      <div className="RoutesListWrapper">
        {listOfRoutes.map((route) => {
          return(
            <div>
              <h1>Start location: {route.DepartureStationName}</h1>
              <h1>Return location: {route.ReturnStationName}</h1>
              <h1>Distance: {route.Distance}</h1>
              <h1>Duration: {route.Duration}</h1>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
