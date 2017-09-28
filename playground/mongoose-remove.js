const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result)=> {
//     console.log(result);
// });

// Todo.findOneAndRemove
// Todo.findOneAndRemove({_id: '59cd4b929c795d345ccf1b37'}).then((todo) => {
//     console.log(todo);
// });

// Todo.findByIdAndRemove
Todo.findByIdAndRemove('59cd4b929c795d345ccf1b37').then((todo)=> {
    console.log(todo);
});
