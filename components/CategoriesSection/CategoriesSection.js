import Image from "next/image"
import Link from "next/link"

const categoryTshirtData = [
    {
        key: 1,
        imgSrc: '/oversize2.webp',
        category: 'oversize'
    },
    {
        key: 2,
        imgSrc: '/FullSleeve1.webp',
        category: 'FullSleeves'
    },
    {
        key: 3,
        imgSrc: '/solid1.webp',
        category: 'solid'
    },
    {
        key: 4,
        imgSrc: '/sporty1.webp',
        category: 'sporty'
    },
    {
        key: 5,
        imgSrc: '/moonNight.webp',
        category: 'printed'
    },
    {
        key: 6,
        imgSrc: '/sleevless3.webp',
        category: 'sleevless'
    },
]

function CategoryTshirtCard(props){
    return(
      <div className='relative w-[300px] h-[400px] object-cover overflow-hidden after:absolute after:w-full after:h-1/5 after:bottom-[-18px] after:bg-gradient-to-t after:from-[hsl(0,0%,15%)] after:from-0% after:to-100% group'>
          <Image
              src={props.imgSrc}
              width="400"
              height="600"
              alt='Men wearing T-shirt'
              className='w-[100%] group-hover:opacity-75 group-hover:scale-105 transition-all duration-200'
          />
          <p className='absolute bottom-4 left-1/2 translate-x-[-50%] text-4xl font-bold text-white z-10 '>{props.category}</p>
      </div>
    )
}

const CategoryTshirts = categoryTshirtData.map(item => {
    return (
        <Link 
            key={item.key}
            className="w-fit"
            href={`/tshirts/${item.category.toLowerCase()}`}>
            <CategoryTshirtCard 
                key={item.key} 
                imgSrc={item.imgSrc} 
                category={item.category} 
            />
        </Link>
    )
})

export default function CategoriesSection(){
    return (
        <section className="bg-white w-full lg:mb-32">
            <div className='my-0 py-10 lg:py-0 text-black'>
                <h2 className='font-extrabold text-4xl my-8 text-center'>Discover by Categories</h2>
                <div 
                    className='grid sm:grid-cols-2 lg:grid-cols-3 md:px-4 xl:px-24 justify-center place-items-center gap-y-8 mb-12'>
                    {CategoryTshirts}
                </div>
            </div>
        </section>
    )
}
