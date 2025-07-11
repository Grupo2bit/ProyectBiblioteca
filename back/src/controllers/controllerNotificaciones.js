import modelNotificaciones from "../models/modelNotificaciones.js";

const ControllerNotificaciones={
    createNotificaciones:async(sol,res)=>{
        try{
            const {numero_documento,tipo,contenido,fecha_envio,estado} = sol.body;
            console.log(sol.body);

            const Notificacion = new modelNotificaciones({
                numero_documento,
                tipo:tipo || 'recordatorio',
                contenido,
                fecha_envio,
                estado: estado || 'leida'
            });
            const NotificacionesCreate = await Notificacion.save();
            if(NotificacionesCreate._id){
                res.json({
                    result: 'fine',
                    message: 'Notificacion Creada',
                    data: NotificacionesCreate._id,
                });
            }
        }catch(error){
            res.json({
                result:'mistake',
                message:'A ocurrido un error mientras se crea la notificacion',
                data:error,
            });
        }
    },
    readNotificacion: async(sol,res)=>{
        try{
            const notificacionFound = await modelNotificaciones.findById(
                sol.params.id
            );
            if(notificacionFound._id){
                res.json({
                    result: 'fine',
                    message: 'Notificacion Encontrada',
                    data: notificacionFound,
                });
            }
        }catch(error){
            res.json({
                result:'mistake',
                message:'A ocurrido un error mientras se encuentra la notificacion',
                data:error,
            });
        }
    },
    readNotificaciones: async(sol,res)=>{
        try{
            const allNotificacionesFound= await modelNotificaciones.find();
            res.json({
                    result: 'fine',
                    message: 'Notificaciones Encontradas',
                    data: allNotificacionesFound,
                });
        }catch(error){
            res.json({
                result:'mistake',
                message:'A ocurrido un error mientras se encuentra las notificaciones',
                data:error,
            });
        }
    },
    updateNotificacion: async(sol,res)=>{
        try{
            const NotificacionUpdate= await modelNotificaciones.findByIdAndUpdate(
                sol.params.id,
                sol.body
            );
            if(NotificacionUpdate._id){
                res.json({
                    result: 'fine',
                    message: 'Notificacion Actualizada',
                    data: NotificacionUpdate._id,
                }); 
            }
        }catch(error){
             res.json({
                result:'mistake',
                message:'A ocurrido un error mientras se actualizaba la notificacion',
                data:error,
            });
        }
    },
    deleteNotificacion: async(sol,res)=>{
        try{
            const notificacionDelete = await modelNotificaciones.findByIdAndDelete(
                sol.params.id
            );
            if(notificacionDelete._id){
              res.json({
                    result: 'fine',
                    message: 'Notificacion Eliminada',
                    data: notificacionDelete._id,
                });   
            }
        }catch(error){
            res.json({
                result:'mistake',
                message:'A ocurrido un error mientras se eliminaba la notificacion',
                data:error,
            });
        }
    }
};

export default ControllerNotificaciones;