import express from 'express'
import profRouter from './routers/profRouter.js'
import alunoRouter from './routers/alunoRouter.js'
import modaliRouter from './routers/modaliRouter.js'
const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use('/',profRouter )
app.use('/aluno', alunoRouter )
app.use('/modalidade', modaliRouter )

app.listen(3000, ()=>{
    console.log('servidor rodando...')
})