import Image from 'next/image'

export default function Footer() {
    return (
        <footer className='w-full bg-white text-black border-t-[1px] border-zinc-900'>
            <div className='flex flex-col md:flex-row justify-between pt-12 pb-16'>
                <div className='my-4'>
                    <p className='text-xl font-bold mb-4'>Trendz 🔥</p>
                    <p className='text-slate-300'>@copyright trendz</p>
                </div>

                <div className='my-4'>
                    <h3 className='text-lg font-medium mb-4'>Company</h3>
                    <p className='mb-2'>About us</p>
                    <p className='mb-2'>Privacy policy</p>
                    <p className='mb-2'>Terms & condition</p>
                </div>

                <div className='my-4'>
                    <h3 className='text-lg font-medium mb-4'>Customer Servies</h3>
                    <p className='mb-2'>Track Order</p>
                    <p className='mb-2'>Return Order</p>
                    <p className='mb-2'>Cancel Order</p>
                </div>

                <div className='my-4'>
                    <h3 className='text-lg font-medium mb-4'>Company</h3>
                    <div className='flex gap-6'>
                        <Image src="/InstagramIcon.svg" alt='Instagram icon' width={24.85} height={30} />
                        <Image src="/FacebookIcon.svg" alt='Instagram icon' width={30.58} height={30} />
                        <Image src="/TwitterIcon.svg" alt='Instagram icon' width={12.88} height={30} />
                    </div>
                </div>
            </div>
        </footer>
    )
}