import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';

class AuthController {
  
  async authenticate(req: Request, res: Response) {
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

    return res.json({ id: user.id, token });
   
  }

}

export default new AuthController();