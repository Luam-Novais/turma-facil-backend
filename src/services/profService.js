import prisma from '../config/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
export default class ProfService {
  static async profCreate({ name, username, password }) {
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
    const verifyPassword = regexPassword.test(password);
    if (username < 3 || username > 20 || !verifyPassword) return { message: 'Formato dos dados enviados inválidos.' };

    const profExisting = await prisma.professor.findUnique({where:{username:username}});
    if (!profExisting) {

      const prof = await prisma.professor.create({
        data: {
          name,
          username,
          password: await bcrypt.hash(password, 10),
        },
      });
      const payload = {
        name: prof.name
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '1d'})
      return {prof: prof.name, token};
    }
  }
  static async profLogin({username, password}){
    console.log(username, password)
    const profExisting = await prisma.professor.findUnique({where:{username:username}});
    const comparedPass = await bcrypt.compare(password, profExisting.password)
    if(profExisting && comparedPass){
        console.log('fez login')        
    }
  }
  static async getAllStudents() {
    const allStudents = await prisma.professor.findMany();
    return allStudents;
  }
}
