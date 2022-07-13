import {React, image} from 'react';
import "./routes.css";
import startImg from './images/locationStart.png';
import returnImg from './images/locationReturn.png';
const Routes = ({ posts, loading }) => {
  <a href="https://www.flaticon.com/free-icons/map" title="map icons">Map icons created by Freepik - Flaticon</a>

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="routes-list-wrapper">
      {posts.map((route) => {
        return (
          <div key={route.id} className="route-card">
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
    </div>
  );
};

export default Routes;