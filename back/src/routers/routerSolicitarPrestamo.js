import {Router} from 'express';
import ControllerSolicitarPrestamo from '../controllers/controllerSolicitarPrestamo.js';

const routerSolicitarPrestamos = Router();

routerSolicitarPrestamos.post('/', ControllerSolicitarPrestamo.createSolicitarPrestamo);
routerSolicitarPrestamos.get('/:id',ControllerSolicitarPrestamo.readSolicitarPrestamo);
routerSolicitarPrestamos.get('/',ControllerSolicitarPrestamo.readSolicitarPrestamos);
routerSolicitarPrestamos.put('/:id',ControllerSolicitarPrestamo.updateSolicitarPrestamo);
routerSolicitarPrestamos.delete('/:id',ControllerSolicitarPrestamo.deleteSolicitarPrestamo);


export default routerSolicitarPrestamos;