import { Schema, model } from "mongoose";

const teacherSchema = new Schema({
    given_id : String,
    last_name : String,
    first_Name : String,
    role_id : String
});

const Teacher = model('Teacher',teacherSchema);

export default Teacher;