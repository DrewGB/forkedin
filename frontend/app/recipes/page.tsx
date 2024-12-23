import { cookies } from 'next/headers'; // Import cookies API from next/headers
import React from 'react';
import { redirect } from 'next/navigation';

const Page = async () => {
    console.log('Fetching data...');

    // Extract cookies from the incoming request
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll(); // Logs all cookies
    console.log('Cookies from request:', allCookies);

    const cookieHeader = allCookies
        .map(({ name, value }) => `${name}=${value}`)
        .join('; '); // Generate a cookie header string (key=value)

    // Pass cookies manually in the fetch request
    const res = await fetch('http://localhost:3000/api/profiles', {
        method: 'GET',
        headers: {
            'Cookie': cookieHeader,  // Forward cookies here
        },
    });

    if (res.status === 404) {
        redirect('/profiles/create'); // Redirect to an error page if something goes wrong
    } else if (res.status === 400) {
        redirect('/');
    }

    const data = await res.json();

    if (!data) {
        redirect('/profiles/create'); // Redirect if profile doesn't exist
    }

    return (
        <div>
            <h1 className="text-3xl text-black">Recipes</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default Page;