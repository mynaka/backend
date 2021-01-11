const data = await Todo.findOne({ id }).exec();

/**
 * Updates one todo
 *
 * @param {*} app
 */
exports.update = app => {
  /**
   * This updates one todo from the database give a unique ID and a payload
   *
   * @param {import('fastify').FastifyRequest} req
   * @param {import('fastify').FastifyReply<Response>} res
   */
  app.put('/todo/:id', async (req, res) => {
    const { params, body } = req;
    const { id } = params;
    // get text and done from body.
    const { text, done } = body || {};

    if (!text && (done === null || done === undefined)) {
      return res
        .code(400)
        .send({
          success: false,
          code: 'todo/malformed',
          message: 'Payload does not have text property'
        });
    }

    // expect that we should be getting at least a text or a done property
    const oldData = await Todo.findOne({ id }).exec();

    if (!oldData){
      return res
        .code(404)
        .send({
          success: false,
          code: 'todo/not-found',
          message: 'Todo does not exist'
        });
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
  });
};
