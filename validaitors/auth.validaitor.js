const poi = require('joi');

const username = poi.string().min(3).max(50);
const password = poi.string().min(3).max(50);

const authUser = poi.object().keys({
    username: username.required(),
    password: password.required()
});


module.exports = {
    authUser
};