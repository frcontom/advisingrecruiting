const poi = require('joi');

const id  = poi.number().min(1);
const name = poi.string().min(3).max(50);
const username = poi.string().min(3).max(50);
const password = poi.string().min(3).max(50);

const createUser = poi.object().keys({
    name: name.required(),
    username: username.required(),
    password: password.required()
});

const UpdateUser = poi.object().keys({
    name: name,
    username: username,
    password: password
});


const getId = poi.object().keys({
    id: id.required()
});

module.exports = {
    createUser,
    UpdateUser,
    getId
};