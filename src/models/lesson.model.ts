import { Schema, model } from "mongoose";

const lessonSchema = new Schema({
  given_id: String,
  name: String
});

const Lesson = model('Lesson',lessonSchema);

export default Lesson;