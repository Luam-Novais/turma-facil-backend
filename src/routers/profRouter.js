import Router from 'express'
import ProfController from '../controllers/profController.js'

const router = Router()

router.post('/create-prof', ProfController.createProf)
router.post('/login-prof', ProfController.loginProf)
router.get('/get-all-students', ProfController.getAllStudents)

export default router