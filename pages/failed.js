import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import Link from 'next/link'
import { Wrapper } from '@/components/Wrapper'

export default function men({data}){  
    return (
        <Wrapper>
        <Navbar />
            <main className='flex justify-center items-center'>
                <div className='my-24 p-12 w-[90%] max-w-[400px] border rounded drop-shadow-sm'>
                    <h2 className='mb-2 text-xl font-bold'>Your Payment is Failed</h2>
                    <p className='mb-4'>The T-shirts you were trying to purchase is still in your cart <br/></p>
                    <Link className='text-sky-600 hover:underline' href="/">Continue shopping</Link>
                </div>
            </main> 
        <Footer />
        </Wrapper>    
    )
}