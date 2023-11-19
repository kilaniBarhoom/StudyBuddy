import bcrypt from 'bcryptjs'
import { Schema, model } from 'mongoose'
import validator from 'validator'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "User must have a username"],
        unique: true,
        minlength: [2, 'Username cannot be less than 2 characters'],
        maxlength: [15, 'Username cannot exceed 15 characters']
    },
    email: {
        type: String,
        required: [true, 'User must have an email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [8, 'Password must be atleast 8 characters'],
        select: false
    },
    role: {
        type: String,
        default: 'user'
    },
}, { timestamps: true })

// Encrypting password om pre

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, parseInt(process.env.SALT_ROUND))
})

userSchema.methods.genJwtoken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE
    })
}

//compare user password

userSchema.methods.comparePasswords = async function (password) {
    return await bcrypt.compare(password, this.password)
}


const User = model('User', userSchema)

export default User