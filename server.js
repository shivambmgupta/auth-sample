import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRouter from './routes/routes.js';
import bodyParser from 'body-parser';
import * as Consts from './utils/Const.js';

dotenv.config(); 

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.status(200).send({ greet: Consts.WELCOME_GREET });
})

app.use('/user', UserRouter);

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(process.env.MAIN_PORT, () => {
            console.log(Consts.SERVER_UP)
        })
    }).catch((err) => {
        console.log("ERR_LOG: Couldn't connect with database make sure server is connected to the internet")
    });
