import { Schema, model} from 'mongoose';

const esquemaLibro = new Schema({
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    categoria: { type: String, required: true }, 
    ano_publicacion: { type: Number },
    disponible: { type: Boolean, default: true}, // defaul: true está disponible a menos que se diga lo contrario.
    ejemplares: { type: Number, default: 1, required: true },
    imagen: {type: String, required: true},
},
{
    versionKey: false,
    timestamps: true
});

export default model('libro',esquemaLibro);

