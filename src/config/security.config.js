import { AUTH_BASEURL, AUTH_CLIENTID, AUTH_SECRET, BASEURL } from './envariables.config.js'

export const config_auth0 = {
    authRequired: false,
    auth0Logout: true,
    secret: AUTH_SECRET,
    baseURL: BASEURL,
    clientID: AUTH_CLIENTID,
    issuerBaseURL: AUTH_BASEURL
};


export const config_limiter = {
    windowMs: 60 * 1000,
    max: 10,
    message: { error: 'Demasiadas solicitudes, intenta nuevamente más tarde.' },
    standardHeaders: true,
    legacyHeaders: false, 
};


export const config_cors = {
    origin: [ BASEURL ],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

export const config_morgan = 'dev'

export const config_limitjson = { limit: '10kb' }

export const config_urlencoded = { extended: true, limit: '10kb' }