const Model = require('./../models/category.model');
const  model = new Model();
class Category{

    constructor() {
    }

    create(req,res){
        const {name} = req.body;
        const data =  model.save(name);
        console.log(data)
        res.json({
            data
        })

    }

    async getAll(req,res){
        const data = await model.getAll();
        res.json({
            data
        })

    }

}

module.exports = Category;