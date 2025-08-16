import axios from "axios";

const carInstance = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": 'application/json'
    },
    timeout:5000
   
})



export default carInstance