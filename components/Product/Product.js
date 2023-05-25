import Image from 'next/image'
import Link from 'next/link'

export default function Product(props){
    return (
        <div id={props.id}>
            <Link href={`/products/${props.id}`} className='flex justify-center sm:block'>
                <div className='w-[280px]'>
                    <div className='w-[280px] h-[374px] mb-2'>
                        <Image
                            src={props.img}
                            alt={props.title}
                            width={280}
                            height={373}
                            className='w-full h-full object-cover hover:opacity-75 hover:scale-[1.02] transition-all'
                        />
                    </div>
                    <p className='truncate'>{props.title}</p>
                    <div className='flex items-center gap-4'>
                        <div className='text-xl font-bold'>₹{props.price}</div>
                        <div className='text-sm line-through text-slate-400'>₹{props.oldPrice}</div>
                    </div>
                </div>
            </Link>
        </div>
    )
}