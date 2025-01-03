import { WebSocketServer } from 'ws';

const CLIENTS = new Map();

export const initWebSocket = async (server) => {
    
    const wss = new WebSocketServer({ server });

    wss.on('connection', async function connection(ws, req) {

        const id = req.url.substring(1).trim();
        
        if(!id) {
            ws.close();
            return
        }

        ws.id_usuario = id;
        CLIENTS.set(ws.id_usuario, ws);
        console.log('[ON] Se conecto: '+ ws.id_usuario);


        // Evento que escucha los mensajes del cliente
        ws.on('message', function message(data) {

            const message = isJson(data)

            if (!message)
                return
            
            CLIENTS.forEach((client) => {
                if(client !== ws && client.readyState === client.OPEN) {
                    client.send(JSON.stringify(message));
                }
            });
        });

        // Evento en caso de desconexion del usuario
        ws.on('close', () => {
            CLIENTS.delete(ws.id_usuario);
            console.log('[OFF] Se desconecto: '+ ws.id_usuario);
        });
    
        // Evento en caso ocurra un error
        ws.on('error', console.error);
    });
}

export function broadcast(message) {
    CLIENTS.forEach((client) => {
        if(client.readyState === client.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}

function isJson(data) {
    try{
        const json = JSON.parse(data);
        return json
    } catch(error){
        return null
    }
}