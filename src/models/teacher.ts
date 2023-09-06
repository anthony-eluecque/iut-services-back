import { ObjectId } from 'mongodb';

export class Teacher {
    constructor(
        public _id: ObjectId,
        public given_id: string,
        public last_name: string,
        public first_name: string,
        public role_id: string,
    ) {}
}