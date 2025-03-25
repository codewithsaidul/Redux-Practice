import axios from "../../../utils/axios"



const fetchVideos = async () => {
    const response = await axios.get("/video")

    return response.data
}


export default fetchVideos