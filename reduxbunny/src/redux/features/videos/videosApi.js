import axios from "../../../utils/axios"



const fetchVideos = async () => {
    const response = await axios.get("/videos")

    return response.data
}


export default fetchVideos