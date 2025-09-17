import ProfService from "../services/profService.js"
export default class ProfController{
    static async createProf(req, res){
        const {name, username, password} = req.body
        if(!name || !username || !password) return res.status(400).json({message: 'Verifique novamente os dados enviados.'})
        const prof = await ProfService.profCreate({name, username, password})
        res.status(201).json({message: 'Professor criado com sucesso', prof: prof})
    }
    static async loginProf(req,res){
        const {username, password} = req.body
            if( !username || !password) return res.status(400).json({message: 'Verifique novamente os dados enviados.'})
            const prof = await ProfService.profLogin({username, password})
            res.status(201).json({message: 'Login feito com sucesso', prof: prof})
    }
    static async createAluno(req, res){
        const {name} = req.body
        if(!name) res.status(400).json({message: 'Por favor informe o nome do aluno.'})
        const aluno = await ProfService.createAluno({name})
        res.status(201).json({message: 'Aluno criado com suceso.', aluno})
    }
    static async editAluno(req,res){
        const {id} = req.params
        const {name, status} = req.body
        if(id && name || status) {
            const editedAluno = await ProfService.editAluno({id, name, status})
            res.status(200).json(editedAluno)
        }
    }
    static async deleteAluno(req, res){
        const {id} = req.params
        if(!id) res.status(400).json({message: 'Falha ao excluir aluno.'})
        const deleteAluno = await ProfService.deleteAluno({id})
        res.status(200).json({message: deleteAluno.message, deleteAluno})
    }
    static async getAllStudents (req,res){
        const allStudents = await ProfService.getAllStudents()
        res.status(200).json(allStudents)
    }
}