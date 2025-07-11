import { Schema, model} from 'mongoose';

const esquemaResena = new Schema({
  numero_documento: { type: Number, required: true },
  titulo_Libro: { type: String, required: true },
  calificacion: { type: Number, required: false },
  comentario: { type: String },
  fecha: { type: Date, required: true },
  estado: { type: String, enum: ["registrado", "no registrado"], default: "registrado"}
},
{
    versionKey: false,
    timestamps: true
});

export default model('resena',esquemaResena);