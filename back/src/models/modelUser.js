import { hashSync } from "bcryptjs";
import { Schema, model } from "mongoose";

const schemaUser = new Schema({
  name: { type: String, required: true },
  type_document: { type: String, required: true }, 
  name_document: { type: String, required: true, unique: true },
  date_of_birth: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, enum: ['administrador', 'usuario'], default: 'usuario' },
  estatus: { type: String, enum: ['activo', 'inactivo'], default: 'activo' },
  password: { type: String, required: true }
}, {
  timestamps: true 
});

export default model("Usuario", schemaUser);
