import jwt from 'jsonwebtoken';

export const verifyTokenJWT = (req, res, next) => {
    try {
        console.log(req.headers.authorization)
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                ok: false,
                msg: "No autorizado - No se encuentra el token"
            });
        }

        const token = authHeader.split(" ")[1];
        const payload = jwt.verify(token, process.env.SECRET_JWT);

        req.email = payload.email;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: "No autorizado"
        });
    }
};