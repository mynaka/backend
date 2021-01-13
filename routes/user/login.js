const bcrypt = require('bcrypt');
const { User } = require('../../db');
const { definitions } = require('../../definitions');
const { LoginResponse, PostUserRequest } = definitions;

/**
 * this is the route for creating a user
 *
 * @param {*} app
 */
exports.login = app => {
  app.post('/login', {
    schema: {
      description: 'Logs in a user',
      tags: ['User'],
      summary: 'Logs in a user',
      body: PostUserRequest,
      response: {
        200: LoginResponse
      }
    },
    /**
     * handles the request for a given route
     * 
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply<Response>} res
     */
    handler: async (req, res) => {
      const { body } = req;
      const { username, password } = body;

      const user = await User.findOne({ username }).exec();

      if(!(await bcrypt.compare(password, user.password))){
        return res
          .unauthorized('auth/wrong-password');
      }
      const data = app.jwt.sign({
        username
      })

      req.session.token = data;

      return{
        success: true,
        data
      }
    }
  })
};
