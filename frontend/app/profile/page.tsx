import React from 'react';
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const Page = async () => {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll(); // Logs all cookies

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
    }
    if(res.status === 401)
    {
        redirect('/');
    }

    const data = await res.json();



    if (!data) {
        redirect('/profiles/create'); // Redirect if profile doesn't exist
    }

    return (
        <>
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg my-10">
                <img src={data.avatarUrl ? data.avatarUrl : "/default-profile.webp"} alt="avatar"
                     className="w-32 h-32 mx-auto mb-4 rounded-full"/>
                <h2 className="text-2xl text-center font-semibold text-gray-800 mb-6">{`${data.firstName} ${data.lastName}`}</h2>
                <p className="text-gray-600 text-center mb-6">Age: {data.age}</p>
                <p className="text-gray-600 text-center mb-6">{data.bio}</p>
            </div>
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg mb-10">

                <h2 className="text-2xl font-semibold text-gray-800 mb-6">{`${data.firstName}'s Posts`}</h2>

                ......
            </div>
        </>
    );
};

export default Page;