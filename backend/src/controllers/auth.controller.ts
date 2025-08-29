// Login, register, logout
import { Request, Response } from 'express';
import User from '../models/user.model';

// Login
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
}

// Register
export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = new User({ email, password });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
};

// Logout
export const logout = async (req: Request, res: Response) => {
    try {
        res.status(200).json({ message: 'Logout exitoso' });
    } catch (error) {
        res.status(500).json({ message: 'Error al cerrar sesión' });
    }
};