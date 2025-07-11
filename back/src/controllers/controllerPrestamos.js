import modelPrestamos from '../models/modelPrestamos.js'

const controllerPrestamos ={
    createPrestamo: async(sol,res)=>{
        try{
            const{numero_documento,titulo_libro,fecha_prestamo,fecha_devolucion,fecha_entrega,estado} = sol.body;
            console.log(sol.body);

        const Prestamo = new modelPrestamos({
            numero_documento,
            titulo_libro,
            fecha_prestamo,
            fecha_devolucion,
            fecha_entrega,
            estado: estado || 'prestado',
        });
        const PrestamosCreate = await Prestamo.save();
        if(PrestamosCreate._id){
              res.json({
                    result: 'fine',
                    message: 'Prestamo Creado',
                    data: PrestamosCreate._id,
                });
        }
        }catch(error){
            res.json({
                result:'mistake',
                message:'A ocurrido un error mientras se crea el Prestamo',
                data:error,
            });
        }
    },
      readPrestamo: async(sol,res)=>{
        try{
            const PrestamoFound = await modelPrestamos.findById();
            res.json({
                result:'fine',
                message:'Prestamo Encontrado',
                data:PrestamoFound,
            })
        }catch(error){
            res.json({
                result:'mistake',
                message:'A ocurrido un error mientras se lee el Prestamo',
                data:error,
            });
        }
    },
    readPrestamos: async(sol,res)=>{
        try{
            const allPrestamosFound = await modelPrestamos.find();
            res.json({
                result:'fine',
                message:'Prestamos Encontrado',
                data:allPrestamosFound,
            })
        }catch(error){
            res.json({
                result:'mistake',
                message:'A ocurrido un error mientras se lee los Prestamos',
                data:error,
            });
        }
    },
    updatePrestamos: async(sol,res)=>{
        try{
            const PrestamosUpdate = await modelPrestamos.findByIdAndUpdate(
                sol.params.id,
                sol.body
            );

            if(PrestamosUpdate._id){
                res.json({
                    resul:'fine',
                    message:'Prestamo Actualizado',
                    data: PrestamosUpdate._id,
                });
            }
        }catch(error){
             res.json({
                result:'mistake',
                message:'A ocurrido un error mientras se actualiza Prestamo',
                data:error,
            });
        }
    },
    deletePrestamos: async (sol,res)=>{
        try{
            const PrestamosDelete= await modelPrestamos.findByIdAndDelete(
                sol.params.id
            );
            if(PrestamosDelete._id){
                res.json({
                    result:'fine',
                    message:'Prestamo Eliminado',
                    data:null,
                });
            }
        }catch(error){
             res.json({
                result:'mistake',
                message:'A ocurrido un error mientras se elimina Prestamo',
                data:error,
            });
        }
    }
};

export default controllerPrestamos;