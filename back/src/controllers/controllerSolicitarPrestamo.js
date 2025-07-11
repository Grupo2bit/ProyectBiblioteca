import modelSolicitarPrestamo from "../models/modelSolicitarPrestamo.js";

const ControllerSolicitarPrestamo={
    createSolicitarPrestamo: async(sol,res)=>{
        try{
            const {numero_documento,titulo_libro,fecha_solicitud,estado,comentario,fecha_respuesta,fecha_devolucion,procesado_por} = sol.body;
            console.log(sol.body);
        
            const SolicitarPrestamo= new modelSolicitarPrestamo({
                numero_documento,
                titulo_libro,
                fecha_solicitud,
                estado: estado || 'Aprobado',
                comentario,
                fecha_respuesta,
                fecha_devolucion,
                procesado_por
            });
            const SolicitarPrestamoCreate=await SolicitarPrestamo.save();
            if(SolicitarPrestamoCreate._id){
                res.json({
                    result: 'fine',
                    message: 'Solicitud de Prestamo Creado',
                    data: SolicitarPrestamoCreate._id,
                });
            }
        }catch(error){
            res.json({
                result: 'mistake',
                message: 'A ocurrido un error al momento de crear la solicitud de Prestamo',
                data: error,
            });
        }
    },
    readSolicitarPrestamo: async(sol,res)=>{
        try{
            const SolicitarPrestadoFound = await modelSolicitarPrestamo.findById(
                sol.params.id
            );
            if(SolicitarPrestadoFound._id){
                res.json({
                    result: 'fine',
                    message: 'Solicitud de Prestamo Encontrado',
                    data: SolicitarPrestadoFound,
                });
            }
        }catch(error){
            res.json({
                result: 'mistake',
                message: 'A ocurrido un error al momento de encontrar la solicitud del Prestamo',
                data: error,
            });
        }
    },
    readSolicitarPrestamos:async(sol,res)=>{
        try{
            const allSolicitarPrestamosFound = await modelSolicitarPrestamo.find();
             res.json({
                result: 'fine',
                message: 'Solicitudes de Prestamos Encontradas',
                data: allSolicitarPrestamosFound,
            })
        }catch(error){
            res.json({
                result: 'mistake',
                message: 'A ocurrido un error al momento de encontrar todas las solicitudes del Prestamo',
                data: error,
            });
        }
    },
    updateSolicitarPrestamo: async(sol,res)=>{
        try{
            const SolicitarPrestamoUpdate= await modelSolicitarPrestamo.findByIdAndUpdate(
                sol.params.id,
                sol.body
            );
        if(SolicitarPrestamoUpdate._id){
          res.json({
                result: 'fine',
                message: 'Solicitud de Prestamo Actualizado',
                data: SolicitarPrestamoUpdate._id,
        });  
        }
        }catch(error){
            res.json({
                result: 'mistake',
                message: 'A ocurrido un error al momento de actualizar la solicitud de prestamo',
                data: error,
            });
        }
    },
    deleteSolicitarPrestamo:async (sol,res)=>{
        try{
            const SolicitarPrestamoDelete = await modelSolicitarPrestamo.findByIdAndDelete(
                sol.params.id
            );
            if(SolicitarPrestamoDelete._id){
                 res.json({
                    result: 'fine',
                    message:'Solicitud Prestamo Eliminado',
                    data: null,
                });
            }
        }catch(error){
             res.json({
                result: 'mistake',
                message: 'A ocurrido un error al momento de eliminar la solicitud de prestamo',
                data: error,
            });
        }
    }
};

export default ControllerSolicitarPrestamo;