const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify')

const CategorySchema = new Schema({
    name : {
        type : String,
        required : true,
        unique : false
    },
    slug : {
        type : String
    },
    id: {
        type: Number,
        default: 1,
    },
});

CategorySchema.pre('save', function(next) {
    const category = this;

    mongoose.model(
        "Category", CategorySchema
    ).countDocuments({}, function(err, count) {
        console.log(count)
        if(err) return next(err);
        category.id = count +1;

        //add slug
        category.slug = slugify(category.name.toString().toLowerCase());
        next();
    })
});


module.exports = mongoose.model('Category', CategorySchema);