import { Schema, model } from "mongoose";

const itemSchema = new Schema({
  hours_amount: {
    type: Number,
    required: [true, 'Veuillez précisez un total (ou 0 par défault)']
  },
  type: {
    type: String,
    required: [true,'Le type de cours est requis']

  },
  lesson : {
    type: Schema.Types.ObjectId,
    ref : 'Lesson'
  }
});

const Item = model('Item',itemSchema);

export default Item;