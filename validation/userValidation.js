const Joi = require('joi');

const schema= Joi.object({
    userName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    password: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    phone: Joi.string().length(11),
    address: Joi.string().alphanum(),
    gender:Joi.string()
})

const userValidation = (req,res,next)=>{
    try {
        schema.validateAsync(req.body);
        next();
    }
    catch(error){
        error.statusCode =422;
        next(error);

    }
}
module.exports= userValidation;