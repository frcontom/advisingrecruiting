const boom = require('@hapi/boom');
const slugify = require('slugify')
const Model = require('../schema/store.schema');

class StoreModel {

    async getstore(id = ''){
        const userd = await this.getById(id);
        if(userd.length === 0){
            return [];
        }else{
            return userd[0];
        }
    }

    async save(obj = {}) {
        const  { name,user_id  } = obj;
        const store = new Model({ name,user_id });
        await store.save();
        return boom.isBoom('Insert store',200);
    }

    async getAll() {
        return await Model.find();
    }

    async getById(id) {
        return await Model.find({id : id});
    }

    async getByIdUser(id) {
        return await Model.find({user_id : id});
    }


    async update(id,obj = {}) {
        return await Model.updateOne({id : id},{$set : Object.assign(obj)});
    }


    async delete(id) {
        return await Model.deleteOne({id : id});
    }
}
module.exports = StoreModel;