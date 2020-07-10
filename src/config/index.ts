import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';       //dev environment by default

const envFound = dotenv.config();
if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");     //The app should crash if no .env file available
}

export default {
    port: parseInt(process.env.PORT || '', 10),
    databaseURL: process.env.DATABASE_URL || '',
    jwtSecret: process.env.JWT_SECRET || '',
    apiPrefix: '/api'
}
