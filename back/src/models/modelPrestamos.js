import { match } from 'assert';
import { Schema, model} from 'mongoose';

const schemaPrestamos= new Schema({
 numero_documento:{
    type: String,
    required:true,
    trim:true,
 },
 titulo_libro:{
      type: String,
    required:true,
    trim:true,
 },
 fecha_prestamo:{
    type: Date,
    required:true
 },
 fecha_devolucion:{
     type: Date,
    required:true
 },
 fecha_entrega:{
     type: Date,
    required:true
 },
 estado:{
    type:String,
    required:true,
    enum:["prestado","devuelto","retrasado"],
    default:"prestado",
    trim:true
 }
});

export default model ('Prestamos',schemaPrestamos);