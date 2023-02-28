const Joi = require('joi');

const schema= Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    price: Joi.number().required(),
    sale: Joi.number(),
    quantity: Joi.number().required(),
    description: Joi.string(),
    category:Joi.string().required(),
    imgURL: Joi.required()
})


const productValidation = (req,res,next)=>{
    try {
        console.log(req.body);
      schema.validateAsync(req.body);
        next();
    }
    catch(error){
        error.statusCode =422;
        next(error);

    }
}

module.exports= productValidation;
