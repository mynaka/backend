const { Todo } = require('../../db');
const { definitions } = require('../../definitions');
const { SuccessResponse, GetOneTodoParams } = definitions;

/**
 * Deletes one todo
 *
 * @param {*} app
 */
exports.deleteOne = app => {
  app.delete('/todo/:id', {
    schema: {
      description: 'Delete one todo',
      tags: ['Todo'],
      summary: 'Delete one todo',
      params: GetOneTodoParams,
      response: {
        200: SuccessResponse
      }
    },
    /**
     * This deletes one todo from the database give a unique ID
     *
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply<Response>} res
     */
    handler: async (req, res) => {
      const { params } = req;
      const { id } = params;

      const data = await Todo.findOneAndDelete({ id }).exec();

      if (!data) {
        return res
          .code(404)
          .send({
            success: false,
            code: 'todo/not-found',
            message: 'Todo doesn\'t exist'
          });
      }

      return {
        success: true
      };
    }
  });
};