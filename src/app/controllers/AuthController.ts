import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';

class AuthController {
  
  async authenticate(req: Request, res: Response) {
    /* 
      #swagger.tags = ['auth/v1/authenticate']
      #swagger.summary = 'Autenticação do usuário'
      #swagger.description = 'Autenticação do usuário para obtenção de token através de email e senha'
      #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Autenticar um usuário',
        schema: { $ref: '#/definitions/AuthenticateUser' }
      }
    */

    const repository = getRepository(User);

    const { email, password } = req.body;

    const user = await repository.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado.' })
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Senha inválida.' })
    }

    const token = jwt.sign({ id: user.id, email: user.email }, `${process.env.JWT_SECRET}`, { expiresIn: '1d' });

    /**
      #swagger.responses[401] = {
        description: 'Usuário não encontrado \n Senha inválida',
        schema: {
          error: 'Usuário não encontrado.'
        }
      }
      #swagger.responses[200] = {
        description: 'Usuário autenticado com sucesso',
        schema: { $ref: '#/definitions/AuthenticatedUserResponse' }
      }
    */
    return res.json({ id: user.id, token });
   
  }

}

export default new AuthController();