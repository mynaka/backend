const { getTodos } =  require('../../lib/get-todos');
const { join } = require('path');

/**
 * Gets many todos
 * 
 * @param {} app 
 */
exports.getMany = app => {

    /**
     * This gets the todos from the db
     */
    app.get('/todo', (request) => {
        const encoding = 'utf8';
        const filename = join(__dirname, '../../database.json');
        const todos = getTodos(filename, encoding);
        const data = [];

        for (const todo of todos){
            data.push(todo);
        }
    
        return{
            success: true,
            data
        }; 
    });
}; 