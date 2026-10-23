export class CredencialesDTO{
    constructor(data = {}){
        this.username = String(data.username ?? '').trim().toLocaleLowerCase();
        this.password = String(data.password ?? '').trim()
        // Descar ca cualquier intento de inyección con admin: true o role: 'root'
    }
}

export class PerfilCazadorDTO{
    constructor(cazador = {}){
        this.id = String(cazador.id ?? cazador._id ?? '');
        this.username = cazador.username;
        this.name = cazador.name;
        this.rango = cazador.rango ?? 'B';
        this.admin = Boolean(cazador.admin ?? false);
        // Nunca expone el campo password en las respuestas json
    }
}

export class CrearRecompensaDTO{
    constructor(data = {}){
        this.mision = String(data.mision ?? '').trim();
        this.cristales = Number(data.cristales ?? 0);
    }
}