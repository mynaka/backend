const { Todo } = require('../../db');
const { definitions } = require('../../definitions');
const { GetOneTodoResponse, PostTodoRequest } = definitions;

/**
 * this is the route for creating todos  
 * 
 * @param {*} app 
 */
exports.create = app => {
    app.post('/todo', {
        schema: {
            description: 'Create one todo',
            tags: ['Todo'],
            summary: 'Create one todo',
            body: PostTodoRequest,
            response: {
              200: GetOneTodoResponse
            },
            security: [
              {
                bearer: []
              }
            ]
        },
        preHandler: app.auth([
            app.verifyJWT
        ]),

        /**
         * handles the request for a given route
         * 
         * @param {import('fastify').FastifyRequest} req
         * @param {import('fastify').FastifyReply<Response>} res
         */
        handler: async (req, res) => {
            const { body, user } = req;
            //get text and done with def false from body,
            //regardless of value
            const { text, done = false } = body;
            const { username } = user;

            const data = new Todo({
                text,
                done,
                username
            });

            await data.save();
            
            return{
                success: true,
                data
            };
        }
    });

};