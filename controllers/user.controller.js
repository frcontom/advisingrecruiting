const boom = require('@hapi/boom');
const Model = require('./../models/user.model');
const  model = new Model();
class User{

    create(req,res){
       model.save(req.body).then(dat => {
            res.json({
                'message' : 'User created successfully',
            })
        }).catch(err => {
           res.status(400).json({
                message: err.message
           })

        });
    }

    async getAll(req,res){
        const data = await model.getAll();
        res.json({
            data
        })
    }

    async getById(req,res){
        const data = await model.getById(req.params.id);
        res.json({
            data
        })
    }

    async update(req,res){
        const id = req.params.id;
        //validate body is empty
        if(Object.keys(req.body).length === 0){
            res.json(boom.badRequest('Body is empty').output.payload);
        }else{
            const data = await model.update(id,req.body);
            if(data.matchedCount === 0){
                res.json(boom.notFound('User not Found').output.payload);
            }else{
                res.json({
                    'message' : 'User updated successfully'
                })
            }

        }

    }

    async delete(req,res){
        const {id} = req.body;
        const data = await model.delete(id);
        if(data.deletedCount === 0){
            res.json(boom.notFound('User not Found').output.payload);
        }else{
            res.json({
                'message' : 'User deleted successfully'
            })
        }

    }


}

module.exports = User;