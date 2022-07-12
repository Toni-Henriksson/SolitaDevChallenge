import "./App.css";
import {useState, useEffect} from 'react';
import axios from "axios";
import Routes from "./components/Routes";
import NavBar from "./components/navbar/Navbar";

function App() {
  const [listOfRoutes, setListOfRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(0);

  useEffect(() => {
    fetchNextPage(next);
  }, [])

  const fetchNextPage = async(next) => {
    console.log(next)
    setLoading(true);
    axios.get("http://localhost:3001/getNextData", { params: { next } }).then((response) => {
      console.log(response.data)
      setListOfRoutes(response.data)
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

  return (
    <div className="App">
      <NavBar></NavBar>
      <h1>Routes</h1>
      <div className="RoutesListWrapper">
        <div className="RoutesSection">
          <Routes posts={listOfRoutes} loading={loading} />
        </div>
        <div className="PaginationSection">
          <button className="btn" onClick={()=>{handlePagination(-15)}}>last</button>  
          <button className="btn" onClick={()=>{handlePagination(15)}}>next</button>
        </div>
      </div>
    </div>
  );
}

export default App;
