import mongoose from 'mongoose'
import { MONGODB_URI } from '../../config'

if(!MONGODB_URI) {
    throw new Error('MongoDB_URI is not defined, check you config file')
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export const connectDB = async () => {

    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const options = {
            bufferCommands: false,
            autoIndex: false, 
        }
        cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
            console.log('\n\x1b[38;5;46mDatabase connection successful\x1b[0m')
            return mongoose
        })
    }

    try {
        cached.conn = await cached.promise
    } catch (error) {
        console.error('MongoDB connection error:', error)
        cached.promise = null
        throw error
    }

    return cached.conn
}
