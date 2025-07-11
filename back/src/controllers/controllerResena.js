import fs from 'fs';
import path from 'path';
import modelResena from '../models/modelResena.js';


const controllerResenas = {
    createResena: async (sol , res)=>{
        try{
            const newResena = new modelResena({
               numero_documento: sol.body.numero_documento,
                 titulo_Libro: sol.body.titulo_Libro,
                 calificacion: sol.body.calificacion,
                comentario: sol.body.comentario,
                fecha: sol.body.fecha,
                estado: sol.body.estado
                 });
                 const resenaCreate = await newResena.save();
                if(resenaCreate._id){
                  res.json({
                 result: 'fine',
                message: 'Reseña creada',
                data: resenaCreate._id,
            });
        };
    
        }catch(error){
            res.json({
               result: 'Error',
               message: 'No se pudo crear la reseña',
               data: error,
               });

        }
    },
    readResena : async(sol , res)=>{
        try{
            const allResenaFound = await modelResena.find();
            res.json({
                result: 'Exitoso',
                message: ' Reseña encontrada',
                data: allResenaFound
            });
        }catch(error){
            res.json({
                result: ' Error',
                message: 'No es posible leer las resenas',
                data: error,
            });
        }   
    },
    updateResena : async(sol , res)=>{
        try {
        const resenaUpdate = await modelResena.findByIdAndUpdate(sol.params.id,
         sol.body
        );
        if(resenaUpdate._id){
        res.json({
        result:'Exitoso',
        message:'Resena actualizada',
        data: resenaUpdate._id,
        });
    }
        
        }catch(error){
        res.json({
        result: ' error',
        message: 'No es posible actualizar la reseña',
        data: error,
         });
         }
        },

        deleteResena : async (sol , res)=>{
           try{
            const resenaDelete = await modelResena.findByIdAndDelete(sol.params.id);
            if(resenaDelete){
            res.json({
            result:'Exitoso',
             message:'Resena eliminada',
                data: null,
             });
             }

           }catch(error){
           res.json({
             result: ' Error',
              message: 'No se pudo eliminar la reseña',
                data: error,
             });
             }
           }
            }
            export default controllerResenas;
