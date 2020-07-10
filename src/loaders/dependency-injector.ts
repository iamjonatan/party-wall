import { Container } from 'typedi';

export default (models: { name: string; model: any }[] ) => {
    try {
        models.forEach(m => {
            Container.set(m.name, m.model);
        });
        console.log("Finished Injecting models.");
    } catch (e) {
        console.error("Error in dependecy injecting models. \n", e);
    }

};
