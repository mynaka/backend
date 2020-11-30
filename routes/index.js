/**
 * initialize all the routes
 * @param {*} app 
 */
exports.routes = (app) => {
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
}