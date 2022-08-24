const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const boom = require("@hapi/boom");

const UserSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    id: {
        type: Number,
        default: 0,
    }
}, { strict: false });

UserSchema.pre('save', function(next) {
    const user = this;


    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) {
            return next(boom.badRequest(err));
        }
        user.password = hash;


        mongoose.model(
            "User", UserSchema
        ).countDocuments({}, function(err, count) {
            console.log(count)
            if(err) return next(err);
            user.id = count +1;
            // next(err);
            next();
        });

    })
});

module.exports = mongoose.model('User', UserSchema);