import {Router} from 'express';
import controllerLibros from '../controllers/controllerLibros.js';


const routerLibro = Router();
routerLibro.post('/', controllerLibros.createBook);
routerLibro.get('/:id', controllerLibros.readBook);
routerLibro.get('/', controllerLibros.readBook);
routerLibro.put('/:id', controllerLibros.updateBook);
routerLibro.delete('/:id', controllerLibros.deletebook);


export default routerLibro;