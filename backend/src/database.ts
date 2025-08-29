// Importamos mongoose para conectar con MongoDB
import mongoose from 'mongoose';

// Cargamos las variables de entorno desde el archivo .env
process.loadEnvFile();

// Declaración global para TypeScript
// Extendemos la interfaz global para incluir mongoose
declare global {
    var mongoose: any;
}

// Obtenemos la URI de conexión a MongoDB desde las variables de entorno
const MONGODB_URI = process.env.MONGODB_URI;

// Validación de seguridad: si no existe la URI, lanzamos un error
if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined, check .env file');
}

// Variable global para cachear la conexión
// Evita crear múltiples conexiones innecesarias
let cached = global.mongoose;

// Si no existe el cache de conexión global, lo inicializamos
// conn: conexión a la base de datos
// promise: promesa de conexión a la base de datos
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

// Función principal para conectar a la base de datos
export const connectDB = async () => {
    
    // Si ya tenemos una conexión activa, la devolvemos
    if (cached.conn) {
        return cached.conn;
    }

    // Si no hay una promesa de conexión, la creamos
    if (!cached.promise) {
        // Opciones de configuración para la conexión
        const options = {
            bufferCommands: false,  // Desactiva el buffering de comandos
            autoIndex: false,       // Desactiva la creación automática de índices
        }

        // Creamos la promesa de conexión
        cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
            console.log('\n\x1b[38;5;46mBase de datos conectada correctamente\x1b[0m')
            return mongoose
        })
    }

    try {
        // Esperamos a que se complete la conexión y la devolvemos
        cached.conn = await cached.promise
        return cached.conn
    } catch (error) {
        // Si hay algún error, limpiamos la promesa y lanzamos el error
        console.error('\n\x1b[38;5;196mError al conectar con la base de datos:\x1b[0m', error)
        cached.promise = null
        throw error
    }
}

// Función para cerrar la conexión
export const disconnectDB = async (): Promise<void> => {
    try {
        if (cached.conn) {
            await cached.conn.disconnect();
            cached.conn = null;
            cached.promise = null;
            console.log('\n\x1b[38;5;46mBase de datos desconectada correctamente\x1b[0m');
        }
    } catch (error) {
        console.error('\n\x1b[38;5;196mError al desconectar la base de datos:\x1b[0m', error);
        throw error;
    }
}