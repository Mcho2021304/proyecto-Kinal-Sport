// importamos las des dependencias necesarias

import mongoose from 'mongoose';
const { Cursor } = 'mongoose';
import Field from './field.model.js';

// Controlador para crear un nuevo campo
export const getFields = async (req, res) => {
    try { 

        const { page = 1, limit = 10, isActive } = req.query;
        
        const filter = { isActive };

        // opciones de paginacion
        // Como se realiza el filtro depende de si viene el isActive
        const options = {
            // convertimos a numero
            page: parseInt(page),
            //convertimos a numero
            limit: parseInt(limit),
            // ordenar por fecha de creacion descendente
            sort: { createdAt: -1 }
        }

        // Realizar la consulta al Schema Field
        const fields = await Field.find(filter)
             .limit(limit)
             .skip((page - 1) * limit)
             .sort(options.sort);

        // conteo de documentos de la consulta
        const total = await Field.countDocuments(filter);

        // Respuesta
        res.status(200).json({
            success: true,
            data: fields,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
                limit: limit,
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los campos',
            error: error.message,
        });
    }
}

