import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { email, password } = body;

    try {
        // Forward the login request to your backend
        const backendRes = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        // Handle backend errors
        if (!backendRes.ok) {
            const errorData = await backendRes.json();
            return NextResponse.json(errorData, { status: backendRes.status });
        }

        // Extract the token from the backend response
        const { token } = await backendRes.json();

        // Create a response and set the cookie
        const response = NextResponse.json({ message: 'Login successful' });

        // Set the HttpOnly cookie with the token
        response.cookies.set({
            name: 'token',
            value: token,
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 3600,
            path: '/', // Ensure cookie is available globally
        });

        return response;

    } catch (error) {
        console.error('Error during login:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}