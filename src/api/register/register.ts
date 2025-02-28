import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const logFilePath = path.join(process.cwd(), '../../logs/app.log'); 

// Fonction pour écrire dans le fichier log
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
    const { username, email, password } = req.body;

    // Validation simple
    if (!username || !email || !password) {
      writeLog('Validation failed: missing fields.');
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      // Création de l'utilisateur dans la base de données
      const newUser = await prisma.user_admin.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      writeLog(`User created: ${username} (${email})`);
      return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      writeLog(`Error creating user: ${error}`);
      console.error(error);
      return res.status(500).json({ message: 'Error creating user' });
    }
  } else {
    writeLog(`Invalid request method: ${req.method}`);
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
