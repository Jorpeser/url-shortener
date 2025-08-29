 import express, { Request, Response } from 'express';
 import cors from 'cors';
 import { connectDB } from './database';
 import linksRoutes from './routes/links.route';
 import usersRoutes from './routes/users.route';
 import authRoutes from './routes/auth.route';


 // Cargamos las variables de entorno desde el archivo .env
 process.loadEnvFile();
 
 // Creamos la aplicación Express
 const app = express();

 // Conectamos a la base de datos 
 connectDB();
 
 // Middlewares
 // Permitimos CORS para que el frontend pueda hacer peticiones a la API
 app.use(cors());
 
 // Permitimos el uso de JSON y URL-encoded en las peticiones
 app.use(express.json({}));
 app.use(express.urlencoded({ extended: true }));
 
 // Healthcheck
 app.get('/health', (_req: Request, res: Response) => {
 	res.status(200).json({ status: 'ok' });
 });

 // Rutas
 app.use('/link', linksRoutes);
 app.use('/user', usersRoutes);
 app.use('/auth', authRoutes);
 
 const port = process.env.PORT ? Number(process.env.PORT) : 8080;
 
 app.listen(port, () => {
 	// eslint-disable-next-line no-console
 	console.log('\n\x1b[34m%s\x1b[0m', `Servidor escuchando en http://localhost:${port}`);
 });
 
 export default app;
 

