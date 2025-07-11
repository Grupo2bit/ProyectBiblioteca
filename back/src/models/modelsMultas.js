import { Schema, model } from 'mongoose';

const multaSchema = new Schema({
  numero_documento: {
    type: String,
    required: true,
    trim: true
  },
  titulo_libro: {
    type: String,
    required: true,
    trim: true
  },
  monto: {
    type: Number,
    required: true,
    min: 0
  },
  fecha_Prestamo: {
    type: Date,
    required: true
  },
  fecha_devolucion: {
    type: Date,
    required: true
  },
  fecha_Limite_Pago: {
    type: Date,
    required: true
  },
  estado: {
    type: String,
    required: true,
    enum: ['pendiente', 'pagada'],
    default: 'pendiente',
    trim: true
  }
});

export default model('Multa',multaSchema);