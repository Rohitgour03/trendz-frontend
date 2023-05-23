import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import { FiltersCompo } from '@/components/FiltersCompo/FiltersCompo'
import ProductList from '@/components/ProductListSection/ProductListSection'
import axios from 'axios'
import { Wrapper } from '@/components/Wrapper'

export async function getServerSideProps(context){

    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?filters[category][title][$eq]=men&populate=*`, {
        headers: {
            Authorization: `bearer  ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}` 
        }
    })
    
    let filtPdtData = res.data.data, filter = context.params.filter;
    if(filter === 'under 499'){
        const res1 = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?filters[category][title][$eq]=men&filters[price][$lte]=499&populate=*`, {
            headers: {
                Authorization: `bearer  ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}` 
            }
        })
        filtPdtData = res1?.data?.data
    } else if(filter === 'under 999'){
        const res2 = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?filters[category][title][$eq]=men&filters[price][$lte]=999&populate=*`, {
            headers: {
                Authorization: `bearer  ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}` 
            }
        })
        filtPdtData = res2?.data?.data
    } else if(filter === 'under 1499'){
        const res3 = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?filters[category][title][$eq]=men&filters[price][$lte]=1499&populate=*`, {
            headers: {
                Authorization: `bearer  ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}` 
            }
        })
        filtPdtData = res3?.data?.data
    } else if(filter === 'fullsleeve'){
        const res4 = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?filters[category][title][$eq]=men&filters[isFullsleeve][$eq]=true&populate=*`, {
            headers: {
                Authorization: `bearer  ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
            }
        })
        filtPdtData = res4.data.data
    } else if(filter === 'halfsleeve'){
        const res5 = await axios.get( `${process.env.NEXT_PUBLIC_API_URL}/products?filters[category][title][$eq]=men&filters[isHalfsleeve][$eq]=true&populate=*`, {
            headers: {
                Authorization: `bearer  ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
            }
        })
        console.log("I am response: ", res5.data.data)
        filtPdtData = res5?.data?.data
    } else if(filter === 'sleeveless'){
        const res6 = await axios.get( `${process.env.NEXT_PUBLIC_API_URL}/products?filters[category][title][$eq]=men&filters[isSleeveless][$eq]=true&populate=*`, {
            headers: {
                Authorization: `bearer  ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
            }
        })
        filtPdtData = res6?.data?.data
    } else if(filter === 'printed'){
        const res7 = await axios.get( `${process.env.NEXT_PUBLIC_API_URL}/products?filters[category][title][$eq]=men&filters[isPrinted][$eq]=true&populate=*`, {
            headers: {
                Authorization: `bearer  ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
            }
        })
        filtPdtData = res7?.data?.data
    } else if(filter === 'solid'){
        const res8 = await axios.get( `${process.env.NEXT_PUBLIC_API_URL}/products?filters[category][title][$eq]=men&filters[isSolid][$eq]=true&populate=*`, {
            headers: {
                Authorization: `bearer  ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
            }
        })
        filtPdtData = res8?.data?.data
    } else if(filter === 'oversize'){
        const res9 = await axios.get( `${process.env.NEXT_PUBLIC_API_URL}/products?filters[category][title][$eq]=men&filters[isOversize][$eq]=true&populate=*`, {
            headers: {
                Authorization: `bearer  ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
            }
        })
        filtPdtData = res9?.data?.data
    } else if(filter === 'fit'){
        const res10 = await axios.get( `${process.env.NEXT_PUBLIC_API_URL}/products?filters[category][title][$eq]=men&filters[isFit][$eq]=true&populate=*`, {
            headers: {
                Authorization: `bearer  ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
            }
        })
        filtPdtData = res10?.data?.data
    }

    console.log("Now i am the filterData", filtPdtData)
    return {
        props: {
            filter,
            filtPdtData,
        },
    }
}

export default function FilteredPdts({filter, filtPdtData}){
    
    const isPriceFilter = filter.includes('under') ? true : false;
    const heading = isPriceFilter ? 
                    `Tshirts ${filter} (${filtPdtData.length})` : 
                    `${filter} T-shirts (${filtPdtData.length}) `;

    return (
        <Wrapper>
            <Navbar />
                <main className='relative grid md:grid-cols-[24%_76%] min-h-screen'>
                    <FiltersCompo category='men' />
                    <section className='bg-white text-black p-8 pt-0'>
                        <ProductList 
                            heading={heading}
                            subheading=""
                            data={filtPdtData}
                        />
                    </section>
                </main> 
            <Footer />
        </Wrapper>
    )
}