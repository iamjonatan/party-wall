import { IItem } from '../interfaces/IItem';
import mongoose from 'mongoose';

const Item = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter name']
        },
        type: {
            type: String,
            enum: ['food', 'drink']
        },
        description: String,
        weight: String,
        volume: String,
        quantity: String,
        price: String
    },
    {
        collection: 'item',
        timestamps: true
    }
);

export default mongoose.model<IItem & mongoose.Document>('Item', Item);
