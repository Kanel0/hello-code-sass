"use client";
import { ButtonPrimary } from '@/components/common/Button';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '@/assets/Logo.png';
import Input from '@/components/input/Input';
import Image from 'next/image';
import Modal from '@/components/modals/Modal';


function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation simple des champs
    if (!email || !password) {
      setModalMessage('Please enter both email and password');
      return;
    }

    try {
      const response = await fetch('/api/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        // Enregistrer le token JWT dans le localStorage
          localStorage.setItem('token', data.token);
        // localStorage.setItem('user', JSON.stringify({ username: data.username, email: data.email }))
        // Rediriger l'utilisateur vers la page d'accueil ou tableau de bord
        navigate('/dashboard');
      } else {
        setModalMessage(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setModalMessage('An error occurred while logging in');
    }
  };

  
  // États pour gérer les modals
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

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
      <div className='flex justify-center bg-gray-100 min-h-screen w-full items-center px-4 py-8'>
        <div className='bg-white p-4 sm:p-8 rounded-lg shadow-2xl w-full max-w-md mx-auto'>
          {/* Logo */}
          <div className='flex justify-center mb-6 bg-gray-800 rounded shadow-xl'>
            <Image src={Logo} alt="Loto ERP" className='max-w-[200px] w-full' />
          </div>
          <form onSubmit={handleLogin}>

          {/* Email Input */}
          <div className='mb-4'>
            <p className='text-gray-500 mb-1'>Email</p>
            <Input
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className='mb-6'>
            <div className='flex flex-wrap justify-between mb-1'>
              <p className='text-gray-500'>Password</p>
              
            </div>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              icon={showPassword ? (
                <FaEye 
                  onClick={togglePasswordVisibility} 
                  className="cursor-pointer text-gray-500 text-xl" 
                />
              ) : (
                <FaEyeSlash 
                  onClick={togglePasswordVisibility} 
                  className="cursor-pointer text-gray-500 text-xl" 
 
                />
              )}
            />
          </div>

          {/* Remember Me Checkbox */}

          {/* Login Button */}
          <div className='mb-6'>
            <ButtonPrimary className='w-full'>
              Sign In
            </ButtonPrimary>
          </div>
          </form>
          {/* Register Link */}
          <div>
            <p className='text-center text-gray-500 text-sm'>
              New to our platform? {' '}
              <Link to='/register' className='text-[#7367f0] hover:underline'>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
