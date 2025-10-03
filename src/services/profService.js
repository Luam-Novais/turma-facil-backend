import prisma from '../config/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export default class ProfService {
  static async profCreate({ name, username, password }) {
    const formatedName = name.toLowerCase().trim();
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
    const verifyPassword = regexPassword.test(password);
    if (username < 3 || username > 20 || !verifyPassword) return { error: true, message: 'Formato dos dados enviados inválidos.' };

    const profExisting = await prisma.professor.findUnique({ where: { username: username } });
    if (profExisting) return {error: true, message: 'Nome de usuário ja em uso. Por favor crie outro!'}
      try {
        const prof = await prisma.professor.create({
          data: {
            name: formatedName,
            username,
            password: await bcrypt.hash(password, 10),
          },
        });
        const payload = {
          name: prof.name,
          profId: prof.id,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        return { message: 'Professor criado com sucesso.', prof: prof.name, token };
      } catch (error) {}
  
  }
  static async profLogin({ username, password }) {
    const profExisting = await prisma.professor.findUnique({ where: { username: username } });
    try {
      if (!profExisting) return { error: true, message: 'Credenciais inválidas.' };

      const comparedPass = await bcrypt.compare(password, profExisting.password);

      if (!comparedPass) return { error: true, message: 'Credenciais inválidas.' };
      const payload = {
        name: profExisting.name,
        profId: profExisting.id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
      return { message: 'Login feito com sucesso', prof: profExisting.name, token };
    } catch (error) {
      console.log(error);
      return { message: 'Credenciais inválidas.' };
    }
  }
}
