"use client";
import Checkbox, { ButtonPrimary } from '@/components/common/Button';
import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Logo from '@/assets/Logo.png';
import Input from '@/components/input/Input';
import Image from 'next/image';
import Modal from '@/components/modals/Modal';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFirebaseAuth } from '@/lib/hooks/useFirebaseAuth';


function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const navigate = useRouter();

  // 🔥 Firebase Auth hook
  const { register, isLoading } = useFirebaseAuth();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const validatePassword = (pwd: string) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(pwd);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(
      validatePassword(newPassword)
        ? ''
        : 'Le mot de passe doit contenir au moins 6 caractères, une majuscule, un chiffre et un symbole.'
    );
    setConfirmPasswordError(
      confirmPassword && newPassword !== confirmPassword
        ? 'Les mots de passe ne correspondent pas.'
        : ''
    );
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setConfirmPasswordError(
      newConfirmPassword !== password ? 'Les mots de passe ne correspondent pas.' : ''
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!termsAccepted) {
      setModalMessage("Vous devez accepter les conditions d'utilisation !");
      setIsErrorModalOpen(true);
      return;
    }
    if (!validatePassword(password)) {
      setModalMessage("Le mot de passe n'est pas valide !");
      setIsErrorModalOpen(true);
      return;
    }
    if (password !== confirmPassword) {
      setModalMessage('Les mots de passe ne correspondent pas !');
      setIsErrorModalOpen(true);
      return;
    }

    // 🔥 Appel Firebase
    const result = await register(userName, email, password);

    if (result.success) {
      setModalMessage(result.message);
      setIsSuccessModalOpen(true);
      setTimeout(() => navigate.push('/login'), 1500);
    } else {
      setModalMessage(result.message);
      setIsErrorModalOpen(true);
    }
  };

  
  // Reset form on success
  useEffect(() => {
    if (!isSuccessModalOpen) {
      setPassword('');
      setConfirmPassword('');
      setEmail('');
      setUserName('');
      setTermsAccepted(false);
    }
  }, [isSuccessModalOpen]);

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

      <div className="flex justify-center bg-gray-100 min-h-screen w-full items-center">
        <form
          key={isSuccessModalOpen ? 'reset-form' : 'form'}
          onSubmit={handleSubmit}
          className="bg-white p-4 sm:p-6 rounded-lg shadow-2xl w-full max-w-md mx-auto"
        >
          {/* Logo */}
          <div
            onClick={() => navigate.push('/')}
            className="flex cursor-pointer justify-center mb-6 bg-gray-800 h-40 rounded shadow-xl"
          >
            <Image src={Logo} alt="Loto ERP" className="max-w-[200px] w-full" />
          </div>

          {/* Username Input */}
          <div className="mb-2">
            <p className="text-gray-500 mb-1">Name or Username</p>
            <Input
              type="text"
              placeholder="Enter your name or username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-2">
            <p className="text-gray-500 mb-1">Email</p>
            <Input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="mb-2">
            <p className="text-gray-500 mb-1">Password</p>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
              icon={
                showPassword ? (
                  <FaEye onClick={togglePasswordVisibility} className="cursor-pointer text-gray-500 text-xl" />
                ) : (
                  <FaEyeSlash onClick={togglePasswordVisibility} className="cursor-pointer text-gray-500 text-xl" />
                )
              }
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>

          {/* Confirm Password Input */}
          <div className="mb-2">
            <p className="text-gray-500 mb-1">Confirm Password</p>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              icon={
                showPassword ? (
                  <FaEye onClick={togglePasswordVisibility} className="cursor-pointer text-gray-500 text-xl" />
                ) : (
                  <FaEyeSlash onClick={togglePasswordVisibility} className="cursor-pointer text-gray-500 text-xl" />
                )
              }
            />
            {confirmPasswordError && <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>}
          </div>

          {/* Terms & Conditions */}
          <div className="mb-4 flex items-center">
            <Checkbox
              label="I accept the Terms of Service and Privacy Policy"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
            />
          </div>

          {/* Register Button */}
          <div className="mb-4">
            <ButtonPrimary className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Loading
                </div>
              ) : (
                'Create an Account'
              )}
            </ButtonPrimary>
          </div>

          {/* Login Link */}
          <div>
            <p className="text-center text-gray-500 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-[#7367f0] hover:underline">
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