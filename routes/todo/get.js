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
   */
  app.get('/todo/:id', (req) => {
    const { params } = req;
    const { id } = params;

    const encoding = 'utf8';
    const filename = join(__dirname, '../../database.json');
    const todos = getTodos(filename, encoding);

    const index = todos.findIndex(todo => todo.id === id);

    const data = todos[index];

    return {
      success: true,
      data
    };
  });
};
