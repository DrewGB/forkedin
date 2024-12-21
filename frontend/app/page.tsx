import Link from "next/link";

export default function Home() {
    return (
        <div>
            <div className="bgFood min-h-screen w-auto p-6 mx-auto relative text-white flex items-center justify-center">
                {/* Background darkening cover */}
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>

                {/* Content goes here */}
                <div className="relative text-white z-20 flex justify-between items-start fa-align-center">
                    <div className="bg-primary p-6 m-10 w-80 rounded-2xl">
                        <h1 className="text-4xl">Welcome to ForkedIn</h1>
                        <br/>
                        <p>Create recipes and share them with all your friends in one place!</p>
                        <br/>
                        <p>Login or create a new account today!</p>
                    </div>
                    <div className="bg-primary p-6 m-10 w-80 rounded-2xl">
                        <h1 className="text-3xl">Sign In</h1>
                        <form action="">
                            <div className="flex justify-between mt-5">
                                <label htmlFor="email">E-mail:</label>
                                <input className="p-0.5 text-black" type="email" name="email" id="email" required/>
                            </div>

                            <div className="flex justify-between mt-5">
                                <label htmlFor="password">Password:</label>
                                <input className="p-0.5 text-black" type="password" name="password" id="password" required/>
                            </div>

                            <button className="mt-7 w-full text-center bg-accent  py-1 rounded-md hover:bg-yellow-600 transition">Login</button>
                        </form>
                        <br/>
                        <Link className="hover:text-accent" href="/reset">Forgot your password?</Link>
                        <Link href="/users/create" className="block mt-7 w-full text-center bg-accent  py-1 rounded-md hover:bg-yellow-600 transition">Create an Account</Link>

                    </div>
                </div>
            </div>
        </div>
    );
}
