"use client";
import  { ButtonPrimary } from '@/components/common/Button';
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
  const [isLoading, setIsLoading] = useState(false);
  // États pour gérer les modals
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

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
  
    setIsLoading(true);

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
        localStorage.setItem('tokenadmin', data.token);
        // Rediriger l'utilisateur vers le dashboard
        navigate('/dashboard');
        setIsLoading(false);
      } else if (response.status === 401) { 
        setIsLoading(false);
        setModalMessage('Unauthorized: Invalid email or password'); // Message spécifique pour 401
      } else {
        setIsLoading(false);
        setModalMessage(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      setModalMessage('An error occurred while logging in');
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
      <div className='flex justify-center bg-gray-100 min-h-screen w-full items-center px-4 py-8'>
        <div className='bg-white p-4 sm:p-8 rounded-lg shadow-2xl w-full max-w-md mx-auto'>
          {/* Logo */}
          <div onClick={()=> navigate('/')} className='flex cursor-pointer justify-center mb-6 bg-gray-800 rounded shadow-xl'>
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
              <Link to="/forgot-password" className='text-[#7367f0] text-sm hover:underline'>
                Forgot password?
              </Link> 
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
          {/* <div className='mb-6'>
            <Checkbox
              label="Remember me"
              checked
              onChange={() => {}}
            />
          </div> */}

          {/* Login Button */}
          <div className='mb-6'>
            <ButtonPrimary className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 
                        3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Loading
                  </div>
                ) : (
                  "Sign In"
                )}
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
