const boom = require('@hapi/boom');

function logErrors (err, req, res, next) {
    console.error(err);
    next(err);
}

function errorHandler(err, req, res, next) {
    console.log('errorHandler');
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        next(boom.badRequest(err));
    }
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
}

function boomErrorHandler(err, req, res, next) {
    console.log(err);
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    }
    next(err);
}

function errorJson(err, req, res, next) {
    // console.log('errorJson');
    // if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    //     return res.status(400).send({ status: 404, message: err.message }); // Bad request
    //     // return  res.status(404).send({ status: 500, message: err.message});
    //     // res.status(409).json({
    //     //     statusCode: 409,
    //     //     message: err.name,
    //     //     errors: err.errors
    //     // });
    //     // return  next(boom.badRequest(err));
    // }
    // next();
    // next(err);
}



module.exports = {
    logErrors,
    errorHandler,
    boomErrorHandler,
    errorJson
}