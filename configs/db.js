'use strict';

import mongoose from 'mongoose';

export const dbConnection = async () => {
    try {  

        // --------------------------------------------------
        //                 MONITOREO DE LA DB
        // --------------------------------------------------
        mongoose.connection.on('error', () => {
        console.log('MongoDB | no se pudo conectar a mongoDB');
        mongoose.disconnect();
        });

        mongoose.connection.on('connecting', () => {
            console.log('MongoDB | intentando conectar a mongoDB');
        });

        mongoose.connection.on('connected', () => {
            console.log('MongoDB | conectado a mongoDB');
        });

        mongoose.connection.on('open', () => {
            console.log('MongoDB | conectado a la base de datos kinalSports');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB | reconectado a mongoDB');
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB | desconectado de mongoDB');
        });

        // ------------------------------------------------
        //         CONEXIÓN A LA BASE DE DATOS
        // ------------------------------------------------
        //Menciona que URI_MONGODB es una variable de entorno
        await mongoose.connect(process.env.URL_MONGODB, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10,
        });

    } catch (error) {
        console.error('Error al conectar a la db: ${error}');
        process.exit(1); 
    }
};


// ------------------------------------------------
//         CIERRE DE LA CONEXIÓN
// ------------------------------------------------
const gracefulShutdown = async (signal) => {
    console.log(`MongoDB | Received ${signal}. Closing MongoDB connection...`);
    try {
        await mongoose.connection.close();
        console.log('MongoDB | Database connection closed sucessfully');
        process.exit(0); //salida exitosa
    } catch (error) {
        console.error('MongoDB | Error during gracious shutdown: ', error.message)
        process.exit(1); //salida con error
    }
};

//Manejadores de señales de proceso "" Process signal handlers
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGUSR2', () => gracefulShutdown('SIGUSR2'));


