import Select from 'react-select';
import { countries } from 'countries-list';
import React, { useState, useContext, useEffect } from 'react'
// import FileUpload from './FileUpload';
import { userAuth } from '../../contexts/userContext';
import axios from 'axios';
// import Cookies from 'js-cookie';


const countryOptions = Object.keys(countries).map((code) => ({
    value: countries[code].name,
    label: countries[code].name,
}));


function ProfileForm() {
    const preset_key = 'anonymous'
    const cloud_name = 'dbqwzrkvg'
    const [profileImage, setProfileImage] = useState(null);
    const { _user, handleUserUpdate } = userAuth();
    const [uploadingImage, setUploadingImage] = useState(false);


    //   const getUser = () => {
    //   const user = Cookies.get('user');
    //   return user ? JSON.parse(user) : null;
    // };

    // const currentUser = getUser();
    const [userData, setUserData] = useState({
        firstname: _user?.firstname || '',
        lastname: _user?.lastname || '',
        email: _user?.email || '',
        address: _user?.address || '',
        gender: _user?.gender || '',
        username: _user?.username || '',
        bio: _user?.bio || '',
        image: _user?.image || '',
        country: _user?.country || '',
    });

    useEffect(() => {
        if (_user) {
            setUserData({
                firstname: _user.firstname || '',
                lastname: _user.lastname || '',
                email: _user.email || '',
                country: _user.country || '',
                address:  _user.address || '',
                gender: _user.gender || '',
                username: _user.username || '',
                bio: _user.bio || '',
                image: _user.image || '',
            });
        }
    }, [_user]);
const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password){
        if (userData.password !== userData.repeatPassword) {
            console.error('Passwords do not match');
            return;
        }
      }

    try {
        let updatedData = { ...userData };

        if (profileImage) {
            const profileImageUrl = await uploadImage(profileImage);
            updatedData.image = profileImageUrl;
            console.log(profileImageUrl);
        }

        await handleUserUpdate(updatedData); // Call the context function here
    } catch (error) {
        console.log('Failed to update profile', error);
    }
};

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (selectedOption) => {
        setUserData({ ...userData, country: selectedOption?.value || '' });
    };

    const handleProfileImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const uploadImage = async (imageFile) => {
        setUploadingImage(true);
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', preset_key);

        try {
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
                formData
            );
            console.log(res)
            setUploadingImage(false);
            return res.data.secure_url;
        } catch (err) {
            setUploadingImage(false);
            console.error('Error uploading image:', err);
            return null;
        }
    };
    const profile = localStorage.setItem('profImage', userData.image);

  return (
    <div className='bg-gray-200 p-6 rounded-lg'>
     <h2 className="text-xl  text-gray-500 font-medium mb-4">My Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 mb-2" htmlFor="firstname">
                Firstname*
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="firstname"
                type="text"
                name="firstname"
                value={userData.firstname}
                onChange={handleChange}
                placeholder="Firstname"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 mb-2" htmlFor="lastname">
                Lastname*
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lastname"
                type="text"
                name="lastname"
                value={userData.lastname}
                onChange={handleChange}
                placeholder="Lastname"
              />
            </div>
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 mb-2" htmlFor="country">
                Country*
              </label>
              <Select
                className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="country"
                options={countryOptions}
                placeholder="Select your country"
                name="country"
                value={countryOptions.find(option => option.value === userData.country)}
                onChange={handleSelectChange}
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 mb-2" htmlFor="gender">
                Gender*
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="gender"
                type="text"
                placeholder="Select your gender"
                name="gender"
                value={userData.gender}
                onChange={handleChange}
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="prefer not to say">Prefer not to say</option>
              </select> 
            </div>
          </div>
          <div className='flex space-x-4'>
          <div className="mb-4 w-1/2">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username*
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              name="username"
              value={userData?.username}
              onChange={handleChange}
              placeholder="Enter your preferred username"
            />
          </div>
          <div className="mb-4 w-1/2">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email address*
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={userData?.email}
              // onChange={handleChange}
              placeholder="Enter your email"
              disabled
            />
          </div>
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password*
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 mb-2" htmlFor="repeatPassword">
                Repeat Password*
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="repeatPassword"
                type="password"
                name="repeatPassword"
                onChange={handleChange}
                placeholder="Repeat your password"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="bio">
              Bio*
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="bio"
              placeholder="Enter your Bio Information"
              rows="3"
              name="bio"
              value={userData.bio}
              onChange={handleChange}
            />
          </div >
          <div className="mb-4 flex space-x-3 items-center">
            <fieldset className='w-1/2'>
              <label className='block text-gray-700 mb-1'>Image url</label>
              <input
              className="w-full py-2 px-3 text-gray-700"
              id="image"
              type="text"
              name="image"
              placeholder="Add image URL..."
              disabled={uploadingImage}
              value={uploadingImage ? "Uploading..." : userData.image}
              onChange={handleChange}
            />

            </fieldset>
            <fieldset className='w-1/2'>
              <label className='block text-gray-700 mb-1'>Upload Image</label>
              <input
                type='file'
                id="imageUpload"
                name="image"
                accept='image/*'
                onChange={handleProfileImageChange}
                className=""
              />
            </fieldset>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
    </div>
  )
}
export default ProfileForm
