import React , {  ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Operator from '../../assets/contact.png';
import Image from 'next/image';
import "../../components/fonts/font.css"
import Input from '@/components/input/Input';
import 'aos/dist/aos.css';
import AOS from 'aos';

const ContactForm = () => {

    useEffect(() => {
        AOS.init({
          duration: 3000,
          delay: 200,
          easing: 'ease-in-out',
          once: true
        });
      }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    newsletter: false
  });

  const handleChange  = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
  };

  return (
    <div
     id='contact' 
     data-aos="fade-up"
     data-aos-duration="1000"
     className="bg-gray-50 py-16 px-4 shadow-lg">
       
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <div className="relative">
            
            <div className="rounded-lg overflow-hidden ">
              <Image
                src={Operator}
                alt="Customer Support"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-[Klapt] font-semibold mb-2">CONTACT</h2>
              <p className="text-gray-600 text-sm">
                Have a question or comment? Just send us a message.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <h3 className="text-lg font-[Klapt] font-medium mb-4">Send a Message</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Get the latest updates, exclusive tips, and special offers delivered directly to your inbox...
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm text-gray-600 mb-2">
                      Name
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2  focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-gray-600 mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2  focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm text-gray-600 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}                    
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center mb-6">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="newsletter" className="ml-2 text-sm text-gray-600">
                    I want to receive the newsletter
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gray-800 font-[Klapt] text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
