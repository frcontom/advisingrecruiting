const mongo = require('mongoose');

mongo.connect('mongodb+srv://feconto:Admin123@cr3ativos.fqpjikp.mongodb.net/cr3ativos?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then(() => console.log('connectado mongo'))
    .catch((err) => console.log(err));
mongo.Promise = global.Promise;

module.exports = mongo;