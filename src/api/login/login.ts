import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const logFilePath = path.join(process.cwd(), 'logs/app.log');
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey'; 

// Fonction pour écrire dans les logs
const writeLog = (message: string) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Error writing log:', err);
    }
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Vérification des champs
    if (!email || !password) {
      writeLog('Login failed: Missing fields');
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      // Recherche de l'utilisateur dans la base
      const user = await prisma.user_admin.findUnique({
        where: { email },
      });

      if (!user) {
        writeLog(`Login failed: User not found (${email})`);
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Vérification du mot de passe
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        writeLog(`Login failed: Incorrect password for (${email})`);
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Génération du token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '2h' } // Expiration dans 2 heures
      );

      // Authentification réussie
      writeLog(`Login successful: ${email}`);
      return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      writeLog(`Login error: ${error}`);
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    writeLog(`Invalid request method: ${req.method}`);
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
