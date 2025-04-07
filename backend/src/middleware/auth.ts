import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface AuthRequest extends Request {
  user?: any;
}

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    console.log('Headers:', req.headers);
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      console.log('Token extraído:', token);
    }

    if (!token) {
      console.log('Token não fornecido');
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
      console.log('Token decodificado:', decoded);
      
      const user = await User.findById(decoded.id);
      console.log('Usuário encontrado:', user ? 'Sim' : 'Não');

      if (!user) {
        console.log('Usuário não encontrado');
        return res.status(401).json({ message: 'Token inválido - Usuário não encontrado' });
      }

      req.user = user;
      next();
    } catch (jwtError) {
      console.log('Erro ao verificar token:', jwtError);
      return res.status(401).json({ 
        message: 'Token inválido - Erro na verificação',
        error: (jwtError as Error).message 
      });
    }
  } catch (error) {
    console.error('Erro no middleware de autenticação:', error);
    return res.status(401).json({ 
      message: 'Token inválido',
      error: (error as Error).message 
    });
  }
};

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401).json({ message: 'Não autorizado - Token não fornecido' });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(401).json({ message: 'Não autorizado - Usuário não encontrado' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Não autorizado - Token inválido' });
  }
};

export const restrictTo = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ message: 'Não autorizado' });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ message: 'Acesso negado - Permissão insuficiente' });
      return;
    }

    next();
  };
}; 