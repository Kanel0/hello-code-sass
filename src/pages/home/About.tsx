import Image from "next/image";
import React, { useEffect } from "react";
import "../../components/fonts/font.css"
import About from '@/assets/about.png'
import 'aos/dist/aos.css';
import AOS from 'aos';
const AboutUs = () => {
    
        useEffect(() => {
            AOS.init({
              duration: 3000,
              delay: 200,
              easing: 'ease-in-out',
              once: true
            });
          }, []);
  return (
    <section 
     data-aos="fade-up"
     data-aos-duration="1000"
     id="about"
     className="container mx-auto bg-white px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Section */}
        <div>
          <h2 className="text-3xl font-bold font-[Klapt] mb-4">About Us</h2>
          <p className="text-gray-600 mb-4">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim.
          </p>
          <p className="text-gray-900 font-semibold font-[Klapt]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore.
          </p>
          <p className="text-gray-500 mt-2">
            Image from <a href="https://www.freepik.com" className="text-blue-600">Freepik</a>
          </p>
          <button className="mt-6 px-6 py-2 border border-gray-800 font-[Klapt] text-gray-800 hover:bg-orange-500 hover:text-white transition">
            Book a Call
          </button>
        </div>

        {/* Right Section (Image) */}
        <div className="flex justify-center">
          <Image
            src={About}
            alt="About Us"
            width={400}
            height={400}

          />
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {[
          { id: "01", title: "Development" },
          { id: "02", title: "Design projects" },
          { id: "03", title: "New materials" },
        ].map((item) => (
          <div key={item.id} className="text-center md:text-left">
            <h3 className="text-gray-800 text-3xl font-[Klapt] font-bold">{item.id}</h3>
            <h4 className="text-xl font-semibold font-[Klapt] mt-2">{item.title}</h4>
            <p className="text-gray-600 mt-2">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;
