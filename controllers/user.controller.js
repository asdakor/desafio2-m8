import { usersModel } from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// /api/v1/users/login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usersModel.findOneByEmail(email);

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "El email no está registrado"
            });
        }

        const passwordIsValid = await usersModel.comparePassword(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({
                ok: false,
                msg: "Contraseña incorrecta"
            });
        }

        const token = jwt.sign(
            { email: user.email },
            process.env.SECRET_JWT,
            { expiresIn: '1h' }
        );
        return res.json({token});
    } catch (error) {
        console.log(error);
        const { code, msg } = handleErrorDatabase(error); // Asegúrate de tener definida esta función
        return res.status(code).json({ ok: false, msg });
    }
}

// /api/v1/users/register
const register = async (req, res) => {
    try {
        const { email, password, username } = req.body

        const newUser = await usersModel.findOneByEmail(email)
        if (newUser) return res.status(400).json({
            ok: false,
            msg: "el email ya está registrado"
        })

        // hash de contraseña
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)

        const user = await usersModel.create({ email, password: hashPassword, username })

        const token = jwt.sign(
            { email: user.email },
            process.env.SECRET_JWT,
            { expiresIn: '1h' }
        )

        return res.json({
            token,
            email: user.email
        })
    } catch (error) {
        console.log(error)
        const { code, msg } = handleErrorDatabase(error)
        return res.status(code).json({ ok: false, msg })
    }
}

export const UserController = {
    login,
    register
}