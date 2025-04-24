import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

// Définir le type de l'utilisateur
interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  profile : string
}

const usersFilePath = path.join(process.cwd(), 'src/models/user/user.json');
const logFilePath = path.join(process.cwd(), 'src/logs/app.log');

// Fonction pour écrire dans le fichier log
const writeLog = (message: string) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) console.error('Error writing log:', err);
  });
};

// Lire les utilisateurs
const readUsersFromFile = (): User[] => {
  try {
    const fileData = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(fileData);
  } catch (err) {
    console.error('Error reading users file:', err);
    return [];
  }
};

// Sauvegarder les utilisateurs
const saveUsersToFile = (users: User[]) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('Error saving users to file:', err);
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    writeLog(`Méthode non autorisée: ${req.method}`);
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const { id, username, email, password , profile } = req.body;

  if (!id) {
    writeLog('Échec mise à jour: ID utilisateur manquant.');
    return res.status(400).json({ message: 'L\'ID de l\'utilisateur est requis' });
  }

  const users = readUsersFromFile();
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    writeLog(`Échec mise à jour: utilisateur non trouvé (ID: ${id})`);
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
  }

  if (username) users[userIndex].username = username;
  if (profile) users[userIndex].profile = profile;
  if (email) users[userIndex].email = email;
  if (password) users[userIndex].password = await bcrypt.hash(password, 10);

  saveUsersToFile(users);

  writeLog(`Utilisateur mis à jour: ${id}`);
  return res.status(200).json({ message: 'Utilisateur mis à jour avec succès', user: users[userIndex] });
}
