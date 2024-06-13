import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { results } from '../data/agentes.js';
// Obtener el nombre del archivo y el directorio
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construir la ruta del archivo JSON
const pathFile = path.join(__dirname, '..', 'data', 'agentes.js');

const findOneByEmail = async (email) => {
    try {
        const user = results.find(user => user.email === email);
        if (!user) {
            return null; // No arrojar error, manejar en el controlador
        }
        return user;
    } catch (e) {
        console.log(e);
        throw new Error('Error al buscar el usuario');
    }
};

// Comparar la contraseña del usuario encontrado
const comparePassword = async (inputPassword, userPassword) => {
    try {
        // Aquí simplemente comparo las contraseñas directamente
        return inputPassword === userPassword;
    } catch (e) {
        console.log(e);
        throw new Error('Error al verificar contraseña');
    }
};
const getAll = async () => {
    try {
        const stringusers = await readFile(pathFile, 'utf8');
        const users = JSON.parse(stringusers);
        return users;
    } catch (e) {
        console.log(e);
        throw new Error('Error al leer el archivo JSON');
    }
}

const agregar = async (user) => {
    try {
        let users = [];

        // Intentar leer el archivo JSON
        try {
            const stringusers = await readFile(pathFile, 'utf8');
            // Si el archivo no está vacío, parsear su contenido
            if (stringusers.trim().length > 0) {
                users = JSON.parse(stringusers);
            }
        } catch (readError) {
            // Si ocurre un error al leer (p.ej. el archivo no existe), se inicializa como un arreglo vacío
            console.log('Error al leer el archivo JSON o archivo no existe, inicializando como un arreglo vacío');
        }

        // Agregar el nuevo user
        users.push(user);

        // Escribir los datos actualizados en el archivo JSON
        await writeFile(pathFile, JSON.stringify(users, null, 2));
        return { message: 'Usuario agregado exitosamente', user };
    } catch (e) {
        console.log(e);
        throw new Error('Error al agregar el usuario');
    }
};

export const usersModel = {
    getAll,
    agregar,
    findOneByEmail,
    comparePassword
};