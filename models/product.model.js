const boom = require('@hapi/boom');
const slugify = require('slugify')
const Store = require('../schema/store.schema');
const Model = require('../schema/product.schema');

class StoreModel {

    async save(obj = {}) {
        const store = new Model(obj);
        await store.save();
        return boom.isBoom('Insert store',200);
    }

    async getAll() {
        return await Model.find();
    }

    async getmeAll(filter) {
        return await Model.find(filter);
    }

    async getById(id) {
        return await Model.find({id : id});
    }

    async getByIdUser(id) {
        return await Model.find({user_id : id});
    }


    async getByIdUserStore(id) {
        return await Store.aggregate(
            [
                {$match: {
                        user_id : id
                    }
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: '_id',
                        foreignField: 'store_id',
                        as: 'products'
                    },

                }
            ]
        );
    }


    async update(id,obj = {}) {
        return await Model.updateOne({id : id},{$set : Object.assign(obj)});
    }


    async delete(id) {
        return await Model.deleteOne({id : id});
    }
}
module.exports = StoreModel;