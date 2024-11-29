import { User } from '../models/User.model'
import { UserUrl } from '../models/UserUrl.model'

//const collection = db.collection('UserUrl')

// Controlador de la API de la entidad UserUrl
// Se usa mongoose para interactuar con la base de datos
// CRUD

// Obtiene todas las UserUrls
export const getUserUrls = async (req , res) => {
    try {
        const userUrls = User.find()
        res.status(200).json(miniUrls)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Crea una nueva miniUrl
export const createNew = async (req, res) => {
    const newBody = req.body
    const newMiniUrl = new MiniUrl(newBody)

    try {
        await collection.insertOne(newMiniUrl)
        res.status(201).json(newMiniUrl)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Obtiene una miniUrl por su id
export const getMiniUrl = async (req, res) => {
    const id = req.params.id

    try {
        const miniUrl = await collection
            .findOne({ _id: id })
        res.status(200).json(miniUrl)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Actualiza una miniUrl por su id
export const updateMiniUrl = async (req, res) => {
    const id = req.params.id
    const newBody = req.body

    try {
        //await collection.updateOne({ _id: id }, { $set: newBody })
        res.status(200).json({ message: 'MiniUrl updated' })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Elimina una miniUrl por su id
export const deleteMiniUrl = async (req, res) => {
    const id = req.params.id

    try {
        //await collection.deleteOne({ _id: id })
        res.status(200).json({ message: 'MiniUrl deleted' })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

