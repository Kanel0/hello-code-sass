import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Localisation des fichiers
  const usersFilePath = path.join(process.cwd(), 'src/models/user/user.json');
  const logFilePath = path.join(process.cwd(), 'src/logs/app.log');

  // Fonction pour enregistrer dans le fichier de log
  const logToFile = (message: string) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    
    // Ajouter au fichier log
    fs.appendFileSync(logFilePath, logMessage, 'utf8');
  };

  // Vérifier que la méthode est GET
  if (req.method === 'GET') {
    try {
      // Lire le fichier JSON des utilisateurs
      const fileData = fs.readFileSync(usersFilePath, 'utf-8');
      
      // Analyser le contenu JSON
      const users = JSON.parse(fileData);
      
      // Réponse réussie
      res.status(200).json(users);

      // Loguer l'accès réussi à l'API
      logToFile('Accès réussi à l\'API des utilisateurs.');

    } catch (error) {
      // Vérifier que l'erreur est de type Error (cela évite l'erreur TS)
      if (error instanceof Error) {
        console.error('Erreur lors de la lecture du fichier JSON:', error.message);

        // Loguer l'erreur dans le fichier log
        logToFile(`Erreur lors de la lecture du fichier JSON: ${error.message}`);

        // Répondre avec une erreur
        res.status(500).json({ message: 'Erreur lors de la lecture des données' });
      } else {
        // Si ce n'est pas une instance de Error, logguer un message générique
        console.error('Erreur inconnue lors de la lecture du fichier JSON');
        logToFile('Erreur inconnue lors de la lecture du fichier JSON');
        res.status(500).json({ message: 'Erreur inconnue' });
      }
    }
  } else {
    // Si la méthode n'est pas GET, retourner une erreur
    logToFile('Méthode non autorisée. Seul GET est autorisé.');
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
