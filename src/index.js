import app from './app.js';
import { PORT } from './config/envariables.config.js';
import { startTimers } from './services/timers.service.js';
//import { initWebSocket } from './connections/socketserver.js';

async function main() {
    try {
      const server = app.listen(PORT, () => {
        console.log('Server ON');
      });

      startTimers();
      //initWebSocket(server);

    } catch(error) {
      console.log('Ocurrio un error: ', error);
    }
  }
  
  main();
  