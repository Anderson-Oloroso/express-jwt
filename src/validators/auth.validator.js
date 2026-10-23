import { body, validationResult } from 'express-validator';

const respondeErrores = (req, res, next) => {
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({
            errores: errores.array()
        });
    }

    next();
}

export const validarLogin = [
    body('username').trim().isLength({ min: 3, max: 30 }).withMessage('El username debe tener en tre 3 y 30 caracteres'),
    body('password').isLength({ min: 4, max: 60 }).withMessage('La contraseña debe tener al menos 4 caracteres'),
    respondeErrores,
];

export const validarRecompensa = [
    body('mision').trim().isLength({ min: 3, max: 80 }).withMessage('El nombre de la mision debe tener entre 3 y 80 caracteres'),
    body('cristales').isInt({ min: 1, max: 100000 }).withMessage('Los cristales deben ser un entrero positivo entre 1y 100000'),
    respondeErrores
];