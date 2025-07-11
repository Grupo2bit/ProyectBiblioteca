import { match } from 'assert';
import { Schema, model} from 'mongoose';
import { type } from 'os';


const schemaSolicitarPrestamo = new Schema({
    numero_documento:{
        type:String,
        required:true,
        trim:true
    },
    titulo_libro:{
        type:String,
        required:true,
        trim:true
    },
    fecha_solicitud:{
         type: Date,
         required:true
    },
    estado:{
        type:String,
        required:true,
        enum:["Pendiente","Aprobado","Rechazado","Cancelado"],
        default:"Aprobado",
        trim:true
    },
    comentario:{
        type:String,
        trim:true
    },
    fecha_devolucion:{
         type: Date,
         required:true
    },
    procesado_por:{
        type:String,
        trim:true
    }
    
});

export default model ('SolicitarPrestamo', schemaSolicitarPrestamo);