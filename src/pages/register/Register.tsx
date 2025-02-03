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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className='flex justify-center bg-gray-100 min-h-screen w-full items-center'>
        <div className='bg-white p-4 sm:p-6 rounded-lg shadow-2xl w-full max-w-md mx-auto'>
          {/* Logo */}
          <div className='flex justify-center mb-6 bg-gray-800 h-40 rounded shadow-xl'>
            <Image src={Logo} alt="Loto ERP" className='max-w-[200px] w-full' />
          </div>

          {/* Username Input */}
          <div className='mb-2'>
            <p className='text-gray-500 mb-1'>Name or Username</p>
            <Input
              type='text'
              placeholder='Enter your name or username'
            />
          </div>

          {/* Email Input */}
          <div className='mb-2'>
            <p className='text-gray-500 mb-1'>Email</p>
            <Input
              type='email'
              placeholder='Enter your email'
            />
          </div>

          {/* Password Input */}
          <div className='mb-2'>
            <p className='text-gray-500 mb-1'>Password</p>
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

          {/* Confirm Password Input */}
          <div className='mb-2'>
            <p className='text-gray-500 mb-1'>Confirm Password</p>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder='Confirm Password'
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

          {/* Terms & Conditions Checkbox */}
          <div className='mb-4'>
            <Checkbox          
              label="I accept the Terms of Service and Privacy Policy"
              checked
              onChange={() => {}}
            />
          </div>

          {/* Register Button */}
          <div className='mb-4'>
            <ButtonPrimary className='w-full'>
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
        </div>
      </div>
    </>
  );
}

export default Register;
