const { Todo } = require('../../db');

/**
 * Gets one todo
 *
 * @param {*} app
 */
exports.get = app => {
  /**
   * This gets one todos from the database give a unique ID
   *
   * @param {import('fastify').FastifyRequest} req
   * @param {import('fastify').FastifyReply<Response>} res
   */
  app.get('/todo/:id', async(req, res) => {
    const { params } = req;
    const { id } = params;

    const data = await Todo.findOne({ id }).exec();

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
      success: true,
      data
    };
  });
};
