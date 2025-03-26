import axios from "../../../utils/axios";

const fetchRelatedVideo = async (id) => {

    // http://localhost:9000/videos?tags_like=javascript&id_ne=6
    const tags = ["javascript", "css", "react"]

    // const queryString = 


  const response = await axios.get(`/videos/${id}`);

  return response.data;
};

export default fetchRelatedVideo;
