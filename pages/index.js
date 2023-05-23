import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { useSession, signIn, signOut } from "next-auth/react"
import Navbar from '@/components/Navbar/Navbar'
import HeroSection from '@/components/HeroSection/HeroSection'
import FeaturedProducts from '@/components/FeaturedProducts/FeaturedProducts'
import Footer from '@/components/Footer/Footer'
import CategoriesSection from '@/components/CategoriesSection/CategoriesSection'
import axios from 'axios'
import { Wrapper } from '@/components/Wrapper'

const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps(){
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?populate=*`, 
    {
      headers: {
        Authorization: `bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
      }
    })
    const data = res.data.data
    return {
      props: {
        data,
      },
    }
}

export default function Home({data}) {

  const { data: session, status } = useSession()
  const trendingTshirts = data.filter(item => {
    item.key = item.id
    return item.attributes.isTrending === true && item.attributes.isNew !== true
  })

  const newTshirts = data.filter(item => {
    item.key = item.id
    return item.attributes.isNew === true 
  })
    
  return (
    <main className={`${inter.className}`}>
      <Wrapper>
        <Navbar />
      </Wrapper>

      <HeroSection />

      <Wrapper>
        <section>
            <div className='flex flex-col sm:flex-row gap-8 sm:gap-16 justify-center items-center my-12 sm:my-16 md:my-24 lg:my-36'>
              <div>
                <Link  href="/men">
                  <div className='flex flex-col-reverse sm:flex-col gap-4'>
                    <div className='flex gap-2 items-center rounded bg-[#ff4141] font-semibold text-lg px-6 py-2 w-fit'>
                      <span>Shop by Men </span>
                      <Image
                        src="/Upper Right Arrow.svg"
                        width="24"
                        height="24"
                        alt='Upper Right Arrow'
                      />
                    </div>

                    <Image
                        src="/oversizedMen.webp"
                        width="400"
                        height="600"
                        alt='Men wearing T-shirt'
                        className='hover:opacity-75 hover:scale-105 transition-all duration-200'
                      />
                  </div>
                </Link>
              </div>
              <div>
                <Link href="/women">
                  <Image
                    src="/Women_category.webp"
                    width="400"
                    height="600"
                    alt='Men wearing T-shirt'
                    className='mb-4 hover:opacity-75 hover:scale-105 transition-all duration-200'
                  />
                  <div className='flex gap-2 items-center rounded bg-[#ff4141] font-semibold text-lg px-6 py-2 w-fit'>
                    <span>Shop by Women</span>
                    <Image
                      src="/Upper Right Arrow.svg"
                      width="24"
                      height="24"
                      alt='Upper Right Arrow'
                    />
                  </div>
                </Link>
              </div>
            </div>
        </section>
        <CategoriesSection />
        <FeaturedProducts type="Trending Now 🔥" pdts={trendingTshirts} />
        <FeaturedProducts type="Deals you don't wanna miss ⚡" pdts={newTshirts} />
        <Footer />
      </Wrapper>
    </main>
  )
}






