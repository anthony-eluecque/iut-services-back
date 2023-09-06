import { Schema, model } from "mongoose";

const serviceSchema = new Schema({
  annee: String,
  items_id: String,
  teacher_id: String
});

const Service = model('Service',serviceSchema);

export default Service;