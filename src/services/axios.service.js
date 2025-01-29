import axios from 'axios';
import { BASEURL } from '../config/envariables.config.js';

export const autoPingServer = async () => {
    try {
        const url = `${BASEURL}/ping`;
        
        const response = await axios.get(url);
        
        if (response.data)
            console.log("(200) SERVER ON");
        else
            console.log("(404) SERVER ERROR");

    } catch (error) {
        console.log("(500) SERVER ERROR");
    }
};