import { Router } from "express";
import controllersUser from "../controllers/controllersUser.js";

const routerUsers = Router();


routerUsers.post('/', controllersUser.createUser);
routerUsers.get('/:id', controllersUser.readUser);
routerUsers.get('/', controllersUser.readAllUsers);
routerUsers.put('/:id', controllersUser.updateUser);
routerUsers.delete('/:id', controllersUser.deleteUser);
routerUsers.post('/login', controllersUser.loginUser);
routerUsers.post('/register', controllersUser.createUser);
routerUsers.post('/recuperar', controllersUser.recuperarPassword);
routerUsers.post('/reset-password', controllersUser.resetPassword);


export default routerUsers;

