import AlunoService from "../services/alunoService.js";

export default class AlunoController{
    
    static async createAluno(req, res){
        const {name, modalidadeId} = req.body
        if(!name) res.status(400).json({message: 'Por favor informe o nome do aluno.'})
        const aluno = await AlunoService.createAluno({name, modalidadeId})
        res.status(201).json(aluno)
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
    static async addAlunoInModalidade(req, res){
        const {alunoId, modalidadeId} = req.body
        if(!alunoId || !modalidadeId) res.status(400).json('Falha ao adicionar o aluno, por favor nos informe o nome e a modalidade.')
        const addAluno = await AlunoService.addAlunoInModalidade({alunoId, modalidadeId})
        res.status(200).json(addAluno)
    }
    static async getAllAlunos (req,res){
        const allAlunos = await AlunoService.getAllAlunos()
        res.status(200).json(allAlunos)
    }
}