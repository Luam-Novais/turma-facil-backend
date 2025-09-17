import prisma from '../config/prisma.js';

export default class AlunoService {
  static async createAluno({ name }) {
    if (name) {
      try {
        const newAluno = await prisma.aluno.create({ data: { name: name } });
        return newAluno;
      } catch (error) {
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
  static async getAllStudents() {
    const allStudents = await prisma.aluno.findMany();
    return allStudents;
  }
}
