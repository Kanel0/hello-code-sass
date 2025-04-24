import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// Définition des chemins des fichiers
const usersFilePath = path.join(process.cwd(), 'template/models/user/user.json');
// const databaseDir = path.join(process.cwd(), 'template', 'models');
const logFilePath = path.join(process.cwd(), 'template/logs/app.log');

// Vérifier si les fichiers et dossiers existent, sinon les créer
if (!fs.existsSync(logFilePath)) fs.writeFileSync(logFilePath, '', 'utf8');

// Fonction pour écrire dans le fichier log
const writeLog = (message: string) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage, 'utf8');
};

// Fonction pour lire les utilisateurs depuis user.json
const readUsers = () => {
  if (!fs.existsSync(usersFilePath)) return [];
  return JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
};






// Interface de l'utilisateur
interface User {
  id: string;
  username: string;
}



    
  
 

  // Fonction pour mettre à jour le fichier Routes.tsx dans le dossier src/routes
  // const updateAppRoutesFile = (userID: string) => {
  //   const userRoutesFile = path.join(
  //     databaseDir,
  //     userID,
  //     'template',
  //     'routes',
  //     'Routes.tsx'
  //   );
  
  //   const appRoutesFile = path.join(
  //     process.cwd(),
  //     'src',
  //     'routes',
  //     'Routes.tsx'
  //   );
  
  //   if (!fs.existsSync(userRoutesFile)) {
  //     writeLog(`Fichier Routes.tsx non trouvé pour ${userID}`);
  //     return;
  //   }
  
  //   fs.copyFileSync(userRoutesFile, appRoutesFile);
  //   writeLog(`Fichier Routes.tsx mis à jour pour l'utilisateur ${userID}`);
  // };
  

// Handler pour l'API
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { username } = req.query;

      if (!username) {
        writeLog('Échec: username est requis.');
        return res.status(400).json({ message: 'Username est requis' });
      }

      const users = readUsers();
      const user = users.find((u: User) => u.username === username);

      if (!user) {
        writeLog(`Utilisateur non trouvé: ${username}`);
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }



      // Loguer l'accès réussi
      writeLog(`Utilisateur trouvé et copié: ${username}`);
      return res.status(200).json(user);

    } catch (error) {
      writeLog(`Erreur lors de la lecture des utilisateurs: ${error}`);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { username, database } = req.body;
      if (!username || !database) {
        writeLog('Échec: username et database sont requis.');
        return res.status(400).json({ message: 'Username et nom de la base sont requis' });
      }

      const users = readUsers();
      const user = users.find((u: User) => u.username === username);

      if (!user) {
        writeLog(`Utilisateur non trouvé: ${username}`);
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }






      // updateAppRoutesFile(user.id);

      writeLog(`Base de données créée: ${database} pour ${username}`);
      return res.status(201).json({
        message: 'Base de données créée avec succès',
        userID: user.id,
      });

    } catch (error) {
      writeLog(`Erreur serveur: ${error}`);
      console.error('Erreur API:', error);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  } else {
    writeLog('Méthode non autorisée.');
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
