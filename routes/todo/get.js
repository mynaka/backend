const { Todo } = require('../../db');
const { definitions } = require('../../definitions');
const { GetOneTodoResponse, GetOneTodoParams } = definitions;

/**
 * Gets one todo
 *
 * @param {*} app
 */
exports.get = app => {

  app.get('/todo/:id', {
    schema: {
      description: 'Get one todo',
      tags: ['Todo'],
      summary: 'Get one todo',
      params: GetOneTodoParams,
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
     * This gets one todos from the database give a unique ID
     *
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply<Response>} res
     */
    handler: async(req, res) => {
      const { params, user } = req;
      const { username } = user;
      const { id } = params;

      const data = await Todo.findOne({ id, username }).exec();

      if (!data) {
        return res
          .notFound('todo/not-found')
      }

      return {
        success: true,
        data
      };
    }
  });
};