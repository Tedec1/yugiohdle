import axios from "axios";

export const URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php"

export const callApi = async (options) => {
    const reqString = Object.keys(options).map(k => `${k}=${options[k]}`)
    
    if (reqString.length === 0) return null;
    
    const {data:response} = await axios.get(`
        ${URL}?${reqString}
    `)
    
    // console.log(response.data);

    return response?.data
}