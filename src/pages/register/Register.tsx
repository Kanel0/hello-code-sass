"use client";
import Checkbox, { ButtonPrimary } from '@/components/common/Button';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Logo from '@/assets/Logo.png';
import Input from '@/components/input/Input';
import Image from 'next/image';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

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



  // Add the data to the database
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      console.log("Vous devez accepter les conditions d'utilisation !");
      return;
    }

    if (!validatePassword(password)) {
      console.log("Le mot de passe n'est pas valide !")
      return;
    }
    if (password !== confirmPassword) {

      console.log("Les mots de passe ne correspondent pas !")
      return;
    }

      console.log("Compte créé avec succès !")
  };

  return (
    <>
      {/* Toast Container (Obligatoire pour react-hot-toast) */}
      <div className='flex justify-center bg-gray-100 min-h-screen w-full items-center'>
        <form onSubmit={handleSubmit} className='bg-white p-4 sm:p-6 rounded-lg shadow-2xl w-full max-w-md mx-auto'>
          {/* Logo */}
          <div className='flex justify-center mb-6 bg-gray-800 h-40 rounded shadow-xl'>
            <Image src={Logo} alt="Loto ERP" className='max-w-[200px] w-full' />
          </div>

          {/* Username Input */}
          <div className='mb-2'>
            <p className='text-gray-500 mb-1'>Name or Username</p>
            <Input type='text' placeholder='Enter your name or username' required />
          </div>

          {/* Email Input */}
          <div className='mb-2'>
            <p className='text-gray-500 mb-1'>Email</p>
            <Input type='email' placeholder='Enter your email' required />
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

          {/* Terms & Conditions Checkbox */}
          <div className='mb-4 flex items-center'>
            <Checkbox label="I accept the Terms of Service and Privacy Policy" checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)} />
          </div>

          {/* Register Button */}
          <div className='mb-4'>
            <ButtonPrimary className='w-full' type="submit">
              Create an Account
            </ButtonPrimary>
          </div>

          {/* Login Link */}
          <div>
            <p className='text-center text-gray-500 text-sm'>
              Already have an account? {' '}
              <Link to='/login' className='text-[#7367f0] hover:underline'>
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
