import axios from "../../../utils/axios";

const fetchVideo = async (id) => {
  const response = await axios.get(`/videos/${id}`);

  return response.data;
};

export default fetchVideo;
