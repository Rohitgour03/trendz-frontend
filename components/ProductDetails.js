import Image from 'next/image'
import { useState } from 'react'
import { addToCart } from "@/store/cartSlice"
import { addToWishlist, removeFromWishlist } from "@/store/wishlistSlice"
import { useSelector, useDispatch } from 'react-redux'

import { Accordion } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Product({pdt}){

    const [selectedSize, setSelectedSize] = useState('')
    const [selectedQuantity, setSelectedQuantity] = useState(1)
    const [sizeError, setSizeError] = useState(false)
    const [isWishlished, setIsWishlished] = useState(false)

    const sizesCtn = pdt.attributes.size.map(size => {
        return (
            <div 
                key={size}
                onClick={(e) => {
                    sizeHandler(e)
                    console.log(selectedSize)
                }}
                className={
                    `border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer ${size.toLowerCase() == selectedSize.toLowerCase() ? 'border-black': 'border' }`
                }
            >
                {size.toUpperCase()}
            </div>
        )
    })

    const sizeHandler = (event) => {
        setSelectedSize(event.target.textContent)
        setSizeError(false)
    }

    const cart = useSelector((state) => state.cart.value)
    const dispatch = useDispatch()
    const url = pdt.attributes.img.data.attributes.url 

    const cartHandler = () => {
        const pdtObj = {
            'id': pdt.id,
            'pricePerQuantity': pdt.attributes.price,
            'oldPricePerQuantity': pdt.attributes.oldPrice,
            ...pdt.attributes,
            'size': selectedSize,
            'quantity': selectedQuantity,    
        }

        if(selectedSize && selectedQuantity){
            dispatch(addToCart(pdtObj))
            notify()
        } else{
            if(!selectedSize){
                setSizeError(true)
            } 
        }
    }

    const addWishlistHandler = (pdt) => {
        setIsWishlished(true)
        dispatch(addToWishlist({pdt: pdt}))
    }
    
    const removeWishlistHandler = (pdt) => {
        setIsWishlished(false)
        dispatch(removeFromWishlist({pdt: pdt}))
    }

    const notify = () => {
        toast.success('Success! Your fav Tshirt added to the cart', {
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

    return (
        <main> 
            <ToastContainer />
            <div className='grid md:grid-cols-2 gap-y-8 gap-x-4 lg:mx-auto xl:px-24 py-12'>

                <div className='justify-self-center'>
                    <Image src={String(url)} alt="" width={400} height={533.33} className='cursor-pointer' />
                </div>

                <div className=''>
                    <div className=''>
                        <h2 className='text-2xl'>{pdt.attributes.title}</h2>
                        <div className='flex items-center gap-4 mt-2'>
                            <div className='text-3xl font-bold'>Rs. {pdt.attributes.price}</div>
                            <div className='text-md line-through text-slate-400'>
                                Rs. {pdt.attributes.oldPrice}
                            </div>
                        </div>
                        <p>Inclusive all the taxes</p>
                    </div>
                    
                    <div className='my-8'>
                        <div>
                            <span className='mr-8 font-semibold'>Select Size</span>
                            <a href="">Size chart</a>
                        </div>
                        <div className='grid grid-cols-4 gap-2 mt-2'>
                            {sizesCtn}
                        </div>
                        {
                            sizeError &&
                            <p className='text-red-600 font-medium text-xs'>Please select any size</p> 
                        } 
                    </div>

                    <div>
                        <span className='mr-8 font-semibold'>Quantity</span>
                        <select 
                            name="quantity" 
                            id="quantity"
                            value={selectedQuantity}
                            onChange={(e) => {
                                console.log(e.target.value)
                                const value = Number(e.target.value)
                                setSelectedQuantity(value);
                            }}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    <div className='flex flex-wrap justify-between gap-y-4 my-8'>
                        <button  
                            className={'flex w-full sm:w-auto justify-center items-center gap-4 bg-[#ff4141] border-2 text-lg border-[#ff4141]  hover:bg-[#d13535] px-8 py-2 rounded cursor-pointer transition-all duration-300 ease-out'} type={'submit'}
                            onClick={cartHandler}
                        >
                                <span>Add to Cart</span>
                                <Image src='/cartBag.svg' alt='' width={16} height={14} />
                        </button>
                        {
                            !isWishlished ? 
                                <button 
                                    className='flex text-lg w-full sm:w-auto justify-center items-center gap-4 border-2 px-8 py-2 rounded hover:border-black'
                                    onClick={() => addWishlistHandler(pdt)}>
                                    <span>Add to wishlist</span>
                                    <Image src='/wishlist.svg' alt='' width={18} height={18} />
                                </button> : 
                                <button 
                                    className='flex text-lg w-full sm:w-auto justify-center items-center gap-4 border-2 px-8 py-2 rounded hover:border-black'
                                    onClick={() => removeWishlistHandler(pdt)}>
                                    <span>Remove from wishlist</span>
                                    <Image src='/Delete.svg' alt='' width={24} height={24} />
                                </button>
                        }
                    </div>
                    
                    {/* <div>
                        <p>Delivery Details</p>
                        <input 
                            type="number"
                            className='border-2 py-2 px-4 w-full'
                            placeholder='Enter your pincode'/>
                    </div> */}

                    <div className='my-4'>
                        {/* <div className='flex justify-between items-center py-2 border-b-2'>
                            <p>Product Details</p> 
                            <Image src='/+.svg' alt='' width={8} height={18} />
                        </div>
                        <div className='flex justify-between items-center py-2 border-b-2'>
                            <p>Product Description</p> 
                            <Image src='/+.svg' alt='' width={8} height={18} />
                        </div>
                        <div className='flex justify-between items-center py-2 border-b-2'>
                            <p>Product Details</p> 
                            <Image src='/+.svg' alt='' width={8} height={18} />
                        </div> */}

                        <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                                <Typography>Product Details</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>Product Details</Typography>    
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                                <Typography>Product Description</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>Product Description</Typography>    
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
            </div>
        </main>
    );
}