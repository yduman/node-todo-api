let {ObjectID} = require('mongodb');
let jwt = require('jsonwebtoken');

let {Todo} = require('../../models/todo');
let {User} = require('../../models/user');

let userOneId = new ObjectID();
let userTwoId = new ObjectID();
let users = [
    {
        _id: userOneId,
        email: 'foo@bar.com',
        password: 'user1passwd',
        tokens: [{
            access: 'auth',
            token: jwt.sign({_id: userOneId, access: 'auth'}, 'somesalt').toString()
        }]
    }, 
    {
        _id: userTwoId,
        email: 'foo2@bar.com',
        password: 'user2passwd',
        tokens: [{
            access: 'auth',
            token: jwt.sign({_id: userTwoId, access: 'auth'}, 'somesalt').toString()
        }]
    }
]

const todos = [
    {
        text: 'First test todo', 
        _id: new ObjectID(),
        completed: false,
        completedAt: null,
        _creator: userOneId
    }, 
    {
        text: 'Second test todo', 
        _id: new ObjectID(),
        completed: true,
        completedAt: 777,
        _creator: userTwoId
    }
]

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        let userOne = new User(users[0]).save();
        let userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo])
    }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};