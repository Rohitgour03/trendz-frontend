import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import ProductList from "@/components/ProductListSection/ProductListSection";
import axios from "axios";
import { Wrapper } from "@/components/Wrapper";


export async function getStaticPaths() {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/subcategories`, {
        headers: {
            Authorization: `bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
        }
    })

    const paths = res?.data?.data?.map((pdt) => ({
            params: { slug: String(pdt.attributes.title) },
    }));
    // { fallback: false } means other routes should 404
    return { paths, fallback: false };
}

export async function getStaticProps(context){
    const slug = context.params.slug
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?filters[subcategories][title][$eq]=${slug}&populate=*`,
        {
            headers: {
                Authorization: `bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
            }
        }
    )

    const data = res?.data?.data
    return {
        props: {
            data,
        },
    }
}

export default function Products({data}){
    console.log(data)
    return (
        <Wrapper> 
            <Navbar/>
            <main className='relative bg-white min-h-screen'>
                {/* <FiltersCompo category='men' /> */}
                <section className='bg-white text-black p-8 mx-auto w-[95%] max-w-[1250px]'>
                    <ProductList 
                        heading="Hello Men 👋" 
                        subheading="Browse the latest and trendy Tshirts for your unique style"
                        data={data}
                    />
                </section>
            </main>
            <Footer/> 
        </Wrapper>
    )
}