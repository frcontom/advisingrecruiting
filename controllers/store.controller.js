const boom = require('@hapi/boom');
const Model = require('./../models/store.model');
const User = require('./../models/user.model');
const slugify = require('slugify')
const  model = new Model();
const  user = new User();
class Store{


    async create(req,res){

        const userd = await user.getuser(req.body.user_id);
        if(userd.length === 0){
            res.status(400).json(boom.notFound('User not Found').output.payload)
        }else{

            const datar = {
                name : req.body.name,
                user_id : userd._id
            }
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

module.exports = Store;