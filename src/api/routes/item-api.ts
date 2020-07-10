import { Router, Request, Response, NextFunction } from 'express';
import { celebrate, Joi } from 'celebrate';
import ItemService from "../../services/item-service";
import {IItem} from "../../data/interfaces/IItem";

import isAuthorised from '../middlewares/is-authorised';
import {Container} from "typedi";
import AuthenticationService from "../../services/authentication-service";

/*
* This contains all routes associated with item
* */
const route = Router();
export default (app: Router) => {
    app.use('/item', route);

    route.post(
        '/create',
        isAuthorised,
        celebrate({
            body: Joi.object({
                name: Joi.string().required(),
                price: Joi.string().required()
            }),
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            try{
                console.log('Calling Create Item endpoint with body: %o', req.body );
                const itemServiceInstance = Container.get(ItemService);
                let { item } = await itemServiceInstance.createItem(req.body as IItem);

                const authServiceInstance = Container.get(AuthenticationService);
                await authServiceInstance.addItem('', req.body.id);

                return res.json({ item }).status(200);
            } catch (e) {
                console.error(e);
                return next(e);
            }

        }
    );

    route.post(
        '/remove',
        isAuthorised,
        celebrate({
            body: Joi.object({
                id: Joi.string().required()
            }),
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            try{
                console.log('Calling Remove Item endpoint with body: %o', req.body );
                const itemServiceInstance = Container.get(ItemService);
                let status = await itemServiceInstance.removeItem(req.body.id);

                //remove item from user
                const authServiceInstance = Container.get(AuthenticationService);
                await authServiceInstance.removeItem('', req.body.id);

                res.status(200).json({ message: 'Item deleted!'}).end();
            } catch (e) {
                console.error(e);
                return next(e);
            }
        }
    );

    route.post( '/viewall', isAuthorised,
        async (req: Request, res: Response, next: NextFunction) => {
            try{
                console.log('Calling View All Items endpoint with body: %o', req.body );
                const itemServiceInstance = Container.get(ItemService);
                let items = await itemServiceInstance.viewAllItems();
                return res.json({ items: items }).status(200);
            } catch (e) {
                console.error(e);
                return next(e);
            }
        }
    );

};
