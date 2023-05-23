import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import { FiltersCompo } from '@/components/FiltersCompo/FiltersCompo'
import { Wrapper } from '@/components/Wrapper'
import ProductList from '@/components/ProductListSection/ProductListSection'
import axios from 'axios'


export async function getStaticProps(){
    
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?filters[isNew][$eq]=true&populate=*`, {
        headers: {
            Authorization: `bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
        }
    })
    const data = res.data.data
    console.log(data)
    return {
        props: {
            data,
        },
    }
}


export default function newArrivals({data}){
    return (
        <Wrapper>
        <Navbar />
            <main className='relative grid md:grid-cols-[24%_76%] min-h-screen'>
            <FiltersCompo  />
            <section className='bg-white text-black'>  
                <ProductList
                    heading="Hello There 👋" 
                    subheading="Here are new trendy Tshirts for your unique charm"
                    data={data}
                />   
            </section>
        </main> 
        <Footer />
        </Wrapper>
    )
}

