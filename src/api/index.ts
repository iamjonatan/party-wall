import { Router } from 'express';
import auth from './routes/authentication-api';
import item from './routes/item-api';

export default () => {
    const app = Router();
    auth(app);
    item(app);
    return app
}
