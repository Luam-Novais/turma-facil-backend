import prisma from "../config/prisma.js";
export default class ModalidadeService{
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