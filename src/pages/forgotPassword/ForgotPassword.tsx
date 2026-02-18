"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import Logo from '@/assets/Logo.png';
import Title from '@/components/title/Title';
import { FcLock } from 'react-icons/fc';
import Input from '@/components/input/Input';
import { ButtonPrimary } from '@/components/common/Button';
import { IoIosArrowBack } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Modal from '@/components/modals/Modal';
import { useFirebaseAuth } from '@/lib/hooks/useFirebaseAuth';


function ForgotPassword() {
  const navigate = useRouter();
  const [email, setEmail] = useState('');

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // 🔥 Firebase Auth hook
  const { resetPassword, isLoading } = useFirebaseAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setModalMessage('Veuillez entrer votre adresse email.');
      setIsErrorModalOpen(true);
      return;
    }

    // 🔥 Appel Firebase
    const result = await resetPassword(email);

    if (result.success) {
      setModalMessage(result.message);
      setIsSuccessModalOpen(true);
      setEmail('');
    } else {
      setModalMessage(result.message);
      setIsErrorModalOpen(true);
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

      <div className="flex justify-center bg-gray-100 min-h-screen w-full items-center px-4 py-6 sm:py-8">
        <div className="bg-white p-4 sm:p-8 rounded-lg shadow-2xl w-full max-w-md mx-auto">
          {/* Logo */}
          <div
            onClick={() => navigate.push('/')}
            className="flex cursor-pointer justify-center mb-6 bg-gray-800 rounded shadow-xl"
          >
            <Image src={Logo} alt="Loto ERP Logo" className="max-w-[200px] w-full" />
          </div>

          {/* Title */}
          <div className="flex justify-center sm:justify-start mb-2">
            <Title type="h3" variant="secondary" className="flex items-center text-center sm:text-left">
              Forgot your password?
              <FcLock className="ml-2 text-2xl sm:text-3xl" />
            </Title>
          </div>

          {/* Description */}
          <div className="text-gray-500 text-sm sm:text-base mb-6 sm:text-left">
            Enter your email, and we will send you instructions to reset your password.
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-6">
              <p className="text-gray-500 mb-2 text-sm sm:text-base">Email</p>
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Button */}
            <div className="mb-8">
              <ButtonPrimary className="w-full py-2.5 text-sm sm:text-base" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </div>
                ) : (
                  'Send Reset Link'
                )}
              </ButtonPrimary>
            </div>
          </form>

          {/* Back to Login Link */}
          <div className="flex justify-center">
            <Link
              href="/login"
              className="text-[#7367f0] text-sm sm:text-base hover:underline no-underline flex items-center transition-colors duration-200 hover:text-[#5e52e6]"
            >
              <IoIosArrowBack className="mr-2 text-xl sm:text-2xl" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;