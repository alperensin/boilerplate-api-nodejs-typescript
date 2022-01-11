import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';

class UserController {
  
  async store(req: Request, res: Response) {
    /* Swagger properties
      #swagger.tags = ['auth/v1/users']
      #swagger.summary = 'Criação de usuário'
      #swagger.description = 'Criação de usuário através de email e senha'
      #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Criar um usuário',
        schema: { $ref: '#/definitions/CreateUser' }
      }
    */

    const repository = getRepository(User);

    const { email, password } = req.body;

    const userExists = await repository.findOne({ where: { email } });

    if (userExists) {
      return res.status(409).json({ error: 'Usuário já existe.' });
    }

    const user = repository.create({
      email,
      password
    });

    await repository.save(user);
    
    /** Swagger responses
      #swagger.responses[409] = {
        description: 'Usuário já existe',
        schema: {
          error: 'Usuário já existe.'
        }
      }
      #swagger.responses[200] = {
        description: 'Usuário criado com sucesso',
        schema: { $ref: '#/definitions/CreatedUserResponse' }
      }
    */
    return res.json({ id: user.id, email: user.email });
  }

}

export default new UserController();