import Image from 'next/image';
import React from 'react';
import Logo from '@/assets/Logo.png';
import Title from '@/components/title/Title';
import { FcLock } from 'react-icons/fc';
import Input from '@/components/input/Input';
import { ButtonPrimary } from '@/components/common/Button';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

function ForgotPassword() {
  return (
    <>
      <div className="flex justify-center bg-gray-100 min-h-screen w-full items-center px-4 py-6 sm:py-8">
        <div className="bg-white p-4 sm:p-8 rounded-lg shadow-2xl w-full max-w-md mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-6 bg-gray-800 rounded shadow-xl">
            <Image src={Logo} alt="Loto ERP Logo" className="max-w-[200px] w-full" />
          </div>

          {/* Title */}
          <div className="flex justify-center sm:justify-start mb-2">
            <Title 
              type="h3" 
              variant="secondary" 
              className="flex items-center text-center sm:text-left"
            >
              Forgot your password?
              <FcLock className="ml-2 text-2xl sm:text-3xl" />
            </Title>
          </div>

          {/* Description */}
          <div className="text-gray-500 text-sm sm:text-base mb-6 sm:text-left">
            Enter your email, and we will send you instructions to reset your password.
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <p className="text-gray-500 mb-2 text-sm sm:text-base">Email</p>
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-full"
            />
          </div>

          {/* Button */}
          <div className="mb-8">
            <ButtonPrimary className="w-full py-2.5 text-sm sm:text-base">
              Send Reset Link
            </ButtonPrimary>
          </div>

          {/* Back to Login Link */}
          <div className="flex justify-center">
            <Link 
              to="/login" 
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
