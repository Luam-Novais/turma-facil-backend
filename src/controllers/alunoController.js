import AlunoService from "../services/alunoService.js";

export default class AlunoController{
    
    static async createAluno(req, res){
        const {name} = req.body
        if(!name) res.status(400).json({message: 'Por favor informe o nome do aluno.'})
        const aluno = await AlunoService.createAluno({name})
        res.status(201).json({message: 'Aluno criado com suceso.', aluno})
    }
    static async editAluno(req,res){
        const {id} = req.params
        const {name, status} = req.body
        if(id && name || status) {
            const editedAluno = await AlunoService.editAluno({id, name, status})
            res.status(200).json(editedAluno)
        }
    }
    static async deleteAluno(req, res){
        const {id} = req.params
        if(!id) res.status(400).json({message: 'Falha ao excluir aluno.'})
        const deleteAluno = await AlunoService.deleteAluno({id})
        res.status(200).json({message: deleteAluno.message, deleteAluno})
    }
    static async getAllStudents (req,res){
        const allStudents = await AlunoService.getAllStudents()
        res.status(200).json(allStudents)
    }
}