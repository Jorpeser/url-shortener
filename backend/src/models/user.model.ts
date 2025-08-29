import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    tier: {
        type: String,
        enum: ['free', 'pro'],
        default: 'free',
    },
    links: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Link',
    },
    tempLinks: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'TempLink',
    },
    createdAt: {
        type: Date,
    },
});

const User = mongoose.model('User', userSchema);

export default User;