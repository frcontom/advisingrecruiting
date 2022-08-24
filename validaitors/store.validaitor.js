const poi = require('joi');

const id  = poi.number().min(1);
const name = poi.string().min(3).max(50);
const user_id = poi.string().min(1);

const createStore = poi.object().keys({
    name: name.required(),
    user_id: user_id.required()
});

const UpdateStore = poi.object().keys({
    name: name
});

const getUserId = poi.object().keys({
    user_id: user_id.required()
});

const getId = poi.object().keys({
    id: id.required()
});

module.exports = {
    createStore,
    UpdateStore,
    getUserId,
    getId
};