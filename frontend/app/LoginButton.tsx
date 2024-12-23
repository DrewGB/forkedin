'use client';

import React from 'react';

// Define the type for the props
interface LoginButtonProps {
    isAuthenticated: boolean; // The prop being passed from the parent
}

const LoginButton: React.FC<LoginButtonProps> = ({ isAuthenticated }) => {
    // Logout function
    const handleLogout = async () => {
        try {
            // Call the API route to handle logout
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });

            // Reload the page to reflect the logout state
            window.location.reload();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div>
            {isAuthenticated ? (
                <button
                    onClick={handleLogout}
                    className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition"
                >
                    Logout
                </button>
            ) : (
                <a
                    href="/login" // Redirect to login page
                    className="bg-accent px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                >
                    Login
                </a>
            )}
        </div>
    );
};

export default LoginButton;