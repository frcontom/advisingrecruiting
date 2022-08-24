const boom = require('@hapi/boom');
const slugify = require('slugify')
const Model = require('../schema/user.schema');
const bcrypt = require('bcrypt');
class UserModel {

     async getuser(id = ''){
        const userd = await this.getById(id)
        if(userd.length === 0){
            return [];
        }else{
            return userd[0];
        }
    }

    async save(obj = {}) {
        const  { name,username,password  } = obj;
        const category = new Model({ name,username,password  });
        await category.save();
        return boom.isBoom('Insert Category',200);
    }

    async getAll() {
        return await Model.find().select('name username id');
    }

    async getById(id) {
        return await Model.find({id : id}).select('name username id');
    }


    async update(id,obj = {}) {
        console.log(obj.password)
         if(obj.password != undefined){
             obj.password = bcrypt.hashSync(obj.password, 10);
         }
       return await Model.updateOne({id : id},{$set : Object.assign(obj)});
    }


     async delete(id) {
        return await Model.deleteOne({id : id});
    }
}
module.exports = UserModel;