import Joi from '@hapi/joi';

const userValidationSchema = Joi.object().keys({
    name: Joi.string().required().max(255).min(1),
    username: Joi.string().required().min(5).max(255),
    mobileNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    password: Joi.string().required()
});

const userSchemaOptions = {
    abortEarly: false, // Include all the errors
    allowUnknown: true, // Ignore unknown props
    stripUnknown: true // Ignore unknows
}

export const validateUser = (user) => {
    try {
        return userValidationSchema.validate(user, userSchemaOptions);
    } catch(err) {
        
    }
}