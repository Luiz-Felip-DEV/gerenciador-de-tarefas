import { Router } from "express";

import userRequest from "./app/request/userRequest.js";
import userController from "./app/controllers/userController.js";

const router  = Router();

// POST

router.post('/register', userRequest.setUser, userController.setUser);
router.post('/login', userRequest.setLogin, userController.setLogin);
router.post('/coding', userRequest.setCod, userController.setCod);

// GET

// UPDATE

// router.put('/update', jwtUtils.checkToken, userRequest.updateUser, userController.updateUser);

// DELETE
    
// router.delete('/user', jwtUtils.checkToken, userController.deleteUser);

// CASO NAO ENCONTRE NENHUMA ROTA

router.use((req, res) => {res.status(404).json({error: true, msgUser: "Rota não encontrada.", msgOriginal: "Rota não encontrada." })});

export default router 