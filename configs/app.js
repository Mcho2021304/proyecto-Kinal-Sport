'use strict';

// Importaciones
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { corsOptions } from './cors-configuration.js';

// Rutas
import fieldRoutes from '../src/fields/field.routes.js';

const BASE_URL = '/kinalSportAdmin/v1';

// Configuraciones de los middlewares
const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false, limit: '10mb'}));
    app.use(express.json({limit: '10'}));
    app.use(cors(corsOptions));
    app.use(morgan('dev'));

}

// Integracion de las rutas
const routes = (app) => {
    app.use(`${BASE_URL}/fields`, fieldRoutes);
}

// Función para iniciar el servidor
const initServer = async (app) => {
    // Creación de la instancia de la Aplicación
    app = express();
    const PORT = process.env.PORT || 3001;
    try{
        //Configuración de los middlewares (Mi Aplicación)
        middlewares(app);
        routes(app);

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
            console.log(`Base URL: http://localhost:${PORT}${BASE_URL}`);
    });

    // Primera ruta
    app.get(`${BASE_URL}/health`, (req, res) => {
        res.status(200).json(
            {
                status: 'ok',
                service: 'KinalSport Admin',
                version: '1.0.0'
            }
        );
    });
    } catch(error){
        console.error('Error al iniciar el servidor: ', error)
    }
}

export { initServer };