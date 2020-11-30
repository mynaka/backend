const { writeFileSync } = require('fs');
const { join } = require('path');
const { build } = require('../../app');
const { getTodos } = require('../../lib/get-todos');
require('tap').mochaGlobals();
require('should');

describe('For the route for creating a todo POST (/todo)', () => {
    let app;
    const ids = []; 
    const filename = join(__dirname, '../../database.json');
    const encoding = 'utf8';

    before(async () => {
        //initialize backend app
        app = await build();
    })

    after( async () => {
        //clean up the database
        const todos = getTodos(filename, encoding);
        for (const id of ids){
            //find index
            const index = todos.findIndex(todo => todo.id === id);

            //delete id
            if (index >= 0){
                todos.splice(index,1)
            }
            
            writeFileSync(filename, JSON.stringify({ todos }, null, 2), encoding);
        }
    });

    it('it should return { success: true, data: (new todo object) } and has a status code of 200 when called using POST', async () => {
        const response = await app.inject({
            method: 'POST',
            url: '/todo',
            payload: {
                text: 'This is a todo',
                done: false 
            }
        });

        const payload = response.json();
        const { statusCode } = response;
        const { success, data } = payload;
        const { text, done, id } = data;

        success.should.equal(true);
        statusCode.should.equal(200);
        text.should.equal('This is a todo');
        done.should.equal(false);

        const todos = getTodos(filename, encoding);
        const index = todos.findIndex(todo => todo.id === id);
        index.should.not.equal(-1);
        const { text: textDatabase, done: doneDatabase } = todos[index];
        text.should.equal(textDatabase);
        done.should.equal(doneDatabase);

        //add the id in the ids array for cleaning
        ids.push(id);
    });
    //another happy path testing but a different way of sending data
    it('it should return { success: true, data: (new todo object)} and has a status code of 200 when called using POST even if no done property was provided. Default fo done should still be false', async () => {
        const response = await app.inject({
            method: 'POST',
            url: '/todo',
            payload: {
                text: 'This is a todo 2'
            }
        });


        const payload = response.json();
        const { statusCode } = response;
        const { success, data } = payload;
        const { text, done, id } = data;

        success.should.equal(true);
        statusCode.should.equal(200);
        text.should.equal('This is a todo 2');
        done.should.equal(false);

        const todos = getTodos(filename, encoding);
        const index = todos.findIndex(todo => todo.id === id);
        index.should.not.equal(-1);
        const { text: textDatabase, done: doneDatabase } = todos[index];
        text.should.equal(textDatabase);
        done.should.equal(doneDatabase);

        //add the id in the ids array for cleaning
        ids.push(id);
    });
});