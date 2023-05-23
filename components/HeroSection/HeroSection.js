import Image from 'next/image'
import Link from 'next/link'

export default function Hero(props) {
    return (
        <div className='relative w-full '>
            <Image 
                src="/Hero.png" 
                alt='' width={1550} height={525.42} priority
                className='h-48 w-full object-cover sm:w-full sm:h-auto' />
            <Link href="/login" className='absolute bottom-6 left-2/4 translate-x-[-50%] text-white'>
                <button className='mt-12 rounded text-lg font-semibold bg-[#ff4141] hover:bg-[#d13535] px-10 py-2 cursor-pointer transition-all duration-300 ease-out'>Shop Now</button>
            </Link>
        </div>


    )
}