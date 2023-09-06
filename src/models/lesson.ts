import { ObjectId } from 'mongodb';

export class Lesson {
    constructor(
        public _id: ObjectId,
        public given_id: string,
        public name: string,
    ) {}
}