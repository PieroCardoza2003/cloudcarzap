import { unicast } from '../connections/socketserver.js';

export const unicast_message = async  (req, res) => {
    try {
        const { message } = req.body

        if (!message) {
            return res.status(200).json({ details: 'No se pudo procesar su solicitud' });
        }

        // id : tv sala solo este tiene acceso en fase de testeo
        const userId = 'f3a2e4b7-9c8d-4e1a-bf8e-2d7c4f3e1a89'

        unicast(userId, message)

        return res.status(200).json({ result: 'OK' });

    } catch (error) {
        return res.status(500).json({
            "message": "ocurrio un error"
        })
    }
}
/*
{
    "message" {
        "name" : "VolumeController",
        "data" : {
            "percentage" : 40,
            "toDevice" : "Tv Sala"
        }
    }
}

*/