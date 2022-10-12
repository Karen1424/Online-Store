/// Standard requires
const Joi = require('joi');

const registerSchema = Joi.object({

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    
    role: Joi.string()
});

const loginSchema = Joi.object({

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')), 
});

const deviceSchema = Joi.object({

    name: Joi.string().required(),
    price: Joi.number().required(),
    brandId: Joi.number(),
    typeId: Joi.number(),
    info: Joi.string(),
    img: Joi.string()
})

class Validation {

    async registerValidation(params) {

        try {
            const value = await registerSchema.validateAsync(params);
            return value;
        }
        catch (err) { 
            throw new Error(err.message);
        }
    };
    
    async loginValidation(params) {
    
        try {
            const value = await loginSchema.validateAsync(params);
            return value;
        }
        catch (err) { 
            throw new Error(err.message);
        }
    };

    async deviceValidation(params) {
        try {
            const value = await deviceSchema.validateAsync(params);
            return value;
        }
        catch (err) { 
            throw new Error(err.message);
        }
    }
}

module.exports = new Validation();