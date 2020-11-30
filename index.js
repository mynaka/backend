const Fastify = require('fastify');

//server init using fastify
const server = Fastify({
    logger: true,
    trustProxy: true
});

//access root address: http://localhost
server.get('/', {
    //object

    /**
     * @param {*} req - this is the request parameter sent by the client
     */
    handler: async (req) => {
        console.log("Not Hello World");

        //response in JSON format
        return { success: true }
    }
});

async function start () {
    //get the port from env variable
    //export PORT = 8000 && node indext.js or
    //then port = 8000 else default is 8080
    const port = parseInt(process.env.PORT || 8080);
    const address = '0.0.0.0';

    const addr = await server.listen(port, address);
    console.log(`Listening on ${addr}`);
}

start();