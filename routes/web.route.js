import { Router } from "express";
import { webController } from "../controllers/web.controller.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { verifyTokenJWT } from "../middlewares/jwt.middleware.js";

// Obtener el nombre del archivo y el directorio
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathFile = path.join(__dirname, '..', 'public');
const router = Router()

router.get('/', webController.inicio)

export default router;