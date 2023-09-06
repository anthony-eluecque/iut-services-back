import { ObjectId } from 'mongodb';

export class Service {
    constructor(
        public _id: ObjectId,
        public annee: string,
        public items_id: string,
        public teacher_id: string,
    ) {}
}