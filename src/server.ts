import "reflect-metadata";
import config from './config';
const express = require('express');
const listEndpoints = require('express-list-endpoints');

async function startServer() {
    const app = express();
    await require('./loaders').default({ expressApp: app});
    app.listen(config.port, (err:Error) =>{
        if(err) {
            console.error(err);
            process.exit(1);
            return;
        }
        console.log(`Listening on: http://localhost:${config.port}`);
        console.log("\n#######   Endpoints: ############### \n", listEndpoints(app));
    });
}

startServer();
