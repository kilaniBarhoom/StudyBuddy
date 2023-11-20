import { Schema, model } from 'mongoose'

const materialSchema = new Schema({
    name: {
        type: String,
        required: [true, "Material name is required"]
    },
    type: {
        type: String,
        required: [true, "Material type should be provided"],
        enum: ['quiz', 'midterm', 'final', 'summary', 'book', 'lecture']
    },
    subject: {
        type: String,
        required: [true, 'Subject should be provided']
    },
    link: {
        type: String,
        required: [true, 'Material link should be provided']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ratings: [{
        rating: {
            type: Number,
            required: [true, "Rating number is required"]
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }],
    anonymous: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
})

const Material = model('Material', materialSchema)
export default Material