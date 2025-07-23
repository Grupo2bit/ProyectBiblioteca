import { uploadSingleImage } from '../middlewares/upload.js';
import fs from 'fs';
import path from 'path';
import multer from 'multer';//  subida de archivos
import modelLibro from '../models/modelLibro.js';

// Crear libro

const controllerLibros = {
    createBook: async (sol , res)=>{
        try{
            uploadSingleImage(sol,res,async(error)=>{
                if(error){
                    res.json({
                        result: 'mistake',
                        message: 'An error occurred while uploading the image',
                        data: error,
                    });
                }
                const newBook = new modelLibro({
                    titulo:sol.body.titulo,
                    autor:sol.body.autor,
                    categoria:sol.body.categoria,
                    ano_publicacion:sol.body.ano_publicacion,
                    disponible:sol.body.disponible,
                    ejemplares:sol.body.ejemplares,
                    imagen:sol.file.filename
                });

                const savedBook = await newBook.save();
                res.json({
                    result: 'fine',
                    message: 'Libro creado',
                    data: savedBook._id,
                });
            });

        }catch(error){
            res.json({
                result: 'mistake',
                message: 'No se pudo crear el libro',
                data: error,
            });
        }
    },
    readBook : async (sol , res)=>{
        try{
            const bookFound = await modelLibro.findById(sol.params.id);
            if(bookFound._id){
                res.json({
                    result:'fine',
                    message: 'Libro encontrado',
                    data: bookFound,
                });
            }
    
        }catch(error){
            res.json({
                result: 'mistake',
                message: 'No se ha podido consultar los libros',
                data: error,
            });
        }
    },
    
    readBooks: async (sol, res) => {
        try {
            const { titulo, autor } = sol.query;
    
            const filtro = {};
            if (titulo) {
                filtro.titulo = { $regex: titulo, $options: 'i' }; // insensible a mayúsculas
            }
            if (autor) {
                filtro.autor = { $regex: autor, $options: 'i' };
            }
    
            const librosFiltrados = await modelLibro.find(filtro);
            res.json({
                result: 'fine',
                message: 'Libros encontrados',
                data: librosFiltrados
            });
        } catch (error) {
            res.json({
                result: 'mistake',
                message: 'No se ha podido consultar los libros',
                data: error,
            });
        }
    },
    
        updateBook : async(sol , res)=>{
            try{
                uploadSingleImage(sol,res,async(error)=>{
                    if(error){
                        res.json({
                            result: ' mistake',
                            message: 'Error uploading image during update',
                            data: error,
                        });
                    }
    
                    const libroExistente = await modelLibro.findById(sol.params.id);
                    if(!libroExistente){
                        return res.status(404).json({
                            result: 'mistake',
                            message: 'Libro no encontrado',
                            data: null,
                        });
                    }
    
                    if(sol.file){
                        const rutaImagenAntigua = path.join('imagenes',
                            libroExistente.imagen
                        );
                        if (fs.existsSync(rutaImagenAntigua)){
                            fs.unlinkSync(rutaImagenAntigua);
                        }
                    }
    
                    const nuevosDatos = {
                    titulo:sol.body.titulo,
                    autor:sol.body.autor,
                    categoria:sol.body.categoria,
                    ano_publicacion:sol.body.ano_publicacion,
                    disponible:sol.body.disponible,
                    ejemplares:sol.body.ejemplares,
                    imagen:sol.file ? sol.file.filename : libroExistente.imagen,
                    };
    
                    const libroActualizado = await modelLibro.findByIdAndUpdate(
                        sol.params.id,
                        nuevosDatos,
                        {new: true}
                    );
                    res.json({
                        result:'fine',
                        message:'Libro actualizado',
                        data: libroActualizado,
                    });
                })
    
            }catch(error){
                res.json({
                    result: ' mistake',
                    message: 'No se pudo actualizar el libro',
                    data: error,
                }); 
            }
        },
        deletebook : async (sol , res)=>{
            try{
                const bookDelete = await modelLibro.findByIdAndDelete(sol.params.id);
    
                if(bookDelete){
                    //si el libro fue eliminado que elimine tambien la imagen del sistema existente
                    const rutaImagen = path.join('imagenes',bookDelete.imagen);
                    if(fs.existsSync(rutaImagen)){
                        fs.unlinkSync(rutaImagen);
                    }
                    res.json({
                        result:'fine',
                        message:'Libro eliminado',
                        data: bookDelete._id,
                    });
                }else{
                    res.status(404).json({
                        result: ' mistake',
                        message: 'Libro no encontrado',
                        data: error,
                    });
                }
    
            }catch(error){
                res.json({
                    result: ' mistake',
                    message: 'No se pudo eliminar el libro',
                    data: error,
                });
            }
        }
    }
    export default controllerLibros;        