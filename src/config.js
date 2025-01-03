import {config} from 'dotenv'

config()

function validateEnvVariable(variable, name) {
    if (!variable || variable.trim() === '') {
        throw new Error(`La variable de entorno ${name} no está configurada o está vacía.`);
    }
    return variable;
}

export const PORT = validateEnvVariable(process.env.PORT, 'PORT')
export const BASEURL = validateEnvVariable(process.env.BASEURL, 'BASEURL')
export const AUTH_SECRET = validateEnvVariable(process.env.AUTH_SECRET, 'AUTH_SECRET')
export const AUTH_CLIENTID = validateEnvVariable(process.env.AUTH_CLIENTID, 'AUTH_CLIENTID')
export const AUTH_BASEURL = validateEnvVariable(process.env.AUTH_BASEURL, 'AUTH_BASEURL')