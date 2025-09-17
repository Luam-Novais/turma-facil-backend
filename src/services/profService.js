import prisma from '../config/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export default class ProfService {

  static async profCreate({ name, username, password }) {
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
    const verifyPassword = regexPassword.test(password);
    if (username < 3 || username > 20 || !verifyPassword) return { message: 'Formato dos dados enviados inválidos.' };

    const profExisting = await prisma.professor.findUnique({ where: { username: username } });
    if (!profExisting) {
      try {
        const prof = await prisma.professor.create({
          data: {
            name,
            username,
            password: await bcrypt.hash(password, 10),
          },
        });
        const payload = {
          name: prof.name,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        return { prof: prof.name, token };
      } catch (error) {}
    }
  }
  static async profLogin({ username, password }) {
    console.log(username, password);
    const profExisting = await prisma.professor.findUnique({ where: { username: username } });
    try {
      const comparedPass = await bcrypt.compare(password, profExisting.password);
      if (profExisting && comparedPass) {
        const payload = {
          name: profExisting.name,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        return { message: 'Login feito com sucesso', prof: profExisting.name, token };
      }
    } catch (error) {
      return { message: 'Credenciais inválidas.' };
    }
  }
  static async createAluno({ name }) {
    if (name) {
      try {
        const newAluno = await prisma.aluno.create({ data: { name: name } });
        return newAluno
      } catch (error) {
        return { message: 'Ocorreu um erro ao criar o aluno. Tente novamente.' };
      }
    }
  }
  static async editAluno({id, name, status}){
    const nameAluno = name
    const statusAluno = status
    const findAluno = await prisma.aluno.findUnique({where:{id:Number(id)}})
    if(findAluno){
      if(name || status){
        const updatedAluno = await prisma.aluno.update({
          where: {id: Number(id)},
          data: {
            name: nameAluno ? nameAluno : name,
            status: statusAluno ? statusAluno : status
          }
        })
        return {message: 'Aluno atualizado com sucesso.',updatedAluno}
      }
    }else{
      return{message: 'Aluno não encontrado.'}
    }
  }
  static async deleteAluno({id}){
    const deleteAluno = await prisma.aluno.delete({where: {id: Number(id)}})
    return {message: `O aluno ${deleteAluno.name} foi excluído com sucesso.`, deleteAluno}
  }
  static async getAllStudents() {
    const allStudents = await prisma.aluno.findMany();
    return allStudents;
  }
}
