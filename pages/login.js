import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Login(){

    const { data: session } = useSession()

    return (
        <div className='flex justify-center items-center py-8 min-h-[100vh] bg-white'>
            <div className='text-black p-8 w-[90%] max-w-md'>
                <h2 className='text-xl'>Login</h2>
                <div>
                    <form action="">
                        <div className='my-2'>
                            <input 
                                type="text" 
                                name="Email" 
                                id="email" 
                                placeholder='Email'
                                className='border-2 w-full p-2 '
                            />
                        </div>
                        {/* <div className='mb-2'>
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                placeholder='Password' 
                                className='border-2 w-full p-2'
                            />
                        </div>
                        <div className='text-xs'>
                            <a href="">Forgot Password?</a>
                        </div> */}
                            <button 
                                type="submit"
                                className='mt-2 mb-8 py-4 rounded bg-[#ff4141] w-full text-white'>
                                Login via Email
                            </button>
                        </form>
                    </div>

                    <button 
                        className='flex justify-center items-center gap-2 border-2 py-4 w-full rounded'
                        onClick={() => {
                            signIn('google')
                        }}
                    >
                        <span>Log in with Google</span>
                        <Image src="/google.svg" alt="google icon" width="23" height="24" />
                    </button>

                    <div className='flex items-center gap-2 mt-4'>
                        <p className='text-xs'>Are you a new user?</p>
                        <a href="">Signup</a>
                    </div>
                </div>
            </div>
        )
    }