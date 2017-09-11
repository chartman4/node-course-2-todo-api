// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {

    if (err) {
        return console.log('Unable to connect to the MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('59b290144550edd3dfaae3c1')
    // }, {
    //     $set : {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result)
    // })
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('59b28ab94c0567d93115f278')
    }, {
        $set : {
            name: 'Cheryl Hartman'
        },
        $inc: {
            age: +1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result)
    })
    // db.close();
});

