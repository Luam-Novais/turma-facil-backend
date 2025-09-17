import Router from 'express'
import ProfController from '../controllers/profController.js'
import authProf from '../middlewares/authMiddleware.js'

const router = Router()

//rotas para login e criacao de professor, cada professor tem suas modalidades e os alunos estao vinculados as maticulas
router.post('/create-prof', ProfController.createProf)
router.post('/login-prof', ProfController.loginProf)


//rotas para crud das modalidades

export default router