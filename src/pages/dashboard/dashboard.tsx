"use client";
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Logo from '@/assets/LogoHello.png';
import { FaCog, FaCreditCard, FaInfoCircle } from 'react-icons/fa';
import Avatar from '@/assets/avatar.jpg';
import Modal from '@/components/modals/Modal';
import { BsGraphUpArrow } from 'react-icons/bs';
import { GrContact, GrLicense } from 'react-icons/gr';
import '../../components/fonts/font.css';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/lib/hooks/useAuth';
import { useFirebaseAuth } from '@/lib/hooks/useFirebaseAuth';
import { useUserProfile } from '@/lib/hooks/useUserProfile';

interface DashboardProps {
  children?: React.ReactNode;
  currentPath?: string | null;
}

function Dashboard({ children, currentPath }: DashboardProps) {
  const navigate = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  const avatarRef = React.useRef<HTMLDivElement | null>(null);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // 🔥 Firebase hooks - UNE SEULE FOIS chacun !
  const { user, loading: authLoading } = useAuth();
  const { logout } = useFirebaseAuth();
  const { profile: userProfile, loading: profileLoading } = useUserProfile();

  // Fermer le menu au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        avatarRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Rediriger si non connecté
  useEffect(() => {
    if (!authLoading && !user) {
      navigate.push('/login');
    }
  }, [user, authLoading, navigate]);

  // 🔥 Déconnexion Firebase
  const handleLogout = useCallback(async () => {
    const result = await logout();
    if (result.success) {
      setIsSuccessModalOpen(true);
      setTimeout(() => navigate.push('/login'), 1500);
    } else {
      setModalMessage(result.message);
      setIsErrorModalOpen(true);
    }
  }, [logout, navigate]);

  const menuItems = [
    { icon: BsGraphUpArrow, text: 'Diagram', path: '/dashboard' },
    { icon: GrContact, text: 'Contact', path: '/contact' },
    { icon: FaCreditCard, text: 'payment method', path: '/payment' },
    { icon: FaInfoCircle, text: 'Information', path: '/info' },
    { icon: GrLicense, text: 'Licences', path: '/licences' },
    { icon: FaCog, text: 'Parameter', path: '/parametres' },
  ];

  // Afficher un loader pendant le chargement
  if (authLoading || profileLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin h-10 w-10 rounded-full border-4 border-violet-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* ✅ MODAL SUCCESS */}
      <Modal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} title="Succès">
        <p>Déconnexion réussie !</p>
      </Modal>

      {/* ❌ MODAL ERROR */}
      <Modal isOpen={isErrorModalOpen} onClose={() => setIsErrorModalOpen(false)} title="Erreur">
        <p>{modalMessage}</p>
      </Modal>

      <aside className="w-96 bg-white shadow-lg p-4 flex flex-col justify-between min-h-screen">
        <div>
          <div className="flex items-center p-3">
            <Image src={Logo} alt="logo ERP" width={50} height={50} className="h-12 w-auto rounded shadow-xl" />
            <div className="ml-6">
              <h1 className="text-center font-[Klapt] font-bold text-5xl">MENU</h1>
            </div>
          </div>

          <nav className="mt-10">
            {menuItems.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate.push(item.path)}
                className={`flex items-center p-3 rounded-lg cursor-pointer font-[Klapt] ${
                  currentPath === item.path ? 'bg-gray-800 text-white font-bold shadow-xl' : ''
                }`}
              >
                {React.createElement(item.icon, {
                  className: `text-xl text-gray-600 mr-3 ${currentPath === item.path ? 'text-white' : ''}`,
                })}
                <span>{item.text}</span>
              </div>
            ))}
          </nav>
        </div>

        {/* Avatar + Infos utilisateur */}
        <div ref={avatarRef} onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-4 cursor-pointer">
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-violet-500 flex items-center justify-center overflow-hidden">
                <Image
                  src={userProfile?.profile || Avatar}
                  alt="User Avatar"
                  className="rounded-full w-12 h-12 object-cover"
                  width={48}
                  height={48}
                  unoptimized
                />
              </div>
              <div className="bg-green-500 h-3 w-3 rounded-full absolute bottom-0 right-0 border-2 border-white" />
            </div>
          </div>
          <div>
            <span className="text-sm font-medium">{userProfile?.username || 'Utilisateur'}</span>
            <span className="block text-xs text-gray-500">{userProfile?.email || 'Client'}</span>
          </div>
        </div>

        {/* Menu déroulant */}
        {isOpen && (
          <div ref={menuRef} className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg py-2 z-50 m-2">
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-violet-500 overflow-hidden">
                  <Image
                    src={userProfile?.profile || Avatar}
                    alt="User Avatar"
                    className="rounded-full w-12 h-12 object-cover"
                    width={48}
                    height={48}
                    unoptimized
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{userProfile?.username || 'Utilisateur'}</span>
                  <span className="text-xs text-gray-500">{userProfile?.email || 'Client'}</span>
                </div>
              </div>
            </div>

            <div className="py-1 cursor-pointer" onClick={() => navigate.push('/profile')}>
              <a className="block px-4 py-2 text-sm text-gray-700 no-underline hover:bg-gray-100 flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </a>

              <button
                onClick={handleLogout}
                className="block cursor-pointer px-4 py-2 w-80 text-sm text-gray-700 hover:bg-gray-100 no-underline flex items-center"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Log out
              </button>
            </div>
          </div>
        )}
      </aside>

      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}

export default Dashboard;