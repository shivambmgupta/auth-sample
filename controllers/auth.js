import jwt from 'jsonwebtoken';
import * as Consts from '../utils/Const.js'

export const autheticateUser = (req, res, next) => {
    try {
        const header = req.headers['authorization']
        const token = header && header.split(' ')[1] // Token Sample: Brearer <token>
        if(!token) return res.sendStatus(401)
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, username) => {
            if(err) return res.status(403).send(Consts.FORBIDDEN);
            req.username = username;
            next()
        })
    } catch (error) {
        res.status(500).send(Consts.INTERNAL_SERVER_ERROR);
    }
}