import ModalidadeService from "../services/modaliService.js";
import jwt from 'jsonwebtoken'
export default class ModalidadeController{
    static async createModalidade(req, res){
        const {name} = req.body
        const token = req.headers.authorization.split(' ')[1]
        if(!name) res.status(400).json({message: 'Por favor informe o nome da modalidade.'})
        if(!token) res.status(400).json({message: 'Efetue o login para prosseguir.'})

        const tokenDecoded = jwt.decode(token, process.env.JWT_SECRET_KEY)
        const modalidade = await ModalidadeService.createModalidade({name, profId: tokenDecoded.profId})
        res.status(201).json({message: modalidade.message, modalidade: modalidade.newModalidade})
    }
    static async deleteModalidade(req ,res) {
        const {name} = req.body
        if(!name)  res.status(400).json({message: 'Por favor informe o nome da modalidade para efetuar a exclusão.'})
        const deletedModalidade = await ModalidadeService.deleteModalidade({name})
        res.status(200).json({message: deletedModalidade.message, deletedModalidade: deletedModalidade.deletedModalidade})
    }
}