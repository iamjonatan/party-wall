import jwt from 'express-jwt';
import config from '../../config';

/**
 * We are assuming that the JWT will come in a header with the form 'Authorization: Bearer ${JWT}'
 * But it could come in a query parameter of GET
 */
const getTokenFromHeader = (req:any) => {
    if (
        (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
        (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
    ) {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
};

const isAuthorised = jwt({
    secret: config.jwtSecret,
    algorithms: ['HS256'],
    userProperty: 'token',
    getToken: getTokenFromHeader
});

export default isAuthorised;
