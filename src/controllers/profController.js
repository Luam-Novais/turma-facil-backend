import ProfService from "../services/profService.js"
export default class ProfController{

    static async createProf(req, res){
        const {name, username, password} = req.body
        if(!name || !username || !password) return res.status(400).json({message: 'Verifique novamente os dados enviados.'})
        const prof = await ProfService.profCreate({name, username, password})
        res.status(201).json(prof)
    }
    static async loginProf(req,res){
        const {username, password} = req.body
            if( !username || !password) return res.status(400).json({message: 'Verifique novamente os dados enviados.'})
            const prof = await ProfService.profLogin({username, password})
            res.status(201).json(prof)
    }
}