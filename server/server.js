var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');

var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

// middleware for express
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req,res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

//GET /todos/1234123)
app.get('/todos/:id', (req, res) => {
  var id =req.params.id;
  //validate ID using isValid
    // 404 - send empty 
  if (!ObjectID.isValid(id)) {
    return es.status(404).send();
  };

    // findById 
  Todo.findById(id).then((todo) => {
  // success
    if (!todo) {
      return res.status(404).send();
    }
      //if todo - send it back
      //if no todo - send back 404 with empty body
      res.send({todo});
  // error
      // 400 - 
  }).catch((e) => {
    res.status(400).send();
  })

   
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app}
