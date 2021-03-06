const config = require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');


var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var { authenticate } = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

// middleware for express
app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({ todos });
  }, (e) => {
    res.status(400).send(e);
  });
});

//GET /todos/1234123)
app.get('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  //validate ID using isValid
  // 404 - send empty 
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  };

  // findById 
  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    // success
    if (!todo) {
      return res.status(404).send();
    }
    //if todo - send it back
    //if no todo - send back 404 with empty body
    res.send({ todo });
    // error
    // 400 - 
  }).catch((e) => {
    res.status(400).send();
  })


});

app.delete('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  //validate ID using isValid
  // 404 - send empty 
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  };
  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    //if no todo - send back 404 with empty body
    if (!todo) {

      return res.status(404).send();
    }
    // success
    //if todo - send it back
    res.status(200).send({ todo });
    // error 400 - 
  }).catch((e) => {
    res.status(400).send();
  });
});



app.patch('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({_id : id, _creator: req.user._id}, { $set: body }, { new: true })
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });

    }).catch((e) => {
      res.status(400).send();
    })
});

// POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password).then((user) => {
    // res.send(user);
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);

    })
  }).catch((e) => {
    res.status(400).send();
  })
  // res.send(body);
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app }
