import express from 'express'
import { startDB } from './db.js'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import { PORT } from './config.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

/**
 * The main function that starts the server.
 * @returns {Promise<void>} A promise that resolves when the server is started.
 */
const main = async () => {

    const app = express()

    app.use(express.json())
    app.use(cookieParser())

    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }))

    // Starts the database connection
    await startDB()

    app.get('/', (req, res) => {
        res.send('Hello miniURL!')
    })

    app.use(userRoutes)
    app.use(authRoutes)

    app.listen(PORT, () => {
        console.log('\x1b[33mServer up and listening on port ' + PORT + '\x1b[0m')
    })
}

main().catch((err) => {
    console.error(err)
})
