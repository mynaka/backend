const { Todo } = require('../../db');

/**
 * Deletes one todo
 *
 * @param {*} app
 */
exports.deleteOne = app => {
  /**
   * This deletes one todo from the database give a unique ID
   *
   * @param {import('fastify').FastifyRequest} req
   * @param {import('fastify').FastifyReply<Response>} res
   */
  app.delete('/todo/:id', async (req, res) => {
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
  });
};
