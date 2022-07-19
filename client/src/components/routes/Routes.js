import { React, useState, useEffect, scrollview } from 'react';
import "./routes.css";
import axios from "axios";

import startImg from './images/locationStart.png';
import returnImg from './images/locationReturn.png';
import card from './images/card_small.png';

const Routes = () => {
  const [listOfRoutes, setListOfRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(0);

  const [searchedJourney, setSearchedJourney] = useState('');
  const singleJourneyCalculations = [];

  useEffect(() => {
    fetchNextPage(next);
  }, [])

  const fetchNextPage = async (next) => {
    setLoading(true);
    axios.get("http://localhost:3001/getNextData", { params: { next } }).then((response) => {
      setListOfRoutes(response.data)
      setLoading(false);
    })
  }
  const handlePagination = (numOfPages) => {
    let i = next + numOfPages;
    if (i >= 0) {
      setNext(i)
      fetchNextPage(i)
    }
  }

  const HandleSearch = async(stationName) => {
    axios.get("http://localhost:3001/getStationByName", { params: { stationName } }).then((response) => {  
      console.log(response.data)
      calculateStationJourneys(response.data[0].ID)
    })
  }

  const calculateStationJourneys = (stationid) => {
    axios.get("http://localhost:3001/getStationJourneys", { params: { stationid } }).then((response) => {
      singleJourneyCalculations.push(response.data)
      console.log(singleJourneyCalculations)
    })
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <div className='stations-controls'>
        <input placeholder='Search journey by start location..' className='searchbar' onChange={(e) => { setSearchedJourney(e.target.value) }}></input>
        <button className='button-main' onClick={() => HandleSearch(searchedJourney)}>search</button>
      </div>
      <div className="routes-list-wrapper">
        {listOfRoutes.map((route, id) => {
          return (
            <div key={id} className="route-card" style={{ backgroundImage: `url(${card})`, backgroundRepeat: `no-repeat`, backgroundSize: `cover` }}>
              <div className="route-item-section">
                <div className="route-item-image-container">
                  <img className="route-item-image" src={startImg}></img>
                </div>
                <div className="route-item-text-container">
                  <p>{route.departurestation}</p>
                </div>
              </div>
              <div className="route-item-section">
                <div className="route-item-image-container">
                  <img className="route-item-image" src={returnImg}></img>
                </div>
                <div className="route-item-text-container">
                  <p>{route.returnstation}</p>
                </div>
              </div>
              <p>Distance: {route.distance}</p>
              <p>Duration: {route.duration}</p>
            </div>
          );
        })}
        <div className="pagination-section">
          <button className="button-main" style={{ backgroundColor: 'cyan' }} onClick={() => { handlePagination(-15) }}>last</button>
          <button className="button-main" style={{ backgroundColor: 'cyan' }} onClick={() => { handlePagination(15) }}>next</button>
        </div>
      </div>
    </div>
  );
};

export default Routes;