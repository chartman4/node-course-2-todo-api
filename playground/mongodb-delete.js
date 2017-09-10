// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {

    if (err) {
        return console.log('Unable to connect to the MongoDB server');
    }
    console.log('Connected to MongoDB server');

    //deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result) => {
    //     console.log(result);
    // });
    // db.collection('Users').deleteMany({ name: 'Tom Hartman' }).then((result) => {
    //     console.log(result);
    // });

    //deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //         console.log(result);
    // });

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({ completed: false }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID("59b57b4bd525818759fd8a40")
    }).then((results) => {
        console.log(JSON.stringify(results, undefined, 2));
    })
    // db.close();
});

