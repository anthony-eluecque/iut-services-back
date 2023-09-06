import { ObjectId } from 'mongodb';

export class Item {
    constructor(
        public _id: ObjectId,
        public hours_amount: number,
        public type: string,
        public lesson_id: string,
    ) {}
}