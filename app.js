const fastify = require('fastify');

/**
 * Server Init
 * 
 * @param {{ logger: boolean, trustProxy: boolean }} opts 
 * @returns {*}
 */
exports.build = async (opts = { logger: true, trustProxy: true }) => {  
    //initialize server using fastify
    const app = fastify(opts);

    //access root address: http://localhost
    app.get('/', {
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
    return app;
};