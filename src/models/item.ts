import { Schema, model } from "mongoose";

const itemSchema = new Schema({
  hours_amount: Number,
  type: String,
  lesson_id : String
});

const Item = model('Item',itemSchema);

export default Item;