import mongoose from 'mongoose';

const tempLinkSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
    },
    lastVisited: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        default: function(this: any) {
            return this.lastVisited ? new Date(this.lastVisited.getTime() + 24*60*60*1000) : new Date(Date.now() + 24*60*60*1000);
        },
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

const TempLink = mongoose.model('TempLink', tempLinkSchema);

export default TempLink;