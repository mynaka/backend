const { getTodos } = require('../../lib/get-todos');
const { join } = require('path');

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
  app.get('/todo/:id', (req,res) => {
    const { params } = req;
    const { id } = params;

    const encoding = 'utf8';
    const filename = join(__dirname, '../../database.json');
    const todos = getTodos(filename, encoding);

    const index = todos.findIndex(todo => todo.id === id);

    if (index < 0) {
        return response
          .code(404)
          .send({
            success: false,
            code: 'todo/not-found',
            message: 'Todo doesn\'t exist'
        });
    }
  

    const data = todos[index];

    return {
      success: true,
      data
    };
  });
};
