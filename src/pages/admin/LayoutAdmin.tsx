import React , { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Logo from '@/assets/LogoHello.png';
import {  FaCog , FaCreditCard , FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Avatar from '@/assets/avatar.jpg';
import  { JwtPayload as DefaultJwtPayload , jwtDecode} from 'jwt-decode';
import Modal from '@/components/modals/Modal';
import { BsGraphUpArrow } from "react-icons/bs";
import { GrContact , GrLicense  } from "react-icons/gr";
import "../../components/fonts/font.css"
interface User {
  username: string;
  email: string;
  profile : string
}

interface DashboardProps {
  children?: React.ReactNode;
  currentPath?: string;

}
function LayoutAdmin({ children , currentPath }: DashboardProps) {
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
         localStorage.removeItem('tokenadmin');
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
     const token = localStorage.getItem('tokenadmin');
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
     const token = localStorage.getItem('tokenadmin');
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
 
  const menuItems = [
    { icon: BsGraphUpArrow, text: 'Diagram', path: '/dashboard' },
    { icon: GrContact, text: 'Contact', path: '/contact' },
    { icon: FaCreditCard, text: 'payment method', path: '/payment' },
    { icon: FaInfoCircle, text: 'Information', path: '/info' },
    { icon: GrLicense , text: 'Licences', path: '/licences' },
    { icon: FaCog, text: 'Parameter', path: '/parametres' }
  ];

    // États pour gérer les modals
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
  
  
  return (
    <div className="flex min-h-screen">
             {/* ✅ MODAL SUCCESS */}
                    <Modal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} title="Succès">
              <p>{modalMessage}</p>
            </Modal>
      
            {/* ❌ MODAL ERROR */}
            <Modal isOpen={isErrorModalOpen} onClose={() => setIsErrorModalOpen(false)} title="Erreur">
              <p>{modalMessage}</p>
            </Modal>
      <aside className="w-96 bg-white shadow-lg p-4 flex flex-col justify-between min-h-screen">
        <div >
          <div className='flex items-center p-3'>
          <Image src={Logo} alt="logo ERP" width={50} height={50} className="h-12 w-auto rounded shadow-xl" />
          <div className=' ml-6'>
           <h1 className=' text-center font-[Klapt] font-bold text-5xl '> Admin </h1>
          </div>
          </div>
          <nav className="mt-10">
            {menuItems.map((item, index) => (
              <div key={index} onClick={() => navigate(item.path)} 
              className={`flex items-center p-3 rounded-lg cursor-pointer font-[Klapt]  ${
                currentPath === item.path ? 'bg-gray-800 text-white font-bold  shadow-xl' : ''
              }`}
              >
                {React.createElement(item.icon, { className:`text-xl text-gray-600 mr-3 ${
                currentPath === item.path ? 'text-white ' : ''
              }`} )}
                <span>{item.text}</span>
              </div>
            ))}
          </nav>
        </div>
        <div ref={avatarRef} onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-4 cursor-pointer">
          <div 
               ref={avatarRef}
               onClick={() => setIsOpen(!isOpen)} className='hidden cursor-pointer md:flex items-center     space-x-4'>
           <div className='relative'>
               {/* Avatar avec initiales */}
               <div className='w-12 h-12 rounded-full bg-violet-500 flex items-center justify-center'>
               <Image
  src={filteredUsers[0]?.profile || Avatar}
  alt="User Avatar"
  className="rounded-full w-12 h-12 object-cover"
  width={48}
  height={48}
  unoptimized 
/>
               </div>
               
               {/* Indicateur de statut en ligne */}
               <div className='bg-green-500 h-3 w-3 rounded-full absolute bottom-0 right-0 border-2 border-white' />
           </div>
         </div>
          <div>
            <span className="text-sm font-medium">{filteredUsers[0]?.username || "Admin"}</span>
            <span className="block text-xs text-gray-500">{filteredUsers[0]?.email || "email@admin"}</span>
          </div>
        </div>
        {/* Menu déroulant */}
        {isOpen && (
              <div ref={menuRef}  className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg py-2 z-50 m-2 ">
                {/* En-tête du menu */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-violet-500 flex items-center justify-center">
                                        <Image
                      src={filteredUsers[0]?.profile || Avatar}
                      alt="User Avatar"
                      className="rounded-full w-12 h-12 object-cover"
                      width={48}
                      height={48}
                      unoptimized 
                    />
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
                    Profile
                  </a>
                  
                  
                  
                    <button onClick={handleLogout} className="block cursor-pointer px-4 py-2 w-80 text-sm text-gray-700 hover:bg-gray-100 no-underline flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Log out
                </button>
        
                </div>
              </div>
            )}
      </aside>
      <main className="flex-1 p-6 bg-gray-50">
            { children }
      </main>
    </div>
  );
}
export default LayoutAdmin