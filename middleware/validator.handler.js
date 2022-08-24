const boom = require('@hapi/boom');

function validatorHaldler(Schema,property){
    return function(req,res,next){
        const data = req[property];
        const {error} = Schema.validate(data, {abortEarly: false});
        if(error){
            next(boom.badRequest(error));
        }else{
            next();
        }
    }
}

module.exports = validatorHaldler;