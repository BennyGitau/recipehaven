import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import banner from '../assets/imgs/singup-login.jpg';
import ProfileForm from '../components/Profile/ProfileForm';
import PersonalRecipes from '../components/Profile/PersonalRecipes';
import Settings from '../components/Profile/Settings';
import Bookmarks from '../components/Profile/Bookmarks';
import { userAuth } from '../contexts/userContext';
import axios from 'axios';

const ProfilePage = () => {
  const [component, setComponent] = useState('profileForm');
  const [activebtn, setActivebtn] = useState('Bio Information');
  const [bannerImage, setBannerImage] = useState(null);
  const fileInputRef = React.useRef(null);
  const { _user, user } = userAuth();
  console.log(_user)

  const image = localStorage.getItem('image', bannerImage);
  const userProfile = localStorage.getItem('profImage', _user?.image);
  console.log(userProfile)

  const preset_key = 'anonymous'
  const cloud_name = 'dbqwzrkvg'

  
const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) {
    console.error('No file selected.');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', preset_key);
  axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    responseType: 'text' 
  })
    .then(res => {
      console.log('Upload response:', res);
      const data = JSON.parse(res.data);  
      console.log('Image URL:', data.url);
      setBannerImage(data.url);
      localStorage.setItem('image', data.url);
    })
    .catch(err => {
      console.error('Error uploading image:', err);
    });
};

  const handleclick = (newComponent) => {
    setComponent(newComponent);
    setActivebtn(newComponent);
  };

  const getButtonClass = (buttonName) => 
    `w-[90%] ml-2 rounded-xl text-left px-4 py-2 ${activebtn === buttonName ? 'bg-orange-500 hover:bg-orange-500' : 'bg-green-500 hover:bg-orange-500'} active:bg-orange-500`;
  const handleImageClick = () => {
    fileInputRef.current.click();
  }
  return (
    <Layout>
      <section className='w-full'>
      <div className="max-w-4xl xl:max-w-[73rem] mx-auto bg-gray-100 flex flex-col items-center">
        <div className="w-full relative mb-0">
          <img
            className="w-full h-48 object-cover rounded "
            src={image}
            alt="Background"
            onClick={handleImageClick}
          />
          <input
            type="file"
            id="imageUpload"
            name="image"
            accept='image/*'
            onChange={handleImageChange}
            ref={fileInputRef}
            className="hidden"
          />
          <div 
            onClick={handleImageClick}
            className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-50 transition-opacity">
            <span className="text-white text-xl font-bold">Change Image</span>
          </div>
        </div>
        <section className="w-[90%] flex flex-col items-center">
          <div className="flex w-full h-[4rem] items-center mb-1 border-b-2 border-gray-400">
            <img
              className="relative h-[150px] w-[200px] overflow rounded-lg top-[-50px] ring-2 ring-green-500 cursor-pointer transition-transform transform hover:scale-105"
              src={userProfile || _user?.image_url}
              alt="Profile"
            />
            <div className="flex flex-row w-[85%] justify-between ml-4">
              <section className='w-auto'>
                <h2 className="text-xl font-bold capitalize">{_user?.firstname} {_user?.lastname}</h2>
                <p className="text-gray-600">{_user?.country}</p>
              </section>
              <div>
              <p className="text-sm bg-orange-500 font-bold py-1 px-4 rounded">
                Following (1.2k)
              </p>
              </div>
            </div>
          </div>
          <div className="flex w-full bg-gray-100 mt-1">
            <div className="w-1/4 bg-gray-200 shadow-md mr-6 rounded-xl">
              <div className="mt-8 flex flex-col justify-between min-h-[calc(100vh-8rem)]">
                <div className='space-y-6'>
                  <button 
                    onClick={() => handleclick('profileForm')}
                    className={getButtonClass('profileForm')}>
                    Bio Information
                  </button>
                  <button 
                    onClick={() => handleclick('Bookmarks')}
                    className={getButtonClass('Bookmarks')}>
                    Bookmarks
                  </button>
                  <button 
                    onClick={() => handleclick('followers')}
                    className={getButtonClass('followers')}>
                    Followers
                  </button>
                  <button 
                    onClick={() => handleclick('following')}
                    className={getButtonClass('following')}>
                    Following
                  </button>
                  <button
                    onClick={() => handleclick('personalRecipes')}
                    className={getButtonClass('personalRecipes')}>
                    Personal Recipes
                  </button>
                </div>
                <div className="mt-auto inset-0 opacity-0">
                  <button 
                    onClick={() => handleclick('settings')} 
                    className={getButtonClass('settings')}>
                    Settings
                  </button>
                </div>
              </div>
            </div>
            <div className="w-3/4 ">
              {component === 'profileForm' && <ProfileForm />}
              {component === 'Bookmarks' && <Bookmarks />} {/*Dear Audrey, complete bookmarks and add it here */}
              {component === 'followers' && <div>Coming soon</div>}
              {component === 'following' && <div>Coming soon</div>}
              {component === 'personalRecipes' && <PersonalRecipes />}
              {component === 'settings' && <Settings />}
            </div>
          </div>
        </section>
      </div>
      </section>
    </Layout>
  );
};

export default ProfilePage;
