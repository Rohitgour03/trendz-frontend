import Image from 'next/image'

export default function Card(props) {
    return (
        <div className='w-[280px] h-[374px]'>
            <a href="">
                <Image
                    src={props.imgSrc}  
                    width="400"
                    height="600"
                    alt='Men wearing T-shirt'
                    className='mt-4 w-full h-full object-cover hover:opacity-75 transition-all'
                />
            </a>
        </div>
    )
}