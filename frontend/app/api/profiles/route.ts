import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Forward the request to your backend with the token
        const backendRes = await fetch('http://localhost:5000/api/profiles', {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (backendRes.status === 404) {
            console.log('Profile doesn\'t exist sending 404');
            return NextResponse.json("Profile doesn't exist", {status: 404})
        }

        if (!backendRes.ok) {
            return NextResponse.json(null, { status: backendRes.status });
        }

        const data = await backendRes.json();
        console.log('Data: ', data);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching profiles:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    // Extract HttpOnly cookie (token)
    const cookieStore = req.cookies;
    const token = cookieStore.get('token')?.value;
    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    try {
        // Note: Request body needs to be passed as a `ReadableStream` for multipart-form-data
        const headers = {
            Authorization: `Bearer ${token}`, // Add your token
            'Content-Type': req.headers.get('content-type') || '', // Forward Content-Type
        };

        // Stream the body directly to the backend
        const backendRes = await fetch('http://localhost:5000/api/profiles', {
            method: 'POST',
            headers,
            body: req.body, // Stream the original request body
            // @ts-ignore
            duplex: 'half', // Enable streaming
        });

        // Handle errors from backend
        if (!backendRes.ok) {
            const error = await backendRes.text(); // Get error message
            return NextResponse.json({ error }, { status: backendRes.status });
        }

        // If successful, parse and return response
        const data = await backendRes.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('Error creating profile:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}