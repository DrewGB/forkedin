'use client'
import React, { useState } from "react";

const Create = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirm: "",
    });

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent page reload

        // Ensure passwords match
        if (formData.password !== formData.confirm) {
            console.log("Passwords do not match");
            return;
        }

        try {
            // Make a POST request
            const res = await fetch("http://localhost:5000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await res.json();

            // Handle response
            if (res.ok) {
                console.log("Successfully created user");
            } else {
                console.log("Error creating user.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <div className="bgFood min-h-screen w-auto p-6 mx-auto relative text-white flex items-center justify-center">
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>

                <div className="relative text-white z-20 flex justify-between items-start fa-align-center">
                    <div className="bg-primary p-6 m-10 w-96 rounded-2xl">
                        <h1 className="text-3xl">Create an Account</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="flex justify-between mt-5">
                                <label htmlFor="email">E-mail:</label>
                                <input
                                    className="p-0.5 text-black"
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="flex justify-between mt-5">
                                <label htmlFor="password">Password:</label>
                                <input
                                    className="p-0.5 text-black"
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="flex justify-between mt-5">
                                <label htmlFor="confirm">Confirm Password:</label>
                                <input
                                    className="p-0.5 text-black"
                                    type="password"
                                    name="confirm"
                                    id="confirm"
                                    value={formData.confirm}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="mt-7 w-full text-center bg-accent py-1 rounded-md hover:bg-yellow-600 transition"
                            >
                                Create Account
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;
