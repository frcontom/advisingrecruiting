const mongoose = require('mongoose');
const slugify = require("slugify");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : String
    },
    store_id : {
        type : Schema.Types.ObjectId,
        ref : 'Store'
    },
    category_id : {
        type : Schema.Types.ObjectId,
        ref : 'Category'
    },
    user_id : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    slug : {
        type : String
    },
    id: {
        type: Number,
        default: 0,
    }
});

ProductSchema.pre('save', function(next) {
    const product = this;

    mongoose.model(
        "Product", ProductSchema
    ).countDocuments({}, function(err, count) {
        if(err) return next(err);
        product.id = count +1;

        //add slug
        product.slug = slugify(product.name.toString().toLowerCase());
        next();
    })
});

module.exports = mongoose.model('Product', ProductSchema);