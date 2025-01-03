import axios from 'axios';
import { BASEURL } from '../config.js'

export const autoPingServer = async () => {
    try {
        const url = `${BASEURL}/ping`;
        
        const response = await axios.get(url);
        
        if (response.data)
            console.log("[[ 200: WEBSOCKET ]]");
        else
            console.log("[[ 404: WEBSOCKET ]]");

    } catch (error) {
        console.log("[[ 500: WEBSOCKET ]]");
    }
};