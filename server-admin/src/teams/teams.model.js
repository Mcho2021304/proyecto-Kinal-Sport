'use strict';

import mongoose from "mongoose";
const teamSchema = new mongoose.Schema({
    teamName: {
        type: String,   
        required: [true, 'El nombre del equipo es requerido'],
        trim: true,
        maxLength: [100, 'El nombre del equipo no puede tener mas de 100 caracteres'],
    },
    coachName: {
        type: String,
        required: [true, 'El nombre del entrenador es requerido'],
        trim: true,
        maxLength: [100, 'El nombre del entrenador no puede tener mas de 100 caracteres'],
    },
    players: [{
        type: String,
        trim: true,
        maxLength: [100, 'El nombre del jugador no puede tener mas de 100 caracteres'],
    }],
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
const Team = mongoose.model('Team', teamSchema);
export { Team }