import { Request, Response } from 'express';
import Link from '../models/links.model';

// CRUD para los links

// Crear un link
export const createLink = async (req: Request, res: Response) => {
    try {
        const { originalUrl, shortUrl, alias, visits, owner, lastAccessed, createdAt } = req.body;
        const link = new Link({ originalUrl, shortUrl, alias, visits, owner, lastAccessed, createdAt });
        await link.save();
        res.status(201).json(link);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el link', error: error });
    }
};

// Obtener un link por su ID
export const getLinkById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const link = await Link.findById(id);
        res.status(200).json(link);
    } catch (error) {
        res.status(404).json({ message: 'Error al obtener el link', error: error });
    }
};

// Obtener todos los links
export const getLinks = async (req: Request, res: Response) => {
    try {
        const links = await Link.find();
        res.status(200).json(links);
    } catch (error) {
        res.status(404).json({ message: 'Error al obtener los links', error: error });
    }
};

// Obtener todos los links de un usuario
export const getLinksByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const links = await Link.find({ owner: userId });
        res.status(200).json(links);
    } catch (error) {
        res.status(404).json({ message: 'Error al obtener los links', error: error });
    }
};

// Actualizar un link
export const updateLink = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { originalUrl } = req.body;
        const link = await Link.findByIdAndUpdate(id, { originalUrl }, { new: true });
        res.status(200).json(link);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el link', error: error });
    }
};

// Eliminar un link
export const deleteLink = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Link.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar el link', error: error });
    }
};
