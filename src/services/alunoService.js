import prisma from '../config/prisma.js';

export default class AlunoService {
  static async createAluno({ name, modalidadeId }) {
    const formatedName = name.toLowerCase().trim()
    if (name) {
      try {
        const newAluno = await prisma.aluno.create({ data: {
          name: formatedName,
          modalidades: {
            connect: {id: Number(modalidadeId)}
          }
        } });
        return {message: 'Aluno criado com sucesso.', newAluno};
      } catch (error) {
        console.log(error)
        return { message: 'Ocorreu um erro ao criar o aluno. Tente novamente.' };
      }
    }
  }
  static async editAluno({ id, name, status }) {
    const nameAluno = name;
    const statusAluno = status;
    const findAluno = await prisma.aluno.findUnique({ where: { id: Number(id) } });
    if (findAluno) {
      if (name || status) {
        const updatedAluno = await prisma.aluno.update({
          where: { id: Number(id) },
          data: {
            name: nameAluno ? nameAluno : name,
            status: statusAluno ? statusAluno : status,
          },
        });
        return { message: 'Aluno atualizado com sucesso.', updatedAluno };
      }
    } else {
      return { message: 'Aluno não encontrado.' };
    }
  }
  static async deleteAluno({ id }) {
    const deleteAluno = await prisma.aluno.delete({ where: { id: Number(id) } });
    if(!deleteAluno) return {message: 'O aluno não foi encontrado.'}
    return { message: `O aluno ${deleteAluno.name} foi excluído com sucesso.`, deleteAluno };
  } 
  static async addAlunoInModalidade({alunoId, modalidadeId}){
    try {
        const findedAluno = await prisma.aluno.update({
      where: {id: Number(alunoId)},
      data:{
        modalidades:{connect:{id : Number(modalidadeId)}}
      }
    })
    return {message: `Aluno adicionado com sucesso a categoria.`, findedAluno}
    } catch (error) {
      console.log(error)
      return{message: 'Falha ao adicionar o aluno a modalidade.'}
    }
  }
  static async getAllAlunos() {
    const allAlunos = await prisma.aluno.findMany();
    return allAlunos;
  }

}
