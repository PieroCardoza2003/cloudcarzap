import { WebSocketServer } from 'ws';

const CLIENTS = new Map();


function heartbeat() {
    CLIENTS.forEach((ws, clientId) => {
        if (!ws.isAlive) {
            console.log(`[PING] Cliente inactivo: ${clientId}`);
            CLIENTS.delete(clientId);
            ws.terminate();
        } else {
            ws.isAlive = false;
            ws.ping();
        }
    });
}


export function broadcast(message) {
    CLIENTS.forEach((client) => {
        if(client.readyState === client.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}

export function unicast(clientId, message) {
    if (!CLIENTS.has(clientId)) {
        console.log(`[WARN] Cliente ${clientId} no encontrado.`);
        return;
    }

    const client = CLIENTS.get(clientId);

    if(client.readyState !== client.OPEN) {
        console.log(`[WARN] Cliente ${clientId} no está disponible.`);
        return;
    }
    
    client.send(JSON.stringify(message));
}


setInterval(heartbeat, 30000);


export const initWebSocket = async (server) => {
    const wss = new WebSocketServer({ server });

    wss.on('connection', async function connection(ws, req) {

        // Extraer el ID de la url
        const clientId = req.url.substring(1).trim();
        
        // Validar el ID
        if (!clientId) {
            ws.terminate();
            ws.isRejected = true
            return
        }

        // Validar usuario (fase de prueba solo con tv)
        if (clientId !== 'f3a2e4b7-9c8d-4e1a-bf8e-2d7c4f3e1a89') {
            ws.terminate();
            ws.isRejected = true
            return
        }

        // Verificar que el usuario no tenga una conexion activa
        if (CLIENTS.has(clientId)) {
            console.log(`[Error] Cliente ${clientId} ya esta conectado`);
            ws.isRejected = true
            ws.terminate();
            return
        }

        ws.isAlive = true;
        CLIENTS.set(clientId, ws);
        console.log('[CONNECTION] Se conecto: ' + clientId);


        // Evento que escucha los mensajes del cliente
        ws.on('message', function message(data) {
            /*
            const message = isJson(data)

            if (!message)
                return
            
            CLIENTS.forEach((client) => {
                if(client !== ws && client.readyState === client.OPEN) {
                    client.send(JSON.stringify(message));
                }
            });
            */
        });

        // Evento que maneja los ping
        ws.on('pong', () => {
            ws.isAlive = true;
        });

        // Evento en caso de desconexion del usuario
        ws.on('close', () => {
            if (ws.isRejected) {
                console.log("[CLOSE] La conexion fue rechazada");
                return
            }

            CLIENTS.delete(clientId);
            console.log('[CLOSE] Se desconecto: ' + clientId);
        });
    
        // Evento en caso ocurra un error
        ws.on('error', console.error);
    });
}


export function isJson(data) {
    try {
        const json = JSON.parse(data);
        return json
    } catch(error) {
        return null
    }
}