import bcrypt from 'bcrypt';
import mongodb from 'mongodb';
import User from '../models/Models.js';
import { validateUser } from '../validators/validations.js';
import jwt from 'jsonwebtoken';
import * as Consts from "../utils/Const.js"

export const registerUser = async (req, res) => {
    try {
        const { error, value } = validateUser(req.body);
        if (error) return res.status(400).send(Consts.ERROR);
        if (value) {
            const { password } = value;
            new User({ ...value, password: await bcrypt.hash(password, 10) })
                .save((err, user) => {
                    if(err) return res.status(500).send(Consts.FAILURE);
                    return res.status(201).send(Consts.SUCCESS); 
                })
        }
    } catch (err) {
        res.status(500).send(Consts.INTERNAL_SERVER_ERROR);
    }
}

export const userLogin = async (req, res) => {
    const { username } = req.body;
    try {
        User.findOne({ username: username }, async (err, user) => {
            if (err || user == null) return res.status(400).send(Consts.ERROR);
            if (!await bcrypt.compare(req.body.password, user.password)) return res.sendStatus(403) 
            const accessToken = jwt.sign(user.username, process.env.ACCESS_TOKEN_SECRET);
            return res.status(201).json({ token: accessToken });
        });
    } catch(error) {
        res.status(500).send(Consts.INTERNAL_SERVER_ERROR)
    }
}

export const greetUser = (req, res) => {
    const username = req.username
    try {
        User.findOne({ username: username }, (err, user) => {
            if(err || !user) return res.sendStatus(401)
            return res.status(200).json({ "greet": `Hi, ${user.name}`})
        })
    } catch (error) {
        res.status(500).send(Consts.INTERNAL_SERVER_ERROR);
    }
}