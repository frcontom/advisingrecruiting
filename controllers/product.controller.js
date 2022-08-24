const boom = require('@hapi/boom');
const slugify = require('slugify');
const Model = require('./../models/product.model');
const User = require('./../models/user.model');
const Category = require('./../models/category.model');
const Store = require('./../models/store.model');
const  model    = new Model();
const  user     = new User();
const  category = new Category();
const  store = new Store();
class Product{


    async create(req,res){

        const userd = await user.getuser(req.body.user_id);
        const catd = await category.getcategory(req.body.category_id);
        const stod = await store.getstore(req.body.store_id);
        if(userd.length === 0 || catd.length === 0 || stod.length === 0){
            res.status(400).json(boom.notFound('Data not Found').output.payload)
        }else{
            const datar = {
                ...req.body,
                user_id : userd._id,
                store_id : stod._id,
                category_id : catd._id,
            }
            // return;
            model.save(datar).then(dat => {
                res.json({
                    'message' : 'Store created successfully',
                })
            }).catch(err => {
                res.status(400).json({
                    message: err.message
                })

            });
        }

    }

    async getmeAll(req,res){
        const userd = await user.getuser(req.body.user_id);
        if(userd.length === 0){
            res.status(400).json(boom.notFound('User not Found').output.payload)
        }else {

            const data = await model.getmeAll({ user_id : userd._id});
            res.json({
                data
            })
        }
    }

    async getAll(req,res){
        const data = await model.getAll();
        res.json({
            data
        })
    }

    async getById(req,res){
        const userd = await user.getuser(req.body.user_id);
        if(userd.length === 0){
            res.status(400).json(boom.notFound('User not Found').output.payload)
        }else {
            const data = await model.getByIdUser(userd._id);
            res.json({
                data
            })
        }
    }

    async getByIdStore(req,res){
        const userd = await user.getuser(req.body.user_id);
        if(userd.length === 0){
            res.status(400).json(boom.notFound('User not Found').output.payload)
        }else {
            const data = await model.getByIdUserStore(userd._id);
            console.log(data)
            res.json({
                data
            })
        }
    }

    async update(req,res){
        const id = req.params.id;
        //validate body is empty
        if(Object.keys(req.body).length === 0){
            res.json(boom.badRequest('Body is empty').output.payload);
        }else{
            const datar = {
                name : req.body.name,
                slug :  slugify(req.body.name)
            }
            const data = await model.update(id,datar);
            if(data.matchedCount === 0){
                res.json(boom.notFound('Store not Found').output.payload);
            }else{
                res.json({
                    'message' : 'Store updated successfully'
                })
            }
        }

    }

    async delete(req,res){
        const {id} = req.body;
        const data = await model.delete(id);
        if(data.deletedCount === 0){
            res.json(boom.notFound('Store not Found').output.payload);
        }else{
            res.json({
                'message' : 'Store deleted successfully'
            })
        }

    }


}

module.exports = Product;