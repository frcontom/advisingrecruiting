const poi = require('joi');

const name = poi.string().required().min(3).max(50);
const slug = poi.string();

const createCategory = poi.object().keys({
    name: name.required(),
    slug : slug
});

module.exports = createCategory;