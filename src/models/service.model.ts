import { Mongoose, Schema, model } from "mongoose";
import Teacher from "./teacher.model";

const serviceSchema = new Schema({
  annee: {
    type: String,
    required : true
  },
  items: {
    type:Schema.Types.ObjectId,
    ref:'Item'
  },
  teacher: {
    type:Schema.Types.ObjectId,
    ref:'Teacher'
  }
});

const Service = model('Service',serviceSchema);

export default Service;