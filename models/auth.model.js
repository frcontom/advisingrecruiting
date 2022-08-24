const boom = require('@hapi/boom');
const slugify = require('slugify')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../schema/user.schema');

class Model {

    async auth(obj = {}) {
        const userv = await User.findOne({username : obj.username});
        if(!userv){
            return boom.notFound('User not Found',200).output.payload;
        }else{
            //validate password
            console.log(userv)
            if(bcrypt.compareSync(obj.password,userv.password)){
                const token = jwt.sign({
                    id : userv._id,
                    username : userv.username
                },'secret',{
                    expiresIn : '1h'
                });
                console.log(token)
                return {
                    token
                }
            }
        }
    }
}

module.exports = Model;