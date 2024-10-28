
// Mongoose schema for user
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: [5, "Username is too short"],
        maxLength: [20, "Username is too long"],
        trim: true,
        match: [/^[a-zA-Z0-9]+$/, 'Username can only contain letters and numbers']
    },
    email: {
        type: String,
        required: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email'],
    },
    password: {
        type: String,
        required: true
    },
    tier: {
        type: String,
        required: true,
        default: 'free'
    },
    urls: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'UserUrl',
        default: []
    }
}, 
{ collection: 'user' })

export const User = mongoose.model(
    'User', 
    UserSchema
)