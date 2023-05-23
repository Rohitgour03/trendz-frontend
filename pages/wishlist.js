import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "@/store/wishlistSlice";
import { Wrapper } from "@/components/Wrapper";

export function WishlistItem({pdt}){
    const dispatch = useDispatch()
    const url = pdt.pdt.attributes.img.data.attributes.url
    const removeWishlistHandler = (pdt) => {
        dispatch(removeFromWishlist({pdt: pdt.pdt}))
    }
    return (
        <div className="border-2 rounded mt-4 p-4 flex gap-4 w-full max-w-[450px]">
            <div className="object-cover overflow-hidden rounded">
                <Image src={url} alt="" width={60} height={80} className="w-[100%] rounded" />
            </div>
            <div className="w-full">
                <p className="text-xl font-semibold">{pdt.pdt.attributes.title}</p>
                <div className="flex  justify-between items-center gap-x-8">
                    <div className='flex items-center gap-2'>
                        <div className='text-2xl font-bold'>₹{pdt.pdt.attributes.price}</div>
                        <div className='text-sm line-through text-slate-400'>₹{pdt.pdt.attributes.oldPrice}</div>
                    </div>
                    <button 
                        className='flex items-center gap-4 px-4 py-2 cursor-pointer'
                        onClick={() => removeWishlistHandler(pdt)}>
                        <Image src='/Delete.svg' alt='' width={30} height={30} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function Wishlist(){
    const wishlistItems = useSelector(state => state.wishlist.wishlistItems)
    const items = wishlistItems.map(item => {
        console.log(item)
        return (<WishlistItem key={item.pdt.id} pdt={item} />)
    })
    
    return (
        <Wrapper>
            <Navbar/>
            <div className="flex flex-col justify-center items-center min-h-[50vh]">
                <div className="my-10 w-[90%] max-w-[1050px]">
                    <h2 className="text-2xl font-bold">Your Wishlist</h2> 
                    {
                        items.length !== 0 ? 
                            items :
                            <p>Your wishlist is empty</p> 
                    }
                </div>
            </div>
            <Footer/>
        </Wrapper>
    )
}
