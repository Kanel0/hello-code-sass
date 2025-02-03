"use client";
import Checkbox, { ButtonPrimary } from '@/components/common/Button';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Logo from '@/assets/Logo.png';
import Input from '@/components/input/Input';
import Image from 'next/image';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className='flex justify-center bg-gray-100 min-h-screen w-full items-center px-4 py-8'>
        <div className='bg-white p-4 sm:p-8 rounded-lg shadow-2xl w-full max-w-md mx-auto'>
          {/* Logo */}
          <div className='flex justify-center mb-6 bg-gray-800 rounded shadow-xl'>
            <Image src={Logo} alt="Loto ERP" className='max-w-[200px] w-full' />
          </div>

          {/* Email Input */}
          <div className='mb-4'>
            <p className='text-gray-500 mb-1'>Email</p>
            <Input
              type='email'
              placeholder='Enter your email'
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
          <div className='mb-6'>
            <Checkbox
              label="Remember me"
              checked
              onChange={() => {}}
            />
          </div>

          {/* Login Button */}
          <div className='mb-6'>
            <ButtonPrimary className='w-full'>
              Sign In
            </ButtonPrimary>
          </div>

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
