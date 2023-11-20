import express, { urlencoded, json } from 'express'
import { OK } from './constants/status.constants.js'
import APIRoutes from "./api.js";
import bodyParser from 'body-parser'
import cors from 'cors'
import handleErrors from './utils/errors.js'




const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cookie parser

// Cross origin configuration 
app.use(cors())

app.use(json())
app.use(urlencoded({
    extended: true
}))

app.use("/health", (req, res) => {
    return res.sendStatus(OK);
});

app.use("/api", APIRoutes);

app.use(handleErrors)

export default app