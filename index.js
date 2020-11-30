const { build } = require('./app');

/**
 * starts the application
 */
async function start () {
    //calls to build an app
    const app = await build();
    //get the port from env variable
    //export PORT = 8000 && node indext.js or
    //then port = 8000 else default is 8080
    const port = parseInt(process.env.PORT || 8080);
    const address = '0.0.0.0';

    const addr = await app.listen(port, address);
    console.log(`Listening on ${addr}`);
}

start();