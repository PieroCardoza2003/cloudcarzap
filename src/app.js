import express from 'express';
import morgan from 'morgan';
import pkg from 'express-openid-connect';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import { config_auth0, config_limiter, config_cors, config_morgan, config_urlencoded, config_limitjson } from './config/security.config.js'
//import { broadcast } from './connections/socketserver.js';
import router_logs from './routes/logs.routes.js';

const { auth, requiresAuth } = pkg;
const app = express()

app.use(auth(config_auth0));
app.use(rateLimit(config_limiter));
app.use(cors(config_cors));
app.use(helmet());
app.use(morgan(config_morgan));
app.use(express.json(config_limitjson));
app.use(express.urlencoded(config_urlencoded));

app.use('/logs' , router_logs);

app.get('/', (req, res) => {
    res.send(
        req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
    );
});

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user, null, 2));
});


/*
app.post('/command', (req, res) => {
    const { command } = req.body;  // Extraer el mensaje del JSON

    if (!command) {
        return res.status(400).json({ error: 'El campo "msg" es obligatorio' });
    }

    broadcast( {command} )
    console.log({command})

    res.status(200).json({ message: 'pong...' });
});
*/
app.get('/ping', (req, res) => {
    res.status(200).json({ status: 'pong' });
});

app.use((req, res, next) => {
    res.status(404).json({ message: 'bad request' });
});


app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
});

export default app;