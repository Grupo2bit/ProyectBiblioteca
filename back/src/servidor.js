import path from "path";//me ayuda a trazar el camino a seguir de los enrutamientos
import express from "express";// para realizar la conexion con el servidor 
import morgan from "morgan";//monitorear solicitudes http
import cors from "cors";//permitiendo que aplicaciones de diferentes orígenes se comuniquen entre sí
import routersUsers from "./routers/routerUsers.js";
import routerPrestamos from "./routers/routerPrestamos.js";
import routerSolicitarPrestamos from "./routers/routerSolicitarPrestamo.js";
import routerMultas from './routers/routerMultas.js';
import routerLibro from "./routers/routerLibro.js";
import routerResena from "./routers/routerResena.js";
import routerNotificaciones from "./routers/routerNotificaciones.js";

const servidor = express();//para realizar la conexion con la constante servidor 

servidor.use(cors());
servidor.use(morgan("dev"));//para que se actualice conforme vamos realizando los cambios 
servidor.use(express.json());//para que la conexion que realicemos nos reciba un formato json
servidor.use("/api/usuarios",routersUsers);
servidor.use('/libros', routerLibro);
servidor.use('/prestamos', routerPrestamos);
servidor.use('/solicitarPrestamos', routerSolicitarPrestamos);
servidor.use('/multas', routerMultas);
servidor.use('/resenas', routerResena);
servidor.use('/notificaciones', routerNotificaciones);
servidor.get('/',(sol , res)=>{
    res.status(404).send("No encontrado");//por si no encuentra la conexion me enviara esta respuesta 
});

export default servidor;