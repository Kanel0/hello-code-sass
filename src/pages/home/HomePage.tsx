"use client";
import { LinkButton, LinkButtonSecondary } from '@/components/common/Button';
import { Navbar } from '@/components/Navbar/Navbar';
import React, { useState } from 'react'
import { CiUser } from 'react-icons/ci';
import Logo from "@/assets/Logo.png"
import Image from 'next/image';
import BlurText from '@/components/title/TextAnimate';
import "../../components/fonts/font.css"
import PricingSection from './Price';
import Footer from './Footer';
import ContactForm from './Contact';
import BusinessTasks from './Service';
import AboutUs from './About';

function HomePage() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const NavbarContent = (
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0 cursor-pointer">
            <Image src={Logo} alt="logo ERP" className="h-12 shadow-xl bg-gray-800  w-auto rounded-xl"/>
          </div>
  
          {/* Menu burger pour mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 hover:text-gray-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
  
          {/* Navigation desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#home" className="text-gray-800 font-[Klapt] font-semibold hover:text-gray-600 no-underline">Home</a>
            <a href="#price" className="text-gray-800 font-[Klapt] font-semibold hover:text-gray-600 no-underline">Price</a>
            <a href="#about" className="text-gray-800 font-[Klapt] font-semibold hover:text-gray-600 no-underline">About</a>
            <a href="#service" className="text-gray-800 font-[Klapt] font-semibold hover:text-gray-600 no-underline">Service</a>
            <a href="#contact" className="text-gray-800 font-[Klapt] font-semibold hover:text-gray-600 no-underline ">Contact</a>
            
          </div>
            <div className=' flex '>
                <div className='p-2 mr-4'>
                <LinkButtonSecondary   
                to={`/login`}
                className='font-semibold font-[Klapt]'
                >Sign in</LinkButtonSecondary>
                </div>
            <LinkButton className="flex items-center space-x-2 no-underline" to={'/register'}>
                        <CiUser className="text-xl no-underline" />
                        <span className='font-[Klapt]' >Get Started</span>
            </LinkButton>
            </div>
        </div>
  
        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <a href="#home" className="block text-gray-800 font-[Klapt] hover:text-gray-600">Home</a>
            <a href="#price" className="block text-gray-800 font-[Klapt] hover:text-gray-600">Price</a>
            <a href="#about" className="block text-gray-800 font-[Klapt] hover:text-gray-600">About</a>
            <a href="#service" className="block text-gray-800 font-[Klapt] hover:text-gray-600">Service</a>
            <a href="#contact" className="block text-gray-800 font-[Klapt] hover:text-gray-600">Contact</a>
            <LinkButton className="flex items-center space-x-2 w-full " to={'/register'}>
              <CiUser className="text-xl" />
              <span className='font-[Klapt]'>Get Started</span>
            </LinkButton>
          </div>
        )}
      </div>
    )
  
    return (
        <div className="min-h-screen bg-[#f6edff] ">      
        <div className="fixed top-0 left-0 right-0 bg-white/30 backdrop-blur-md h-20 md:h-20 z-40" />
        <Navbar content={NavbarContent} className="w-full p-4 md:p-8" />
      
        <main className="container mx-auto px-4 ">
          <section id='home' className="pt-32 md:pt-40 mb-96">
            <div className="flex flex-col md:flex-row items-center justify-center">
              <div className="flex flex-col">
                <BlurText
                  text="Hello is the future!"
                  delay={150}
                  animateBy="words"
                  direction="top"
                  className="text-[80px] font-[Klapt] text-center mb-4"
                />
                <BlurText
                  text="Transforming Ideas into Reality"
                  delay={150}
                  animateBy="words"
                  direction="top"
                  className="text-[40px] font-[Klapt] text-gray-700 text-center ml-12 mb-8"
                />
                <LinkButton
                  className="flex items-center ml-[260px] justify-center py-3 px-4 w-40 space-x-2 no-underline"
                  to={'/register'}
                >
                  <span className='font-[Klapt]'>Get Started</span>
                </LinkButton>
              </div>
            </div>
          </section>
          <section className=' ml-12  '>
          <AboutUs></AboutUs>
          </section>
          <section className=' ml-12  '>
          <BusinessTasks></BusinessTasks>
          </section>
          <section className=' ml-12  '>
          <ContactForm></ContactForm>
          </section>
          <section className=' ml-12  '>
          <PricingSection></PricingSection>
          </section>
          <section className=' ml-12  '>
          <Footer></Footer>
          </section>
        </main>
      </div>
      
    )
  }
  
export default HomePage


