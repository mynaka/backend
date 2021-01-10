const { getTodos } = require('../../lib/get-todos');
const { writeFileSync } = require('fs');
const { join } = require('path');

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
  app.delete('/todo/:id', (req, res) => {
    const { params } = req;
    const { id } = params;

    const encoding = 'utf8';
    const filename = join(__dirname, '../../database.json');
    const todos = getTodos(filename, encoding);

    const index = todos.findIndex(todo => todo.id === id);

    if (index < 0) {
      return res
        .code(404)
        .send({
          success: false,
          code: 'todo/not-found',
          message: 'Todo doesn\'t exist'
        });
    }

    todos.splice(index, 1);

    // we added null and 2 when stringify-ing the object so that
    // the JSON file looks visually understandable
    const newDatabaseStringContents = JSON.stringify({ todos }, null, 2);
    writeFileSync(filename, newDatabaseStringContents, encoding);

    return {
      success: true
    };
  });
};
