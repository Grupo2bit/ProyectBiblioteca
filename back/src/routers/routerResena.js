import {Router} from 'express';
import controllerResena from '../controllers/controllerResena.js';


const routerResena = Router();
routerResena.post('/', controllerResena.createResena);
routerResena.get('/:id', controllerResena.readResena);
routerResena.get('/', controllerResena.readResenas);
routerResena.put('/:id', controllerResena.updateResena);
routerResena.delete('/:id', controllerResena.deleteResena);


export default routerResena;