import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import AuthenticationService from '../../services/authentication-service';

import { celebrate, Joi } from 'celebrate';
import {IUserInputDTO} from "../../data/interfaces/IUser";

const route = Router();

/*
* This contains all routes associated with authentication
* */
export default (app: Router) => {
    app.use('/auth', route);

    route.post(
        '/signup',
        celebrate({
            body: Joi.object({
                username: Joi.string().required(),
                password: Joi.string().required(),
            }),
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                console.log('Calling Sign-Up endpoint with body: %o', req.body )
                const authServiceInstance = Container.get(AuthenticationService);
                const { user, token } = await authServiceInstance.SignUp(req.body as IUserInputDTO);
                return res.status(201).json({ user, token });
            } catch (e) {
                console.error('error: %o', e);
                return next(e);
            }
        },
    );

    route.post(
        '/signin',
        celebrate({
            body: Joi.object({
                username: Joi.string().required(),
                password: Joi.string().required(),
            }),
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { email: username, password } = req.body;
                const authServiceInstance = Container.get(AuthenticationService);
                const { user, token } = await authServiceInstance.SignIn(username, password);
                return res.json({ user, token }).status(200);
            } catch (e) {
                console.error('error: %o',  e );
                return next(e);
            }
        },
    );
};
