'use client'

import React, { useState } from 'react';
import {redirect} from "next/navigation";

const CreateProfile = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        bio: '',
    });

    const [avatarFile, setAvatarFile] = useState<File | null>(null); // For storing the file

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAvatarFile(e.target.files[0]); // Set the file to avatarFile state
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (!formData.firstName || !formData.lastName) {
                console.log('Please enter a first and last name');
                return;
            }

            // Use FormData for multipart data
            const formDataToSend = new FormData();
            formDataToSend.append('firstName', formData.firstName);
            formDataToSend.append('lastName', formData.lastName);
            formDataToSend.append('age', formData.age);
            formDataToSend.append('bio', formData.bio);

            if (avatarFile) {
                formDataToSend.append('avatar', avatarFile); // Append the file
            }


            const res = await fetch('http://localhost:3000/api/profiles', {
                method: 'POST',

                credentials: 'include',

                body: formDataToSend,
            });

            if (res.ok) {
                console.log('Profile saved successfully');
                redirect('/profile');
            } else {
                const errorData = await res.json();
                console.log('Error:', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg my-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create Your Profile</h2>

                <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                    {/* First Name */}
                    <div className="flex flex-col">
                        <label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-2">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            onChange={handleChange}
                            value={formData.firstName}
                            required
                            className="p-3 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col">
                        <label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-2">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            onChange={handleChange}
                            value={formData.lastName}
                            required
                            className="p-3 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Age */}
                    <div className="flex flex-col">
                        <label htmlFor="age" className="text-sm font-medium text-gray-700 mb-2">
                            Age
                        </label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            onChange={handleChange}
                            value={formData.age}
                            className="p-3 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Bio Textarea */}
                    <div className="flex flex-col">
                        <label htmlFor="bio" className="text-sm font-medium text-gray-700 mb-2">
                            Bio
                        </label>
                        <textarea
                            id="bio"
                            name="bio"
                            onChange={handleChange}
                            value={formData.bio}
                            className="p-3 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>

                    {/* Avatar File Input */}
                    <div className="flex flex-col">
                        <label htmlFor="avatarUrl" className="text-sm font-medium text-gray-700 mb-2">
                            Avatar Image
                        </label>
                        <input
                            type="file"
                            id="avatarUrl"
                            name="avatarUrl"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="p-3 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Save Profile
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateProfile;