import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import ProductDetails from '@/components/ProductDetails'
import { Wrapper } from "@/components/Wrapper";
import axios from "axios";


export async function getStaticPaths() {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        headers: {
            Authorization: `bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
        }
    })
    
    const paths = res.data?.data?.map((pdt) => ({
      params: { id: String(pdt.id) },
    }));

    // { fallback: false } means other routes should 404
    return { paths, fallback: false };
}

export async function getStaticProps(context){
    const id = context.params.id
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?filters[id][$eq]=${id}&populate=*`, 
        {
            headers: {
                Authorization: `bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}` 
            }
        }
    )

    const data = res.data.data
    return {
        props: {
            data,
        },
    }
}

export default function Products({data}){
    return (
        <Wrapper>
            <Navbar/>
            <ProductDetails pdt={data[0]} />
            <Footer/> 
        </Wrapper>
    )
}