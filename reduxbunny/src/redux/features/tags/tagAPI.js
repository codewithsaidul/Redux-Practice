import axios from "../../../utils/axios"


const fetchTags = async () => {
    const response = await axios.get('/tags')
    return response.data
}


export default fetchTags