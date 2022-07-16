import axios from "axios";

export const HandleSearch = async(parameter, endpoint) => {
    axios.get("http://localhost:3001/" + endpoint, { params: { parameter } }).then((response) => {  
      console.log(response.data)
    })
}
