import {IItem} from "../interfaces/IItem";
import IDao from "../interfaces/IDao";
import mongoose from "mongoose";

export default class ItemDao implements IDao<IItem & mongoose.Document>{

    constructor(private itemModel:mongoose.Model<IItem & mongoose.Document>) {
    }

    async get(id: string): Promise<IItem & mongoose.Document | null> {
        return Promise.resolve(await this.itemModel.findById(id));
    }

    async getAll(): Promise<(IItem & mongoose.Document)[]> {
        return Promise.resolve(await this.itemModel.find({}));
    }

    async save(item: IItem): Promise<IItem & mongoose.Document> {
        if(item.type === 'food') {
            return Promise.resolve(await this.itemModel.create({
                name: item.name,
                type: 'food',
                description: item.description,
                weight: item.weight,
                price: item.price,
                quantity: item.quantity
            }));
        } else {
            return Promise.resolve(await this.itemModel.create({
                name: item.name,
                type: 'drink',
                volume: item.volume,
                price: item.price,
                quantity: item.quantity
            }));
        }
    }

    async update(item: IItem): Promise<IItem & mongoose.Document | null> {
        return Promise.resolve(await this.itemModel.findByIdAndUpdate(item._id, item));
    }

    async delete(id:string): Promise<void> {
        await this.itemModel.findByIdAndDelete(id);
    }

}
