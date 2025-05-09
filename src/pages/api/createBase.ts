import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// Définition des chemins des fichiers
const usersFilePath = path.join(process.cwd(), 'src/models/user/user.json');
const databaseDir = path.join(process.cwd(), 'database');
const logFilePath = path.join(process.cwd(), 'src/logs/app.log');

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

const copyUserData = (user: User) => {
  const userTargetPath = path.join(
    databaseDir,
    user.id,
    'template',
    'models',
    'users'
  );
  const userFile = path.join(userTargetPath, 'user.json');

  // Créer les dossiers s'ils n'existent pas
  if (!fs.existsSync(userTargetPath)) {
    fs.mkdirSync(userTargetPath, { recursive: true });
  }

  // Copier les données de l'utilisateur dans le nouveau chemin
  fs.writeFileSync(userFile, JSON.stringify(user, null, 2), 'utf8');
};


// Fonction pour récupérer les bases de données d'un utilisateur
const getUserDatabases = (userID: string) => {
  const userDatabasePath = path.join(databaseDir, userID, 'databases.json');
  if (!fs.existsSync(userDatabasePath)) return [];
  return JSON.parse(fs.readFileSync(userDatabasePath, 'utf8'));
};

// Fonction pour enregistrer la base de données d'un utilisateur
const saveDatabaseForUser = (userID: string, databaseName: string) => {
  const userDatabasePath = path.join(databaseDir, userID,  'databases.json');
  
  if (!fs.existsSync(path.join(databaseDir, userID))) {
    fs.mkdirSync(path.join(databaseDir, userID), { recursive: true });
  }

  const userDatabases = getUserDatabases(userID);

  // Vérifier si la base de données existe déjà
  if (userDatabases.some((db: { database: string }) => db.database === databaseName)) {
    return false; // Indique que la base existe déjà
  }

  // Ajouter la nouvelle base de données
  userDatabases.push({ userID: userID, database: databaseName });
  fs.writeFileSync(userDatabasePath, JSON.stringify(userDatabases, null, 2), 'utf8');
  
  return true;
};

// Interface de l'utilisateur
interface User {
  id: string;
  username: string;
}


// Fonction pour copier récursivement le dossier template
const copyTemplate = (userID: string) => {
    const templateDir = path.join(process.cwd(), 'src/template');
    const targetDir = path.join(databaseDir, userID,  'template');
  
    if (!fs.existsSync(templateDir)) {
      writeLog(`Le dossier template n'existe pas à l'emplacement : ${templateDir}`);
      return;
    }
  
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
  
    const copyRecursive = (source: string, destination: string) => {
      const entries = fs.readdirSync(source, { withFileTypes: true });
  
      for (const entry of entries) {
        const sourcePath = path.join(source, entry.name);
        const destPath = path.join(destination, entry.name);
  
        if (entry.isDirectory()) {
          if (!fs.existsSync(destPath)) {
            fs.mkdirSync(destPath, { recursive: true });
          }
          copyRecursive(sourcePath, destPath);
        } else {
          fs.copyFileSync(sourcePath, destPath);
        }
      }
    };
  
    copyRecursive(templateDir, targetDir);
    writeLog(`Template copié dans la base de données : ${targetDir}`);
  };
  
  const generateRoutesFile = (userID: string, databaseName: string) => {
    const routesDir = path.join(databaseDir, userID, 'template', 'routes');
    const routesFile = path.join(routesDir, 'Routes.tsx');
  
    const routesContent = `"use client";
  import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
  import ErrorPage from '../error/ErrorPage';
  import LoginPage from '../login/LoginPage';
  
  function RouteContent() {
      return (
          <>
          <Router>
           <Routes>
             {/* Template Route  */}
             <Route path='/${databaseName}/login' element={<LoginPage/>}></Route>
  
             {/* Error page */}
             <Route path='*' element={<ErrorPage/>}></Route>
           </Routes>
          </Router>
          </>
         );
       }
  
  export default RouteContent;
  `;
  
    if (!fs.existsSync(routesDir)) {
      fs.mkdirSync(routesDir, { recursive: true });
    }
  
    fs.writeFileSync(routesFile, routesContent, 'utf8');
    writeLog(`Fichier Routes.tsx généré dans : ${routesFile}`);
  };
  

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

      // Copier les informations de l'utilisateur dans database/{userID}/user.json
      copyUserData(user);

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

      // Vérifier si la base de données existe déjà
      if (!saveDatabaseForUser(user.id, database)) {
        writeLog(`La base de données '${database}' existe déjà pour l'utilisateur ${username}`);
        return res.status(409).json({ message: 'La base de données existe déjà' });
      }

      // Copier les informations de l'utilisateur dans database/{userID}/user.json
      copyUserData(user);

      // Copier le template dans la base créée
      copyTemplate(user.id);


      // Générer le fichier Routes.tsx avec la bonne route
      generateRoutesFile(user.id, database);


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
