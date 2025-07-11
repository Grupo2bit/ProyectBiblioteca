import {Router} from 'express';
import ControllerNotificaciones from '../controllers/controllerNotificaciones.js';

const routerNotificaciones =Router();
routerNotificaciones.post('/', ControllerNotificaciones.createNotificaciones);
routerNotificaciones.get('/:id',ControllerNotificaciones.readNotificacion);
routerNotificaciones.get('/',ControllerNotificaciones.readNotificaciones);
routerNotificaciones.put('/:id',ControllerNotificaciones.updateNotificacion);
routerNotificaciones.delete('/:id',ControllerNotificaciones.deleteNotificacion);


export default routerNotificaciones;