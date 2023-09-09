import { Schema, model } from "mongoose";

const lessonSchema = new Schema({
  given_id: {
    type : String,
    required : true
  },
  name: {
    type : String,
    required : true
  }
});

const Lesson = model('Lesson',lessonSchema);

export default Lesson;