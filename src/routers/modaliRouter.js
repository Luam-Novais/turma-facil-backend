import { Router } from "express";
import authProf from "../middlewares/authMiddleware.js";
import ModalidadeController from "../controllers/modaliController.js";
const router = Router()

router.post('/create-modalidade',authProf,  ModalidadeController.createModalidade)
router.delete('/delete-modalidade',authProf,  ModalidadeController.deleteModalidade)

export default router