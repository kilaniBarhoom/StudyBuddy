// Check if user is authorised to do an action or not

import { NOT_AUTHENTICATED, NOT_AUTHORIZED, NOT_FOUND } from "../constants/status.constants.js"
import User from "../models/user.js"
import ResponseError from "../utils/responseError.js"
import jwt from 'jsonwebtoken'

//use asynchandler


export const hasRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ResponseError(
                "You have no access to this resource",
                NOT_AUTHORIZED
            ))
        }
        next()
    }
}


export const auth = async (req, res, next) => {
    let accessToken = null;
    if (req.headers.authorization) {
        accessToken = req.headers.authorization.split(" ")[1];
    }
    if (!accessToken) {
        console.log("no access");
        return res.status(NOT_AUTHENTICATED).send({ message: "Not authorized" });
    }
    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return res.status(NOT_FOUND).send({ message: "User account was deleted" });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(NOT_AUTHENTICATED).send({ message: "Not authorized" });
    }
};

