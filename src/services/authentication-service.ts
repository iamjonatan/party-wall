import {Inject, Service} from "typedi";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../config';
import {IUser, IUserInputDTO} from "../data/interfaces/IUser";
import UserDAO from "../data/data-access-objects/user-dao";

@Service()
export default class AuthenticationService {
    constructor(
        @Inject('userDao') private userDao : UserDAO
    ) {}

    public async SignUp(userSignUpDTO: IUserInputDTO): Promise<{ user: IUser; token: string }> {
        //Creating new user on database
        console.log('Hashing password');
        const hashedPassword = await bcrypt.hashSync(userSignUpDTO.password, 10);
        const userRecord = await this.userDao.save({
            username: userSignUpDTO.username,
            password: hashedPassword
        } as IUser);

        if (!userRecord) {
            throw new Error('User cannot be created');
        }
        console.log("New user created")

        const token = this.generateToken(userRecord);
        console.log('Generated JWT');

        const user = userRecord.toObject();
        Reflect.deleteProperty(user, 'password');

        return { user, token };
    }

    public async SignIn(username: string, password: string): Promise<{ user: IUser; token: string }> {
        const userRecord = await this.userDao.getUserByUsername(username);
        if (!userRecord) {
            throw new Error('User not registered');
        }

        console.log('Checking password');
        const validPassword = await bcrypt.compareSync(userRecord.password, password);
        if (validPassword) {
            console.log('Password is valid!');

            const token = this.generateToken(userRecord);
            console.log('Generated JWT');

            //Todo - use converter
            const user = userRecord.toObject();
            Reflect.deleteProperty(user, 'password');

            return { user, token };
        } else {
            throw new Error('Invalid Password');
        }
    }

    private generateToken(user:any) {
        console.log(`Sign JWT for userId: ${user._id}`);
        return jwt.sign(
            {
                _id: user._id,
                name: user.name,
                exp: Math.floor(Date.now() / 1000) + (60 * 60),     //1 hour expiration
            },
            config.jwtSecret
        );
    }

    public async addItem(userId:string, itemId:string):Promise<void> {
        const userRecord = await this.userDao.get(userId);
        if(userRecord) {
            if(!userRecord.items) userRecord.items = [];
            userRecord.items.push(itemId);
            await this.userDao.save(userRecord);
        }
    }

    public async removeItem(userId:string, itemId:string):Promise<void> {
        const userRecord = await this.userDao.get(userId);
        if(userRecord && userRecord.items) {
            let newItems = userRecord.items?.filter( id => id !== itemId);
            userRecord.items = newItems;
            await this.userDao.save(userRecord);
        }
    }
}
