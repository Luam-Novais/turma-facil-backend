import jwt from 'jsonwebtoken';
export default function authProf(req, res, next) {
  const tokenHeader = req.headers.authorization
  if(tokenHeader){
    const token = tokenHeader.split(' ')[1];
    const validateToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
    try {
        if(validateToken){
            next()
        }
    } catch (error) {
        return {message: 'Ocorreu um erro! Por favor efetue login.'}
      }
    }else{
      res.status(302).json({message: 'Por favor efetue o login para ter acesso a este recurso.'})
    }
}
