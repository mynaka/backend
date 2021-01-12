const { todo } = require('./todo');
const { user } = require('./user');
const { definitions } = require('../definitions');
const { SuccessResponse } = definitions;

/**
 * initialize all the routes
 * @param {*} app 
 */
exports.routes = (app) => {
    //access root address: http://localhost
    app.get('/', {
        schema: {
            description: 'Server root route',
            tags: ['Root'],
            summary: 'Server root route',
            response: {
              200: SuccessResponse
            }
        },

        /**
         * @param {*} req - this is the request parameter sent by the client
         */
        handler: async (req) => {
            console.log("Not Hello World");

            //response in JSON format
            return { success: true }
        }
    });
    
    todo(app);
    user(app);
}