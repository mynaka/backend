const { DiscardedToken } = require('../../db');
const { definitions } = require('../../definitions');
const { SuccessResponse } = definitions;

/**
 * this is the route for logging out a user
 *
 * @param {*} app
 */
exports.logout = app => {
  app.get('/logout', {
    schema: {
      description: 'Logs out a user',
      tags: ['User'],
      summary: 'Logs out a user',
      response: {
        200: SuccessResponse
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
     * handles the request for a given route
     *
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply<Response>} res
     */
    handler: async (req, res) => {
      const { token, user } = req;
      const { username } = user;
      const data = new DiscardedToken({
        username,
        token
      });

      await data.save();

      request.destroySession(() => {
        response.send({
          success: true
        })
      });
    }
  })
};
