import {React, useState, useEffect} from 'react';
import "./stations.css";
import axios from "axios";
import postItImage from './stations-images/post-it2.png';

const Stations = () => {
  const [listOfStations, setListOfStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(0);
  const [searchStation, setSearchStation] = useState([]);

  useEffect(() => {
    fetchNextPage(next);
  }, [])

  const fetchNextPage = async(next) => {
    setLoading(true);
    axios.get("http://localhost:3001/getStations", { params: { next } }).then((response) => {
      setListOfStations(response.data)
      setLoading(false);
    })
  } 

  const handlePagination = (numOfPages) => {
      let i = next + numOfPages;
      if(i >= 0){
        setNext(i)
        fetchNextPage(i)
      }
  }

  const handleSearch = async(stationName) => {
    axios.get("http://localhost:3001/getStationByName", { params: { stationName } }).then((response) => {
      setSearchStation(response.data)
      console.log(response.data)
    })
  }

  if (loading) {
    return(
    <div style={{alignself: 'center'}}>
      <h2>Loading...</h2>
    </div>
    )
  } 

  return (
    <div>
      <div className='stations-controls'>
        <input placeholder='Search station by name..' className='searchbar'></input>
        <button className='button-main' onClick={()=>handleSearch('Hanasaari')}>search</button>
      </div>
      <div className="stations-list-wrapper">
        {listOfStations.map((station, id) => {
          return (
            <div key={id} className="station-item" onClick={() => console.log(id)}>
              <div className="station-item-section" style={{ backgroundImage: `url(${postItImage})`, backgroundRepeat: `no-repeat`, backgroundSize: `cover` }}>
                <p>STATION</p>
                <p>Station name: {station.Nimi}</p>
                <p>Stations address: {station.Osoite}</p>
                <p>{station.Nimi}</p>
                <p>{station.Nimi}</p>
              </div>
            </div>
          );
        })}
        <div className="pagination-section">
          <button className="button-main" style={{ backgroundColor: 'cyan' }} onClick={() => { handlePagination(-6) }}>last</button>
          <button className="button-main" style={{ backgroundColor: 'cyan' }} onClick={() => { handlePagination(6) }}>next</button>
        </div>
      </div>
    </div>
  );
};

export default Stations;