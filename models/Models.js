import mongoose from 'mongoose';
import Joi from '@hapi/joi';

const userSchema = mongoose.Schema({
    name: Joi.string().required().max(255).min(1),
    username: Joi.string().required().min(5).max(255),
    mobileNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    password: Joi.string().required().max(255)
});

const User = mongoose.model('User', userSchema);
export default User;