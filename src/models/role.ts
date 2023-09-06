import { ObjectId } from 'mongodb';

export class Role {
    constructor(
        public _id: ObjectId,
        public name: string,
    ) {}
}