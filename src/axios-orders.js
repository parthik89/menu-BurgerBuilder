import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-myburger-fea1a-default-rtdb.firebaseio.com/",
});

export default instance;
