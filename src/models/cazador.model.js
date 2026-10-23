import { Schema, model } from 'mongoose';

const cazadorSchema = new Schema({
    sub: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    rango: { type: String, enum: ['S', 'A', 'B', 'C'], default: 'B' },
    admin: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false });

export const Cazador = model('Cazador', cazadorSchema);

export const CAZADORES_SEMILLA = [
    { id: '1234567890', sub: '1234567890', username: 'Satinder', password: '12345', name: 'Satinder Cyborg', rango: 'S', admin: true},
    { id: '9876543210', sub: '9876543210', username: 'Kael', password: '54321', name: 'Kael Vanguard', rango: 'A', admin: false},
    { id: '5557770', sub: '5557770', username: 'Nxy', password: '99999', name: 'Shadow runner', rango: 'A', admin: true},
];