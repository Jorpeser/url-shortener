import { MONGO_URI } from './config.js'
import mongoose from 'mongoose'

export const startDB = async () => {
    // Mongoose connection
    await mongoose
        .connect(MONGO_URI)
        .then(async () => {
            console.log('\n\x1b[38;5;46mDatabase connection successful\x1b[0m' +' (' + MONGO_URI + ')' )})
        .catch((err) => {
            console.error(err)
        })
}
