const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '59ca94a33d97dabc5a05725c';
var userID = '59b8718f0f9737c2410e3f81';

if (!ObjectID.isValid(id)) {
    console.log('Id not valid');
}

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log('Id not found');
    }
    console.log('Todo by id', todo);
}).catch((e) => console.log(e));

if (!ObjectID.isValid(userID)) {
    console.log('User Id not valid');
}

User.findById(userID).then((user) => {
    if (!user) {
        return console.log('User Id not found');
    }
    console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));