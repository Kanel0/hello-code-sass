import { FC } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Image from 'next/image';
import { useNavigate } from 'react-router-dom';

const ProfilePage: FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 relative">
            {/* Bouton retour */}
            <button 
                onClick={() => navigate(-1)} 
                className="absolute top-6 left-6 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
            >
                <FaArrowLeft className="text-gray-700 text-xl" />
            </button>

            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md">
                <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-lg">
                    <div className="absolute -bottom-16 left-8">
                        <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden">
                            <Image
                                src="/placeholder-avatar.jpg"
                                alt="Profile picture"
                                width={128}
                                height={128}
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-20 pb-8 px-8">
                    <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
                    <p className="text-gray-600">Frontend Developer</p>

                    <div className="mt-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                                <p className="text-gray-900">John Alexander Doe</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                                <p className="text-gray-900">john.doe@example.com</p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-900">About</h2>
                            <p className="mt-2 text-gray-600">
                                Passionate frontend developer with expertise in React, TypeScript, and
                                modern web technologies.
                            </p>
                        </div>

                        <div className="mt-8">
                            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
