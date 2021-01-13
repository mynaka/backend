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
            description: 'Logs in one user',
            tags: ['User'],
            summary: 'Logs in one user',
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
            //get text and done with def false from body,
            //regardless of value
            const { username, password } = body;

            const user = await User.findOne({ username }).exec();

            if(!(await bcrypt.compare(password, user.password))){
                return res
                    .unauthorized('auth/wrong-password');
            }
            const data = app.jwt.sign({
                username
            })

            return{
                success: true,
            };
        }
    });
};