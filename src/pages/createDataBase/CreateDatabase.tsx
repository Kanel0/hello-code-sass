"use client";
import  { ButtonPrimary } from '@/components/common/Button';
import React, {  useState } from 'react';

import Logo from '@/assets/Logo.png';
import Input from '@/components/input/Input';
import Image from 'next/image';
import { API } from '@/constant/URL';
import Modal from '@/components/modals/Modal';
function CreateDatabase() {
    // États pour gérer les modals
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [database , setDatabase] = useState('');
    const [username , setUserName ] = useState('');
    // Add the data to the database
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!database && !username) {
          setModalMessage("Remplissez le champ obligatoire !");
          setIsErrorModalOpen(true);
          return;
        }
            
        const response = await fetch(`${API}/api/createBase`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            database: database,
            username: username
          }),
        });
        
        const responseText = await response.text();
        console.log('Réponse brute:', responseText);
        
        try {
          const data = JSON.parse(responseText); 
          if (response.ok) {
            setModalMessage("Base de donnée créé avec succès !");
            setIsSuccessModalOpen(true);
                       
           
    
    
          } else {
            setModalMessage(data.message || "Une erreur est survenue !");
            setIsErrorModalOpen(true);
          }
        } catch (error) {
          setModalMessage("Erreur lors de la connexion au serveur !");
          setIsErrorModalOpen(true);
          console.error("Erreur de parsing JSON:", error);
        }
        
      };
    return (
        <>
        {/* ✅ MODAL SUCCESS */}
        <Modal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} title="Succès">
            <p>{modalMessage}</p>
          </Modal>
    
          {/* ❌ MODAL ERROR */}
          <Modal isOpen={isErrorModalOpen} onClose={() => setIsErrorModalOpen(false)} title="Erreur">
            <p>{modalMessage}</p>
          </Modal>
          {/* Toast Container (Obligatoire pour react-hot-toast) */}
          <div className='flex justify-center bg-gray-100 min-h-screen w-full items-center'>
          <form 
              key={isSuccessModalOpen ? "reset-form" : "form"} 
              onSubmit={handleSubmit} 
              className='bg-white p-4 sm:p-6 rounded-lg shadow-2xl w-full max-w-md mx-auto'
            >
    
              {/* Logo */}
              <div className='flex justify-center mb-6 bg-gray-800 h-40 rounded shadow-xl'>
                <Image src={Logo} alt="Loto ERP" className='max-w-[200px] w-full' />
              </div>
    
              {/* Username Input */}
              <div className='mb-2'>
                <p className='text-gray-500 mb-1'>Username or name</p>
                <Input type='text' placeholder='Enter your name or username'
                value={username}
                onChange={(e)=> setUserName(e.target.value)}
                required />
              </div>
    
              <div className='mb-2'>
                <p className='text-gray-500 mb-1'>Database</p>
                <Input type='text' placeholder='Enter your database'
                value={database}
                onChange={(e)=> setDatabase(e.target.value)}
                required />
              </div>
    

              {/* Register Button */}
              <div className='mb-4'>
                <ButtonPrimary className='w-full' type="submit">
                  Create Database
                </ButtonPrimary>
              </div>
    
              {/* Login Link */}
              <div>            
              </div>
            </form>
          </div>
        </>
      );
    }
export default CreateDatabase