const poi = require('joi');

const id  = poi.number().min(1);
const name = poi.string().min(3).max(50);
const price = poi.string().min(1);
const store_id = poi.string().min(1);
const category_id = poi.string().min(1);
const user_id = poi.string().min(1);

const createProduct = poi.object().keys({
    name: name.required(),
    price: price.required(),
    category_id: category_id.required(),
    store_id: store_id.required(),
    user_id: user_id.required()
});

const UpdateProduct = poi.object().keys({
    name: name,
    price: price
});

const getUserId = poi.object().keys({
    user_id: user_id.required()
});

const getId = poi.object().keys({
    id: id.required()
});

module.exports = {
    createProduct,
    UpdateProduct,
    getUserId,
    getId
};