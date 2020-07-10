import expressLoader from './express';
import mongooseLoader from './mongoose';
import dependencyInjectorLoader from './dependency-injector';

export default async ({ expressApp }:any) => {

    await mongooseLoader();
    console.log('Database loaded and connected!');

    await expressLoader({ app:expressApp});
    console.log('All loaders loaded!');


    //inject all database models
    await dependencyInjectorLoader( require('./dao-loader').default());
};
