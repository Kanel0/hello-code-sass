import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import Image from 'next/image';
import AvatarDefault from '../../assets/avatar.jpg';
import Modal from '@/components/modals/Modal';
import  { JwtPayload as DefaultJwtPayload , jwtDecode} from 'jwt-decode';
import Input from '@/components/input/Input';
import { API } from '@/constant/URL';
import bcrypt from 'bcryptjs';
import { useRouter } from 'next/navigation';


interface User {
    id: string;
    username: string;
    email: string;
    profile?: string;
    password: string;
  }

const ProfilePage: FC = () => {
    const navigate = useRouter();

    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [user, setUser] = useState<{ username: string; email: string } | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null); 
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState('');
    const [imageBase64, setImageBase64] = useState<string>('');
    const [id , setId] = useState<string>(''); 
    
    // ✅ Correction : déclaration du file input
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
      fileInputRef.current?.click();
    };


    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    const [showPassword, setShowPassword] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
    
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    
      // Convertir en base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImageBase64(base64String); // ✅ on stocke ici
      };
      reader.readAsDataURL(file);
    };
    
    
      // Fonction de validation du mot de passe
  const validatePassword = (pwd: string) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(pwd);
  };

     
       const handleLogout = useCallback(async () => {
         try {
           const response = await fetch('/api/logout', {
             method: 'POST',
             credentials: 'include',
           });
     
           if (response.ok) {
             localStorage.removeItem('tokenadmin');
             setIsSuccessModalOpen(true);
             navigate.push('/login');
           } else {
             setModalMessage('Échec de la déconnexion');
             setIsErrorModalOpen(true);
           }
         } catch (error) {
           setModalMessage(`Erreur lors de la déconnexion: ${error instanceof Error ? error.message : error}`);
           setIsErrorModalOpen(true);
         }
       }, [navigate])
       
       // Define the custom type that extends JwtPayload
       interface CustomJwtPayload extends DefaultJwtPayload {
         username: string;
         email: string;
       }
     
       useEffect(() => {
         const token = localStorage.getItem('tokenadmin');
         if (token && token.split('.').length === 3) { 
           try {
             const decoded = jwtDecode<CustomJwtPayload>(token);
             setUser({ username: decoded.username, email: decoded.email });
           } catch (error) {
             setModalMessage( `Erreur lors du décodage du token: ${error}`);
             localStorage.removeItem('token');
             handleLogout();  
           }
         } else {
           setModalMessage('Token invalide ou absent');
           handleLogout();
         }
       }, [handleLogout]);
       
       
     
     
     // Fonction pour récupérer tous les utilisateurs via une requête GET
     const fetchAllUsers = useCallback(async () => {
       try {
         const token = localStorage.getItem('tokenadmin');
         if (!token) {
           setModalMessage('Aucun token trouvé');
           setIsErrorModalOpen(true);
           return;
         }
     
         const response = await fetch('/api/users', {
           method: 'GET',
           headers: {
             Authorization: `Bearer ${token}`, // Ajouter le token dans les headers
           },
         });
     
         if (response.ok) {
           const data = await response.json();
           setUsers(data); // Met à jour l'état avec la liste des utilisateurs
         } else {
           setModalMessage('Failed to retrieve users');
           setIsErrorModalOpen(true);
         }
       } catch (error) {
         setModalMessage(`Error retrieving users: ${error}`);
         setIsErrorModalOpen(true);
       }
     }, []);
     
     useEffect(() => {
       fetchAllUsers(); 
     }, [fetchAllUsers]);
     
     
      // Fonction de filtre des utilisateurs par rapport à l'email
      const filterUsers = useCallback((email: string) => {
       const filtered = users.filter((user) => user.email.includes(email));
       setFilteredUsers(filtered);
     }, [users]); // Dependency on `users` array
     
     
     
     useEffect(() => {
       if (user?.email) {
         // Appliquer le filtre lorsque l'email de l'utilisateur est défini
         filterUsers(user.email);
       }
     }, [user?.email, users , filterUsers])
     

       // États pour gérer les modals
         const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
         const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
         const [modalMessage, setModalMessage] = useState('');
          const [ModalEdit , setModalEdit] = useState(false);


            const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              const newPassword = e.target.value;
              setPassword(newPassword);
              setPasswordError(validatePassword(newPassword) ? '' : 'The password must contain at least 6 characters, one capital letter, one number and one symbol.');
              
            };
          
           
            // Add the data to the database
 
            
                const handleSubmit = async (e: React.FormEvent) => {
                  e.preventDefault();

                  let hashedPassword = '';

                  if (password.trim() !== '') {
                    if (!validatePassword(password)) {
                      setModalMessage("The password is invalid!");
                      setIsErrorModalOpen(true);
                      return;
                    }

                    
                    hashedPassword = await bcrypt.hash(password, 10);
                  }

                  const payload = {
                    id: id,
                    username: username,
                    email: email,
                    profile: imageBase64,
                    ...(hashedPassword && { password: hashedPassword }) 
                  };

                  const response = await fetch(`${API}/api/update`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                  });

                  const responseText = await response.text();
                  console.log('Réponse brute:', responseText);

                  try {
                    const data = JSON.parse(responseText);
                    if (response.ok) {
                      setModalMessage("Account edited successfully!");
                      setIsSuccessModalOpen(true);
                      setModalEdit(false);
                    } else {
                      setModalMessage(data.message || "An error has occurred!");
                      setIsErrorModalOpen(true);
                    }
                  } catch (error) {
                    setModalMessage("Error connecting to the server!");
                    setIsErrorModalOpen(true);
                    console.error("Erreur de parsing JSON:", error);
                  }
                };

          
      
            useEffect(() => {
              if (filteredUsers[0]) {
                setUsername(filteredUsers[0].username);
                setEmail(filteredUsers[0].email);
                setId(filteredUsers[0].id); 
              }
            }, [filteredUsers]);

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 relative">
                         {/* ✅ MODAL SUCCESS */}
                         <Modal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} title="Succès">
              <p>{modalMessage}</p>
            </Modal>
      
            {/* ❌ MODAL ERROR */}
            <Modal isOpen={isErrorModalOpen} onClose={() => setIsErrorModalOpen(false)} title="Erreur">
              <p>{modalMessage}</p>
            </Modal>
            {/* MODAL EDIT */}

            <Modal isOpen={ModalEdit} onClose={() => setModalEdit(false)} title="Edit Profile">
  <form 
  
  onSubmit={handleSubmit} 
  className="space-y-6  ">
    <div className="relative h-28 bg-gradient-to-r from-gray-800 to-purple-500 rounded-t-lg">
      <div className="absolute -bottom-16 left-8">
        <div
          className="w-32 h-32 rounded-full border-4 border-white overflow-hidden cursor-pointer"
          onClick={handleImageClick}
        >
          <Image
            src={imagePreview || filteredUsers[0]?.profile || AvatarDefault}
            alt="Profile picture"
            width={128}
            height={128}
            className="object-cover"
          />
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>

    {/* Full Name field */}
    <div className='pt-12'>
      <label className="text-sm font-medium  text-gray-500">Full Name</label>
      <Input
        type="text"
        value={username }
        placeholder='Full Name'
        onChange={(e) => setUsername(e.target.value)}
        className="mt-1 block w-full border rounded-md p-2"
      />
    </div>

    <div>
      <label className="text-sm font-medium text-gray-500">Email</label>
      <Input
        type="email"
        value={email}
        placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
        className="mt-1 block w-full border rounded-md p-2"
      />
    </div>

    <div>
      <label className="text-sm font-medium text-gray-500">Password</label>
      <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
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
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
    </div>

    <button
      type="submit"
      className="bg-gray-800 text-white py-2 px-4 w-full sm:w-[400px] rounded-lg hover:bg-gray-700 mx-auto block"
    >
      Save
    </button>
  </form>
</Modal>




            <button 
                onClick={() => navigate.push('/dashboard')} 
                className="absolute top-6 left-6 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
            >
                <FaArrowLeft className="text-gray-700 text-xl" />
            </button>

            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md">
                <div className="relative h-48 bg-gradient-to-r from-gray-800 to-purple-500 rounded-t-lg">
                <div className="absolute -bottom-16 left-8">
                    <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden cursor-pointer" onClick={handleImageClick}>
                        <Image
                        src={imagePreview || filteredUsers[0]?.profile || AvatarDefault}
                        alt="Profile picture"
                        width={128}
                        height={128}
                        className="object-cover"
                        />
                        
                    </div>
                    </div>

                </div>

                <div className="pt-20 pb-8 px-8">
                    <h1 className="text-2xl font-bold text-gray-900">{filteredUsers[0]?.username || "Utilisateur"}</h1>
                    

                    <div className="mt-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                                <p className="text-gray-900">{filteredUsers[0]?.username || "Utilisateur"}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                                <p className="text-gray-900">{filteredUsers[0]?.email || "Client"}</p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-900">Password</h2>
                            <p className="mt-2 text-gray-600">
                             **************************
                            </p>
                        </div>

                        <div className="mt-8">
                            <button onClick={()=> setModalEdit(true)} className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition">
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
