import express from 'express';
import morgan from 'morgan';
import pkg from 'express-openid-connect';
import { BASEURL, AUTH_SECRET, AUTH_CLIENTID, AUTH_BASEURL } from './config.js';
import { broadcast } from './connections/socketserver.js';

const { auth, requiresAuth } = pkg;

const app = express()

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: AUTH_SECRET,
    baseURL: BASEURL,
    clientID: AUTH_CLIENTID,
    issuerBaseURL: AUTH_BASEURL
};

app.use(auth(config));
app.use(morgan('dev'));
app.use(express.json());

/*app.get('/', (req, res) => {
    res.send(
        req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
    );
});*/

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user, null, 2));
});

app.post('/ping', (req, res) => {
    const { command } = req.body;  // Extraer el mensaje del JSON

    if (!command) {
        return res.status(400).json({ error: 'El campo "msg" es obligatorio' });
    }

    broadcast( {command} )
    console.log({command})

    res.status(200).json({ message: 'pong...' });
});

app.use((req, res, next) => {
    res.status(404).json({ message: 'bad request' });
});

export default app;