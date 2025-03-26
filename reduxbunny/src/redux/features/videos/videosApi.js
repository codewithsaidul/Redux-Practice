import axios from "../../../utils/axios";



const fetchVideos = async ({tags, searchValue}) => {

    let queryString = '';

    if (tags.length > 0) {
        queryString += tags.map(tag => `tags_like=${tag}`).join('&')
    }

    if (searchValue !== "") {
        queryString += `&q=${searchValue}`
    }

    const response = await axios.get(`/videos?${queryString}`)

    return response.data
}


export default fetchVideos