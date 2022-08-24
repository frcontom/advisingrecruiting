const boom = require('@hapi/boom');
const slugify = require('slugify')
const Model = require('../schema/category.schema');

class Category {

    async getcategory(id = ''){
        const userd = await this.getById(id);
        if(userd.length === 0){
             return [];
        }else{
            return userd[0];
        }
    }

    async save(name) {
        const category = new Model({ name : name });
        await category.save();
        return boom.isBoom('Insert Category',200);
    }

     async getAll() {
        return await Model.find();
    }



     async getById(id) {
        return await Model.find({
            id : id
        });
    }


     async update(id, name) {
        return await Model.findByIdAndUpdate(id, {
            name: name,
            slug: slugify(name)
        });
    }


    static async delete(id) {
        return await Model.findByIdAndDelete(id);
    }
}
module.exports = Category;