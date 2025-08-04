"use client";
import  { ButtonPrimary } from '@/components/common/Button';
import React, {  useState } from 'react';

import Logo from '@/assets/Logo.png';
import Input from '@/components/input/Input';
import Image from 'next/image';
import { API } from '@/constant/URL';
import Modal from '@/components/modals/Modal';
import {  useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
function CreateDatabaseTemplate() {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    // États pour gérer les modals
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [database , setDatabase] = useState('');
    const [username , setUserName ] = useState('');
    const [email , setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
    
      // Fonction de validation du mot de passe
      const validatePassword = (pwd: string) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return regex.test(pwd);
      };

      const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const newPassword = e.target.value;
          setPassword(newPassword);
          setPasswordError(validatePassword(newPassword) ? '' : 'Le mot de passe doit contenir au moins 6 caractères, une majuscule, un chiffre et un symbole.');
          setConfirmPasswordError(confirmPassword && newPassword !== confirmPassword ? 'Les mots de passe ne correspondent pas.' : '');
        };

        const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newConfirmPassword = e.target.value;
            setConfirmPassword(newConfirmPassword);
            setConfirmPasswordError(newConfirmPassword !== password ? 'Les mots de passe ne correspondent pas.' : '');
        };

     const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!validatePassword(password)) {
          setModalMessage("Le mot de passe n'est pas valide !");
          setIsErrorModalOpen(true);
          return;
        }
        if (password !== confirmPassword) {
          setModalMessage("Les mots de passe ne correspondent pas !");
          setIsErrorModalOpen(true);
          return;
        }
    
         
        const response = await fetch(`${API}/api/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
          }),
        });
        
        const responseText = await response.text();
        console.log('Réponse brute:', responseText);
        
        try {
          const data = JSON.parse(responseText); 
          if (response.ok) {
            setModalMessage("Compte créé avec succès !");
            setIsSuccessModalOpen(true);
            navigate('/create-database')
            
    
    
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
              {/*  Email Input */}
              <div className='mb-2'>
                <p className='text-gray-500 mb-1'>Email</p>
                <Input type='text' placeholder='Enter your Email'
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                required />
              </div>
                {/* Password Input */}
          <div className='mb-2'>
            <p className='text-gray-500 mb-1'>Password</p>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              value={password}
              onChange={handlePasswordChange}
              required
              icon={showPassword ? (
                <FaEye onClick={togglePasswordVisibility} className="cursor-pointer text-gray-500 text-xl" />
              ) : (
                <FaEyeSlash onClick={togglePasswordVisibility} className="cursor-pointer text-gray-500 text-xl" />
              )}
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>

          {/* Confirm Password Input */}
          <div className='mb-2'>
            <p className='text-gray-500 mb-1'>Confirm Password</p>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              icon={showPassword ? (
                <FaEye onClick={togglePasswordVisibility} className="cursor-pointer text-gray-500 text-xl" />
              ) : (
                <FaEyeSlash onClick={togglePasswordVisibility} className="cursor-pointer text-gray-500 text-xl" />
              )}
            />
            {confirmPasswordError && <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>}
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
    
           
              <div>            
              </div>
            </form>
          </div>
        </>
      );
    }
export default CreateDatabaseTemplate