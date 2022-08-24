const mongoose = require('mongoose');
const slugify = require("slugify");
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    user_id : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    slug : {
        type : String
    },
    id: {
        type: Number,
        default: 0,
    }
});

StoreSchema.pre('save', function(next) {
    const store = this;

    mongoose.model(
        "Store", StoreSchema
    ).countDocuments({}, function(err, count) {
        console.log(count)
        if(err) return next(err);
        store.id = count +1;

        //add slug
        store.slug = slugify(store.name.toString().toLowerCase());
        next();
    })
});

module.exports = mongoose.model('Store', StoreSchema);