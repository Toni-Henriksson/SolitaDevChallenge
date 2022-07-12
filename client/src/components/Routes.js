import React from 'react';

const Routes = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
          <div className="RoutesListWrapper">
          {posts.map((route) => {
            return(
              <div key={route.id} className="RouteCard">
                <p>Start location: {route.departurestation}</p>
                <p>Return location: {route.returnstation}</p>
                <p>Distance: {route.distance}</p>
                <p>Duration: {route.duration}</p>
              </div>
            )
          })}
        </div>
    
  );
};

export default Routes;