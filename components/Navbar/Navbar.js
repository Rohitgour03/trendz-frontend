import Image from 'next/image'
import Link from 'next/link'
import Button from '../Button/Button'
import { useSession, signIn, signOut } from "next-auth/react"
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

export default function Navbar(){

    const [show, setShow] = useState('translate-y-0')
    const [lastScrollY, setLastScrollY] = useState(0)

    function controlNavbar(){
        if(window.scrollY > 200){  
            if(window.scrollY > lastScrollY){
                setShow('-translate-y-[172px]')
            } else{
                setShow('translate-y-0') 
                
            }
        } else{
            setShow("translate-y-0")
        }
        setLastScrollY(window.scrollY)
    }

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar)
        return () => {
            window.removeEventListener("scroll", controlNavbar)
        }
    }, [lastScrollY])

    const cartItems = useSelector(state => state.cart.cartItems)
    const wishlistItems = useSelector(state => state.wishlist.wishlistItems)

    // const { data: session, status } = useSession()
    // let loginStatusCompo;
    // if(!session){
    //    loginStatusCompo = <button type='button' onClick={() => signIn()}>Login</button>
    //         // <Link href="/login">
    //         //     <Image src="/user.svg" alt="User icon" width={24} height={24} />
    //         // </Link>
    // } else{
    //     loginStatusCompo = <button type='button' onClick={() => signOut()}>Logout</button>
    //         // <Link href="/login">
    //         //     <Button type="button" value="Login" />
    //         // </Link>
    // }

    return (
        <header className={`w-full z-10 bg-white border-b-2 sticky top-0 transition-transform duration-300 ${show}`}>
            <nav className='flex gap-12 my-2 text-black py-4'> 
                
                <Link href="/" className='font-bold text-2xl self-center'>Trendz🔥</Link>
                <ul className='flex justify-between items-center gap-8'>
                    <li><Link href="/newArrivals">New Arrivals</Link></li>
                    <li><Link href="/men">Men</Link></li>
                    <li><Link href="/women">Women</Link></li>
                </ul>

                <ul className='flex justify-between items-center gap-8 ml-auto'>

                    {/* **************** Search Icon **************  */}
                    {/* <li><div><Image src="/search.svg" alt="Search icon" width={24} height={24}/></div></li> */}

                    <li className='relative'>
                        {
                            wishlistItems.length > 0 &&
                            <div className='absolute -top-[12px] -right-[6px] py-[1px] px-[4px] text-xs rounded bg-[#ff4141]'>
                                {wishlistItems.length}
                            </div>
                        } 
                        <Link href="/wishlist">
                            <Image src="/wishlist.svg" alt="Wishlist icon" width={24} height={24} />
                        </Link>
                    </li>
                    <li className='relative'>
                        {
                            cartItems.length > 0 &&
                            <div className='absolute -top-[12px] -right-[6px] py-[1px] px-[4px] text-xs rounded bg-[#ff4141]'>
                                {cartItems.length}
                            </div>
                        } 
                        <Link href="/cart">
                            <Image src="/cartBag.svg" alt="Cart bag icon" width={18} height={18} />
                        </Link>
                    </li>
                    {/* <li>
                        {loginStatusCompo}
                    </li> */}
                </ul>
            </nav>
        </header>
    )
}