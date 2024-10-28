import { User } from '../models/User.model.js'

//const collection = db.collection('user')

// Controller for user API
// We use mongoose to interact with the database

// Fetch all users
export const getUsers = async (req, res) => {
    try {
        //const users = await collection.find().toArray()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Create a new user
export const createNew = async (req, res) => {
    const newBody = req.body
    const newUser = new User(newBody)

    try {
        await newUser.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

