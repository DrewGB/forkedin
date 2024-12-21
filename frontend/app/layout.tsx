import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Head from "next/head";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "ForkedIn",
    description: "Connect and share your professional network.",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <Head>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
                integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
            />
        </Head>
        <body className="bg-primary flex flex-col min-h-screen">
        {/* Navigation */}
        <nav className="bg-primary text-white p-4 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link className="text-xl font-semibold" href="/">
                    ForkedIn
                </Link>
                <div className="space-x-6">
                    <Link className="hover:text-accent" href="/">
                        Home
                    </Link>
                    <Link className="hover:text-accent" href="/recipes">
                        Recipes
                    </Link>
                    <Link className="hover:text-accent" href="/about">
                        About
                    </Link>
                    <Link className="hover:text-accent" href="/profile">
                        Profile
                    </Link>
                </div>
                <div>
                    <button className="bg-accent px-4 py-2 rounded-md hover:bg-yellow-600 transition">
                        Login
                    </button>
                </div>
            </div>
        </nav>

        {/* Content */}
        <main className="flex-grow bg-background">{children}</main>

        {/* Footer */}
        <footer className="bg-primary text-white p-4 shadow-md">
            <div className="container mx-auto px-6">
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">ForkedIn</h3>
                        <p className="text-sm">
                            Connect, share, and grow your professional network. <br /> Join the
                            community of innovators today.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                        <ul>
                            <li>
                                <Link href="/about" className="hover:text-gray-400">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-gray-400">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-gray-400">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-gray-400">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="text-center mt-6 text-sm">
                    <p>&copy; 2024 ForkedIn. All rights reserved.</p>
                </div>
            </div>
        </footer>
        </body>
        </html>
    );
}