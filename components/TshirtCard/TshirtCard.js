import Image from 'next/image'

export default function Card(props) {
    return (
        <div className='w-[300px] h-[400px]'>
            <a href="">
                <Image
                    src={props.imgSrc}  
                    width="400"
                    height="600"
                    alt='Men wearing T-shirt'
                    className='mt-4 hover:opacity-75 hover:scale-105 transition-all'
                />
            </a>
        </div>
    )
}