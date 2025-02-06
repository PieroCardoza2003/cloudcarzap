import { unicast } from '../connections/socketserver.js';
import { searchYoutube } from '../services/youtube.service.js'

export const unicast_message = async  (req, res) => {
    try {
        const { message } = req.body

        if (!message) 
            return res.status(404).json({ details: 'No se pudo procesar su solicitud' });
        

        if (message.name === "VidePlayerController") {
            const query = message.data.search
            const response = await searchYoutube(query)

            if (!response)
                return res.status(404).json({ details: 'No se pudo procesar su solicitud' });
            message.data.search = response;
        }

        // id : tv sala solo este tiene acceso en fase de testeo
        const userId = 'f3a2e4b7-9c8d-4e1a-bf8e-2d7c4f3e1a89'

        unicast(userId, message)

        console.log("unicast: ", message);

        return res.status(200).json({ details: "Muy bien" });

    } catch (error) {
        return res.status(500).json({ details: "Ocurrio un error" })
    }
}

/*
{
    "message": {
        "name" : "VolumeController",
        "data" : {
            "percentage" : 40,
            "toDevice" : "Tv Sala"
        }
    }
}

{
    "message": {
        "name" : "VidePlayerController",
        "data" : {
            "search" : search,
            "toDevice" : to_device
        }
    }
}
*/