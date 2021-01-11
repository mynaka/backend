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
            }
        },
      

        /**
         * handles the request for a given route
         * 
         * @param {import('fastify').FastifyRequest} req
         * @param {import('fastify').FastifyReply<Response>} res
         */
        handler: async (req, res) => {
            const { body } = req;
            //get text and done with def false from body,
            //regardless of value
            const { text, done = false } = body;

            /*if(!text) {
                return res
                    .code(400)
                    .send({
                        success: false,
                        code: 'todo/malformed',
                        message: 'Payload does not have text property'
                    });
            }*/

            const data = new Todo({
                text,
                done,
            });

            await data.save();
            
            return{
                success: true,
                data
            };
        }
    });

};