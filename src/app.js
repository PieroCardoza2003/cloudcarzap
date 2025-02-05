import express from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import { config_limiter, config_cors, config_morgan, config_urlencoded, config_limitjson } from './config/security.config.js'
import router_logs from './routes/logs.routes.js';
import router_channel from './routes/channel.routes.js';

const app = express()

app.use(rateLimit(config_limiter));
app.use(cors(config_cors));
app.use(helmet());
app.use(morgan(config_morgan));
app.use(express.json(config_limitjson));
app.use(express.urlencoded(config_urlencoded));

app.use('/logs' , router_logs);

app.use('/channel' , router_channel);

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