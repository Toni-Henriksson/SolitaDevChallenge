import { useState } from "react";
import "./App.css";
import Routes from "./components/routes/Routes";
import Stations from "./components/stations/Stations";

import "./globals/mainbutton.css";
function App() {
  const [toggleNavigation, setToggleNavigation] = useState(true);
  return (
    <div className="App">
      <div className="header">
      {
          toggleNavigation ? 
          <h1>BROWSE ROUTES</h1>
          :
          <h1>BROWSE STATIONS</h1>
        }
      </div>
      <div className="content-container">
        {
          toggleNavigation ? 
          <Routes></Routes>
          :
          <Stations></Stations>
        }
      </div>
      <div className="navigation-container">
        <div className="controls-wrapper">
          <button className="button-main" style={{width: "300px"}} onClick={()=> {setToggleNavigation(true)}}>Routes</button>
          <button className="button-main" style={{width: "300px"}} onClick={()=> {setToggleNavigation(false)}}>Stations</button>
        </div>
      </div>
    </div>
  );
}

export default App;
