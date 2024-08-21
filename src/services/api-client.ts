import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "b82cd03832284058af31c1a2f2d2befe",
  },
});
