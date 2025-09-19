import { Router } from "express";
import authProf from "../middlewares/authMiddleware.js";
import AlunoController from "../controllers/alunoController.js";
const router = Router()

//rotas para crud dos alunos 
router.post('/create-aluno', authProf, AlunoController.createAluno)
router.put('/edit-aluno/:id', authProf, AlunoController.editAluno)
router.delete('/delete-aluno/:id', authProf, AlunoController.deleteAluno)
router.post('/add-aluno-in-modalidade', authProf, AlunoController.addAlunoInModalidade)
router.get('/get-all-alunos', authProf, AlunoController.getAllAlunos)
router.get('/get-alunos-by-modalidade', authProf, AlunoController.getAlunosByModalidade)


export default router