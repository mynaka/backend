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
      }
    },

    /**
     * This gets one todos from the database give a unique ID
     *
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply<Response>} res
     */
    handler: async(req, res) => {
      const { params } = req;
      const { id } = params;

      const data = await Todo.findOne({ id }).exec();

      if (!data) {
        return res
          .code(404)
          .send({
            success: false,
            code: 'todo/not-found',
            message: 'Todo does not exist'
          });
      }

      return {
        success: true,
        data
      };
    }
  });
};