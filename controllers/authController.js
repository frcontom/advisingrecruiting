const boom = require('@hapi/boom');
const slugify = require('slugify');
const jwt = require('jsonwebtoken');
const Model = require('./../models/auth.model');
const  user = new Model();
class Product{


    async auth(req,res){
       const resp =await user.auth( req.body) ;
        console.log(resp)
       res.json(resp);

    }


}

module.exports = Product;