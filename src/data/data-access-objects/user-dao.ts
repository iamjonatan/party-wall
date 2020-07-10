import {IUser} from "../interfaces/IUser";
import IDao from "../interfaces/IDao";
import mongoose from "mongoose";

export default class UserDAO implements IDao<IUser & mongoose.Document>{

    constructor(private userModel:mongoose.Model<IUser & mongoose.Document>) {
    }

    async get(id: string): Promise<IUser & mongoose.Document | null> {
        return Promise.resolve(await this.userModel.findById(id));
    }

    async getUserByUsername(username:string):Promise<IUser & mongoose.Document | null> {
        return Promise.resolve(await this.userModel.findOne({username: username}));
    }

    async getAll(): Promise<(IUser & mongoose.Document)[]> {
        return Promise.resolve(await this.userModel.find({}));
    }

    async save(user: IUser): Promise<IUser & mongoose.Document> {
        return Promise.resolve(await this.userModel.create({
            username: user.username,
            password: user.password,
            items: user.items
        }));
    }

    async update(user: IUser): Promise<IUser & mongoose.Document | null> {
        return Promise.resolve(await this.userModel.findByIdAndUpdate(user.id, user));
    }

    async delete(id:string): Promise<void> {
        await this.userModel.findByIdAndDelete(id);
    }

}
