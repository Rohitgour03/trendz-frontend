import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import ProductList from '@/components/ProductListSection/ProductListSection'
import { FiltersCompo } from '@/components/FiltersCompo/FiltersCompo'
import { Wrapper } from '@/components/Wrapper'
import axios from 'axios'

export async function getStaticProps(){
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?filters[category][title][$eq]=men&populate=*`, {
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

export default function men({data}){
    
    return (
        <Wrapper>
            <Navbar />
                <main className='relative grid md:grid-cols-[24%_76%] min-h-screen'>
                <FiltersCompo category='men' />
                <section className='bg-white text-black'> 
                    <ProductList 
                        heading="Hello Men 👋" 
                        subheading="Browse the latest and trendy Tshirts for your unique style"
                        data={data}
                        category='men'
                    />
                </section>
            </main> 
            <Footer />
        </Wrapper>
    )
}