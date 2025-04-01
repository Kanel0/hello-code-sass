import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Logo from '@/assets/LogoHello.png';
import { FaThList, FaCog } from 'react-icons/fa';
import { Navbar } from '@/components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import Avatar from '@/assets/avatar.jpg';
import  { JwtPayload as DefaultJwtPayload , jwtDecode} from 'jwt-decode';
import Modal from '@/components/modals/Modal';

interface User {
  username: string;
  email: string;
}
function Dashbord() {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  const avatarRef = React.useRef<HTMLDivElement | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  React.useEffect(() => {
      const handleClickOutside = (event : MouseEvent ) => {
          if (menuRef.current && 
              avatarRef.current && 
              !menuRef.current.contains(event.target as Node) && 
              !avatarRef.current.contains(event.target as Node)) {
              setIsOpen(false);
          }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, [])

  const [user, setUser] = useState<{ username: string; email: string } | null>(null);



  
  
  
  
  

  const handleLogout = useCallback(async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        localStorage.removeItem('token');
        setIsSuccessModalOpen(true);
        navigate('/login');
      } else {
        setModalMessage('Échec de la déconnexion');
        setIsErrorModalOpen(true);
      }
    } catch (error) {
      setModalMessage(`Erreur lors de la déconnexion: ${error instanceof Error ? error.message : error}`);
      setIsErrorModalOpen(true);
    }
  }, [navigate])
  
  // Define the custom type that extends JwtPayload
  interface CustomJwtPayload extends DefaultJwtPayload {
    username: string;
    email: string;
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && token.split('.').length === 3) { 
      try {
        const decoded = jwtDecode<CustomJwtPayload>(token);
        setUser({ username: decoded.username, email: decoded.email });
      } catch (error) {
        setModalMessage( `Erreur lors du décodage du token: ${error}`);
        localStorage.removeItem('token');
        handleLogout();  
      }
    } else {
      setModalMessage('Token invalide ou absent');
      handleLogout();
    }
  }, [handleLogout]);
  
  


// Fonction pour récupérer tous les utilisateurs via une requête GET
const fetchAllUsers = useCallback(async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      setModalMessage('Aucun token trouvé');
      setIsErrorModalOpen(true);
      return;
    }

    const response = await fetch('/api/users', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`, // Ajouter le token dans les headers
      },
    });

    if (response.ok) {
      const data = await response.json();
      setUsers(data); // Met à jour l'état avec la liste des utilisateurs
    } else {
      setModalMessage('Échec de la récupération des utilisateurs');
      setIsErrorModalOpen(true);
    }
  } catch (error) {
    setModalMessage(`Erreur lors de la récupération des utilisateurs: ${error}`);
    setIsErrorModalOpen(true);
  }
}, []);

useEffect(() => {
  fetchAllUsers(); 
}, [fetchAllUsers]);


 // Fonction de filtre des utilisateurs par rapport à l'email
 const filterUsers = useCallback((email: string) => {
  const filtered = users.filter((user) => user.email.includes(email));
  setFilteredUsers(filtered);
}, [users]); // Dependency on `users` array



useEffect(() => {
  if (user?.email) {
    // Appliquer le filtre lorsque l'email de l'utilisateur est défini
    filterUsers(user.email);
  }
}, [user?.email, users , filterUsers])

const NavbarContent = (
  <div className="max-w-7xl mx-auto">
    <div className="flex items-center justify-between">
      <div className="flex-shrink-0">
        <Image src={Logo} alt="logo ERP" width={50} height={50} className="h-12 w-auto rounded shadow-xl" />
      </div>
      <div 
      ref={avatarRef}
      onClick={() => setIsOpen(!isOpen)} className='hidden cursor-pointer md:flex items-center     space-x-4'>
  <div className='relative'>
      {/* Avatar avec initiales */}
      <div className='w-12 h-12 rounded-full bg-violet-500 flex items-center justify-center'>
      <Image src={Avatar} alt="User Avatar" className='rounded-full w-12 h-12 object-cover' />
      </div>
      
      {/* Indicateur de statut en ligne */}
      <div className='bg-green-500 h-3 w-3 rounded-full absolute bottom-0 right-0 border-2 border-white' />
  </div>
</div>
</div>
{/* Menu déroulant */}
{isOpen && (
      <div ref={menuRef}  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50">
        {/* En-tête du menu */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center">
            <Image src={Avatar} alt="User Avatar" className='rounded-full w-12 h-12 object-cover' />
            </div>
            <div className="flex flex-col ">
            <span className="text-sm font-medium">{filteredUsers[0]?.username || "Utilisateur"}</span>
            <span className="text-xs text-gray-500">{filteredUsers[0]?.email || "Client"}</span>
          </div>

          </div>
        </div>

        {/* Options du menu */}
        <div className="py-1 cursor-pointer" onClick={()=>navigate('/profile')}>
          <a  className="block px-4 py-2 text-sm text-gray-700 no-underline hover:bg-gray-100 flex items-center">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Mon compte
          </a>
          
          
          
            <button onClick={handleLogout} className="block cursor-pointer px-4 py-2 w-80 text-sm text-gray-700 hover:bg-gray-100 no-underline flex items-center">
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Se déconnecter
        </button>

        </div>
      </div>
    )}
</div>

);

const menuItems = [
  { icon: FaThList, text: 'Apps', path: '/apps' },
  { icon: FaCog, text: 'Paramètres', path: '/parametres' }
];



  // États pour gérer les modals
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');



  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-6">
              {/* ✅ MODAL SUCCESS */}
              <Modal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} title="Succès">
        <p>{modalMessage}</p>
      </Modal>

      {/* ❌ MODAL ERROR */}
      <Modal isOpen={isErrorModalOpen} onClose={() => setIsErrorModalOpen(false)} title="Erreur">
        <p>{modalMessage}</p>
      </Modal>
      <div className="fixed top-0 left-0 right-0 bg-white/30 backdrop-blur-md h-20 md:h-20 z-40" />
      <Navbar content={NavbarContent} />
      <main className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 mt-32">
        {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}  
              className="flex flex-col items-center no-underline font-semibold justify-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 space-y-2 cursor-pointer"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-purple-50 to-purple-100">
                {React.createElement(item.icon, { className: "text-xl text-gray-600" })}
              </div>
              <span className="text-sm text-gray-600 text-center">{item.text}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashbord;
