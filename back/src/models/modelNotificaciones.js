import { match } from 'assert';
import { Schema, model} from 'mongoose';


const schemaNotificaciones = new Schema({
    numero_documento:{
        type:String,
        required:true,
        trim:true
    },
    tipo:{
        type:String,
        required:true,
        enum:["recordatorio","multa","prestamo","mensaje_admin"],
        default:"recordatorio",
        trim:true
    },
    contenido:{
        type:String,
        required:true,
        trim:true
    },
    fecha_envio:{
        type:Date,
        required:true,
    },
    estado:{
        type:String,
        required:true,
        enum:["leida","no_leida"],
        default:"leida",
        trim:true
    }
});

export default model ('Notificaciones',schemaNotificaciones);