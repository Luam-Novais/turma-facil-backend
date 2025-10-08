import prisma from "../config/prisma.js";
import AlunoService from "./alunoService.js";
export default class ModalidadeService{
  static async getAllModalidades({profId}){
    const allModalidades = await prisma.modalidade.findMany({
      where:{
        profId: profId
      },
    })

    return allModalidades
  }
  static async getModalidadesAndAlunos({profId}){
    const modalidades = await prisma.modalidade.findMany({
      where:{
        profId: profId
      },
      include:{
        alunos: true
      }
    })
    return modalidades
  }
    static async getAlunoByModalidade({modalidadeId}){
   try {
       const findedAlunos = await prisma.aluno.findMany({
        include: {modalidades:true},
        where:{
          modalidades:{
          some:{
            id:Number(modalidadeId)
          }
        }}
       })
    console.log(findedAlunos)
    if(!findedAlunos) return {message: 'Ainda não existem alunos cadastrados nessa modalidade.'}
    return findedAlunos
   } catch (error) {
      console.log(error)
   }
  }

    static async createModalidade({name, profId}){
        const formatedName = name.toLowerCase().trim()
      try {
          const newModalidade = await prisma.modalidade.create({
            data:{
                name: formatedName,
                profId: profId
            }
        })
        return {message: 'Modalidade criada com sucesso!', newModalidade}
      } catch (error) {
        console.log(error)
        return {message: 'Ocorreu um erro ao criar noda modalidade. Verifique seu login.'}
      }
    }
    static async deleteModalidade({name}){
        const formatedName = name.toLowerCase()
        const deletedModalidade = await prisma.modalidade.delete({where: {name: formatedName}})
        if(!deletedModalidade) return {message: 'Ocorreu um erro ao deletar a modalidade.'}
        return {message: 'Modalidade deletada com sucesso!', deletedModalidade}
    }
}