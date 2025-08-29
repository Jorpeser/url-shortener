import { Request, Response } from 'express';
import TempLink from '../models/tempLinks';

// Crear un link temporal
export const createTempLink = async (req: Request, res: Response) => {
    try {
        const { originalUrl, owner, shortUrl, createdAt, visits, lastAccessed } = req.body;
        const tempLink = new TempLink({ originalUrl, owner, shortUrl, createdAt, visits, lastAccessed });
        await tempLink.save();
        res.status(201).json(tempLink);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el link temporal' });
    }
};

// Obtener un link temporal por su ID
export const getTempLinkById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tempLink = await TempLink.findById(id);
        res.status(200).json(tempLink);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el link temporal' });
    }
};

// Obtener todos los links temporales
