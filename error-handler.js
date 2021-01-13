/**
 *
 * @param {Error} error
 * @param {import('fastify').FastifyRequest} req
 * @param {import('fastify').FastifyReply<Response>} res
 */
exports.errorHandler = (error, req, res) => {
    let statusCode = error.statusCode || 500;
    let errorCode = error.message;
    let errorMessage = error.message;
  
    const errors = {
        'todo/not-found': 'Todo cannot be found using the given ID',
        'request/malformed': 'Payload doesn\'t have the necessary properties',
        'auth/wrong-password': 'Password is not correct',
        'auth/no-authorization-header': 'No authorization header found',
        'auth/no-user': 'No user is found using username',
        'auth/expired': 'Token has expired',
        'auth/unauthorized': 'You are not authorized to use this path'
    

    }
  
    if (error.validation && error.validation.length && error.validationContext === 'body') {
        statusCode = 400;
        errorCode = 'request/malformed';
    }
  
    if (errorMessage === errorCode) { 
        errorMessage = errors[errorCode];
    }
  
    return res
        .code(statusCode)
        .send({
            sucess: false,
            code: errorCode,
            message: errorMessage
        });
}