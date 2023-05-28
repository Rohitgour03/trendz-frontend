import Product from "../Product/Product"
import Image from "next/image"

export default function ProductList(props){
    const productList = props.data.map(item => {
        const url = item.attributes.img.data.attributes.url
        return (
            <Product 
                key={item.id}
                id={item.id}
                img={url}
                title={item.attributes.title}
                price={item.attributes.price} 
                oldPrice={item.attributes.oldPrice}
                isNew={item.attributes.isNew}
            />
        ) 
    })

    return (
        <div className="my-8">
            {
                props.category == 'men' &&
                <div className="w-full h-[300px] mb-8">
                    <Image src="/Hero.png" alt="" width={600} height={300} className="w-full h-full object-cover" />
                </div>
            }
            
            <div className='text-3xl font-extrabold pl-4 sm:pl-0'>{props.heading}</div>
            <div className="pl-4 sm:pl-0">{props.subheading}</div>
            {
                productList.length !== 0 ?
                    <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-y-8 my-8'>
                        {productList}
                    </div> : 
                     <div className="flex justify-center items-center min-h-[60vh]">
                        OOPs, There are no products for this category. <br />
                        You can continue shopping for other products.
                    </div>
            }
        </div>
    )
}