import ProfService from "../services/profService.js"
import jwt from "jsonwebtoken"
export default class ProfController{

    static async createProf(req, res){
        const {name, username, password} = req.body
        if(!name || !username || !password) return res.status(400).json({message: 'Verifique novamente os dados enviados.'})
        const prof = await ProfService.profCreate({name, username, password})
        if(prof.error) res.status(400).json(prof.message)
        res.status(201).json(prof)
    }
    static async loginProf(req,res){
        const {username, password} = req.body
            if( !username || !password) return res.status(400).json({message: 'Verifique novamente os dados enviados.'})
            const prof = await ProfService.profLogin({username, password})
            if(prof.error) res.status(401).json(prof)
            res.status(201).json(prof)
    }
    static validateToken(req, res){
        const token = req.headers.authorization.split(' ')[1]
        if(!token) res.status(400).json({message: 'Ocorreu um erro inesperado.'})
        const validatedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        res.status(200).json(validatedToken)
    }
}