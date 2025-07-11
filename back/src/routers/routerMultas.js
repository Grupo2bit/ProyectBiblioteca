import { Router } from 'express';
import controllerMultas from '../controllers/controllerMultas.js';

const routerMultas = Router();

routerMultas.post('/', controllerMultas.createMulta);
routerMultas.get('/:id', controllerMultas.readMulta);
routerMultas.get('/', controllerMultas.readMultas);
routerMultas.put('/:id', controllerMultas.updateMulta);
routerMultas.delete('/:id', controllerMultas.deleteMulta);

export default routerMultas;