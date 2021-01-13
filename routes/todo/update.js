const { Todo } = require('../../db');
const { definitions } = require('../../definitions');
const { GetOneTodoResponse, GetOneTodoParams, PutTodoRequest } = definitions;

/**
 * Updates one todo
 *
 * @param {*} app
 */
exports.update = app => {

  app.put('/todo/:id', {
    schema: {
      description: 'Update one todo',
      tags: ['Todo'],
      summary: 'Update one todo',
      body: PutTodoRequest,
      params: GetOneTodoParams,
      response: {
        200: GetOneTodoResponse
      }
    },
    /**
     * This updates one todo from the database give a unique ID and a payload
     *
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply<Response>} res
     */
    handler: async (req, res) => {
      const { params, body } = req;
      const { id } = params;
      // get text and done from body.
      const { text, done } = body;

      // expect that we should be getting at least a text or a done property
      if (!text && (done === null || done === undefined)) {
        return res
          .badRequest('request/malformed');
      }

      const oldData = await Todo.findOne({ id }).exec();

      if (!oldData) {
        return res
          .notFound('todo/not-found');
      }

      const update = {};

      if (text) {
        update.text = text;
      }
      if (done !== undefined && done !== null) {
        update.done = done;
      }

      update.dateUpdated = new Date().getTime();

      const data = await Todo.findOneAndUpdate(
        { id },
        update,
        { new: true }
      )
        .exec();

      return {
        success: true,
        data
      };
    }
  });
};
