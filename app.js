const fastify = require('fastify');
const { routes } = require('./routes');

/**
 * Server Init
 * 
 * @param {{ logger: boolean, trustProxy: boolean }} opts 
 * @returns {*}
 */
exports.build = async (opts = { logger: false, trustProxy: false }) => {
    //initialize server using fastify
    const app = fastify(opts);

    routes(app); 

    return app;
};