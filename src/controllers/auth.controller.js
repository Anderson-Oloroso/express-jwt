import { PerfilCazadorDTO, CrearRecompensaDTO } from "../dtos/cazador.dto.js";
import { cazadorService } from "../services/cazador.service.js";

export async function autenticarUsuario(req, res, next){
    try{
        const token = await cazadorService.firmarToken(req.user);
        const perfil = new PerfilCazadorDTO(req.user);
        res.status(200).json({
            token,
            tipo: 'Bearer',
            expiraEn: '2h',
            cazador: perfil
        });
    }catch(err){
        next(err);
    }
}

export async function listarUsuarios(req, res, next){
    try{
        const cazadores = await cazadorService.listarUsuarios();
        res.status(200).json({
            identidadToken: {
                sub: req.user.claims?.sub,
                username: req.user.username,
                name: req.user.name,
                admin: req.user.admin
            },
            data: cazadores,
        });
    }catch(err){
        next(err);
    }
}

export async function registrarRecompensaBoveda(req, res, next){
    try{
        const dto = new CrearRecompensaDTO(req.body);
        const recompensa = await cazadorService.crearRecompensa(dto, req.user.username);
        res.status(201).json({ data: recompensa });
    }catch(err){
        next(err);
    }
}