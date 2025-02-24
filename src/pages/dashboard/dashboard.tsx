import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/assets/LogoHello.png';

import {  FaThList, FaCog } from 'react-icons/fa';
import Image from 'next/image';
import { LinkButton } from '@/components/common/Button';
import { CiUser } from 'react-icons/ci';
import { Navbar } from '@/components/Navbar/Navbar';


const menuItems = [
  { icon: FaThList, text: 'Apps', path: '/apps' },
  { icon: FaCog, text: 'Paramètres', path: '/parametres' }
];


  const NavbarContent = (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex-shrink-0">
          <Image src={Logo} alt="logo ERP" className="h-12 w-auto rounded shadow-xl" />
        </div>

   
        {/* Navigation desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <LinkButton className="flex items-center space-x-2 no-underline" to={'/login'}>
            <CiUser className="text-xl no-underline" />
            <span >Déconnexion</span>
          </LinkButton>
        </div>
      </div>

      
    </div>
  )

function Dashbord() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-6">
       <div className="fixed top-0 left-0 right-0 bg-white/30 backdrop-blur-md h-20 md:h-20 z-40" />
      <Navbar content={NavbarContent}  />
      <main className='container mx-auto px-4'>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 mt-32">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex flex-col items-center no-underline font-semibold  justify-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 space-y-2"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-purple-50 to-purple-100">
            {React.createElement(item.icon, { className: "text-xl text-gray-600" })}

            </div>
            <span className="text-sm text-gray-600 text-center">
              {item.text}
            </span>
          </Link>
        ))}
      </div>
      </main>
    </div>
  );
}

export default Dashbord



