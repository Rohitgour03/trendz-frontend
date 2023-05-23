import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button/Button";

import { Accordion } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useSelector, useDispatch } from "react-redux";
import { updateCart } from "@/store/cartSlice";
import { removeFromCart } from "@/store/cartSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makePaymentRequest } from "@/utils/api";
import { useState } from "react";
import { Wrapper } from "@/components/Wrapper";

import {loadStripe} from '@stripe/stripe-js';   
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) 

export function PriceSummary({data}){

    const [loading, setLoading] = useState(false)
    const cartItems = useSelector(state => state.cart.cartItems)

    const handlePayments = async () => {
        try {
            setLoading(true)
            console.log("Handle payment function is running")
            const stripe = await stripePromise
            const res = await makePaymentRequest("/api/orders", {   
                products: cartItems
            })
            console.log(res) 
            await stripe.redirectToCheckout({
                 sessionId: res.stripeSession.id
            })
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const totalPrice = data.reduce((a, item) => {
        return a + item.price;
    }, 0)

    return (
        <div className="sticky top-24 self-start">
            <h3 className="text-xl font-semibold">Price Summary</h3>

            <div className="border-y-2 p-4 mt-4">
                <div className="flex justify-between items-center">
                    <span>Total MRP</span>
                    <span className="ml-auto">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span>GST</span>
                    <span className="ml-auto">₹30</span>
                </div>
                <div className="flex justify-between items-center">
                    <span>Shipping charges</span>
                    <span className="ml-auto">₹40</span>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <span className="font-semibold">SubTotal</span>
                    <span className="ml-auto font-semibold">₹{totalPrice+30+40}</span>
                </div>
            </div>

            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography>Apply Coupons</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>There are no coupons currently</Typography>
                </AccordionDetails>
            </Accordion>

            {/* <div className="border-b-2 py-4 flex justify-between items-center">   
                <span>Apply Coupons</span>
                <Image src="/dropdown-arrow.svg" alt="" width={20} height={20} />
            </div> */}

            <div className="flex justify-between items-center my-4">
                <div>
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-2xl font-bold ml-4"> ₹{totalPrice+30+40} </span>
                </div>
                <div>
                    <Button 
                        value="checkout"
                        imgSrc="/Checkout.svg" 
                        onClick={() => {handlePayments()}}
                        className="bg-[#ff4141] py-2 px-8 rounded text-white cursor-pointer transition-all duration-300 ease-out hover:bg-[#d13535]"
                    >
                        Checkout
                        {loading && <Image src={"./loading.svg"} alt="loading svg" width={24} height={24} />}
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default function Cart(){
    const cartItems = useSelector(state => state.cart.cartItems)
    console.log(process.env.NEXT_PUBLIC_API_URL)
    return (
        <Wrapper>
            <ToastContainer />
            <Navbar/>
            <div className='py-12 bg-white text-black'>
                <div className="mx-auto max-w-[1150px] ">
                    <h2 className="text-3xl font-bold">Your Cart</h2>
                    {
                        cartItems.length > 0 ?
                        <div className="relative grid md:grid-cols-[56%_40%] gap-y-8 gap-x-10 lg:gap-x-12 w-full my-8" >
                            <CartItems data={cartItems} />
                            <PriceSummary data={cartItems} />
                        </div> :
                        <div className="flex flex-col w-full justify-center items-center min-h-[35vh]">
                            <Image src="/empty cart.jpg" alt="Empty Cart" width={400} height={400} />
                            <p className="text-lg mb-2">OOP's Your Cart is Empty</p>
                            <Link href='/' className="text-sky-600 hover:underline"> Continue shopping </Link>
                        </div>
                    }
                </div>
                
            </div>
            <Footer/>
        </Wrapper>
    )
}



export function CartItem({itemData}){

    const dispatch = useDispatch()
    const url = itemData.img.data.attributes.url

    const [selectedQuantity, setSelectedQuantity] = useState(itemData.quantity)
    const [selectedSize, setSelectedSize] = useState(itemData.size)

    const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => {
        return <option key={num} value={num}>{num}</option>
    })
    const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXl'].map(size => {
        return <option key={size} value={size}>{size}</option>
    })

    const notify = () => {
        toast.success('Success! Cart Updated', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })
    }

    function quantityHandler(event, itemData){
        setSelectedQuantity(event.target.value)
        const payload = {
            ...itemData,
            quantity: parseInt(event.target.value),
            price: itemData.pricePerQuantity * parseInt(event.target.value),
            oldPrice: itemData.oldPricePerQuantity * parseInt(event.target.value),
        }
        dispatch(updateCart(payload))
        notify()
    }

    function sizeHandler(event, itemData){
        setSelectedSize(event.target.value)
        const payload = {
            ...itemData,
            size: event.target.value
        }
        dispatch(updateCart(payload))
        notify()
    }

    function removeHandler(itemData){
        const notify = () => {
            toast.success('Success! Item removed', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        }
        dispatch(removeFromCart(itemData))
        notify()
    }

    return (
        <div className="border-2 rounded my-4 p-4 flex gap-4 lg:gap-8 w-full max-w-[560px]">
            <div className="object-cover overflow-hidden rounded">
                <Image src={url} alt="" width={66} height={88} className="w-[100%] h-auto rounded" />
            </div>
            <div className="w-full">
                <p className="text-base lg:text-lg">{itemData.title}</p>
                <div className="flex items-center gap-8 mt-1 lg:mt-2">
                    <div className="flex items-center gap-2">
                        <span>Quantity</span>
                        <select 
                            name="quantity" 
                            id="quantity" 
                            className="border-2"
                            value={selectedQuantity}
                            onChange={(e) => quantityHandler(e, itemData)}
                        >
                            {quantityOptions}
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>Size</span>
                        <select 
                            name="size" 
                            id="size" 
                            className="border-2"
                            value={selectedSize}
                            onChange={(e) => sizeHandler(e, itemData)}
                        >
                            {sizeOptions}
                        </select>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className='flex items-center gap-4'>
                        <div className='text-2xl font-bold'>₹{itemData.price}</div>
                        <div className='text-sm line-through text-slate-400'>₹{itemData.oldPrice}</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Image 
                            src='/delete.svg' 
                            alt="delete icon" 
                            width={28} 
                            height={28}
                            onClick={() => removeHandler(itemData)}
                            className="cursor-pointer"
                        />
                        <Image 
                            src='/wishlist.svg' 
                            alt="wishlist icon" 
                            width={24} height={24}
                            className="cursor-pointer" 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export function CartItems({data}){

    const itemsCount = data.reduce((sum, item) => {
        return sum + item.quantity
    }, 0)
    const items = data.map(item => {
        return <CartItem key={item.id} itemData={item} />
    })
    return(
        <div className="">
            {
                itemsCount !== 0 ?
                <div>
                    <h3 className="text-xl font-semibold">{itemsCount} items in the cart</h3>
                    {items}
                </div> :
                 <div className="">
                    No Items in the Cart - <Link href="/" className="text-blue-500">Continue Shopping</Link>
                </div>
            }
        </div>
    )
}