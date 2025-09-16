import express from 'express'
import profRouter from './routers/profRouter.js'
const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use('/',profRouter )

app.listen(3000, ()=>{
    console.log('servidor rodando...')
})