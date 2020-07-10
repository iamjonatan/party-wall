import { IUser } from '../interfaces/IUser';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, 'Please enter username']
        },
        password: {
            type: String,
            required: [true, 'Please enter password']
        },
        items: [ String ]
    },
    {
        collection: 'user',
        timestamps: true
    }
);

export default mongoose.model<IUser & mongoose.Document>('User', User);
