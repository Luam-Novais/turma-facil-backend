import Router from 'express'
import ProfController from '../controllers/profController.js'
import authProf from '../middlewares/authMiddleware.js'

const router = Router()

router.post('/create-prof', ProfController.createProf)
router.post('/login-prof', ProfController.loginProf)
router.post('/create-aluno', authProf, ProfController.createAluno)
router.put('/edit-aluno/:id', authProf, ProfController.editAluno)
router.get('/get-all-students', authProf, ProfController.getAllStudents)

export default router