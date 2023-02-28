const Joi = require('joi');

const schema= Joi.object({
    categoryName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
})

const categoryValidation = (req,res,next)=>{
    try {
        schema.validateAsync(req.body);
        next();
    }
    catch(error){
        error.statusCode =422;
        next(error);

    }
}
module.exports= categoryValidation;