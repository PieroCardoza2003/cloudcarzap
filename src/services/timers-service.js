import schedule from 'node-schedule';
import { autoPingServer } from './axios-service.js'

export const startTimers = () => {
    timerAutoPing()
}

// test 10 segundos: '*/10 * * * * *'
// test 10 minutos: '*/10 * * * *'
const timerAutoPing = () => {
    schedule.scheduleJob('*/10 * * * *', async function() {
      autoPingServer()
    });
}

