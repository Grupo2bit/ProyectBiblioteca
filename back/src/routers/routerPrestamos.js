import {Router} from 'express';
import controllerPrestamos from '../controllers/controllerPrestamos.js';

const routerPrestamos = Router();

routerPrestamos.post('/', controllerPrestamos.createPrestamo);
routerPrestamos.get('/:id',controllerPrestamos.readPrestamo);
routerPrestamos.get('/',controllerPrestamos.readPrestamos);
routerPrestamos.put('/:id',controllerPrestamos.updatePrestamos);
routerPrestamos.delete('/:id',controllerPrestamos.deletePrestamos);


export default routerPrestamos;