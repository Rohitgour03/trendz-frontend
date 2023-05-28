import Image from 'next/image'
import Link from 'next/link'
import { motion } from "framer-motion"
import { BsArrowRight } from 'react-icons/bs'

export default function Hero(props) {
    return (
        <div className='relative w-full my-32 sm:text-center sm:my-48'>
            {/* <Image 
                src="/Hero.png" 
                alt='' width={1550} height={525.42} priority
                className='h-48 w-full object-cover sm:w-full sm:h-auto' />
            <Link href="/login" className='absolute bottom-6 left-2/4 translate-x-[-50%] text-white'>
                <button className='mt-12 rounded text-lg font-semibold bg-[#ff4141] hover:bg-[#d13535] px-10 py-2 cursor-pointer transition-all duration-300 ease-out'>Shop Now</button>
            </Link> */}

            <h1 className='text-4xl leading-snug font-extrabold mb-6 md:mb-8 sm:text-5xl sm:leading-tight md:text-6xl md:leading-tight xl:text-7xl xl:leading-tight'>
                <motion.div 
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1.6, ease: [0.6, 0.01, 0.05, 0.95]}}
                    className='overflow-hidden inline-block xl:block'>Elevate your style with our </motion.div>
                <motion.div 
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1.6, ease: [0.6, 0.01, 0.05, 0.95]}}
                    className='overflow-hidden inline-block xl:block'>exclusive Tshirt collection</motion.div> 
            </h1>
            <Link href="/men" className='flex items-center gap-2 w-fit bg-[#ff4141] py-2 px-4 rounded text-base font-medium sm:mx-auto md:text-lg md:py-3 md:px-8'>
                Shop Now
                <BsArrowRight />
            </Link>
        </div>
    )
}