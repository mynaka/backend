const { v4: uuid } = require('uuid');
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
/**
 * this is the route for creating todos  
 * 
 * @param {*} app 
 */
exports.create = app => {
    app.post('/todo', {
        /**
         * handles the request for a given route
         * 
         * @param {import('fastify').FastifyRequest} req
         * @param {import('fastify').FastifyReply<Response>} res
         */
        handler: async (req, res) => {
            //creates a unique identifier
            const id = uuid();
            const { body } = req;
            //get text and done with def false from body,
            //regardless of value
            const { text, done = false } = body;
            const filename = join(__dirname, '../../database.json');
            const encoding = 'utf8';

            const databaseStringContents = readFileSync(filename, encoding);    
            const database = JSON.parse(databaseStringContents);

            const data = {
                id,
                text,
                done,
                dateCreated: new Date().getTime(), //UNIX Epoch Time in ms
                dateUpdates: new Date().getTime()
            };

            database.todos.push(data);

            //added null and 2 for visual clarity
            const newDatabaseStringContents = JSON.stringify(database, null, 2);
            writeFileSync(filename, newDatabaseStringContents, encoding);
            
            return{
                success: true,
                data
            };
        }
    });

};