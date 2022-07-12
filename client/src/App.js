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
      <div>
        <button onClick={()=>{handlePagination(4)}}>Load next</button>
        <button onClick={()=>{handlePagination(-4)}}>Load last</button>
      </div>
      <div className="RoutesListWrapper">
        <Routes posts={listOfRoutes} loading={loading} />
      </div>
    </div>
  );
}

export default App;
