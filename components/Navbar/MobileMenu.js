import React from "react";
import Link from "next/link";

export default function MobileMenu({mobileMenu, setMobileMenu}){

    return (
        <div className="box-border md:hidden absolute top-[72px] left-[-5.5%] w-[111%] bg-white overflow-hidden">
            <ul className='flex py-8 px-[6%] gap-2 flex-col justify-start'>
                <li><Link 
                        href="/newArrivals"
                        onClick={() => setMobileMenu(false)}>New Arrivals</Link></li>
                <li><Link 
                        href="/men"
                        onClick={() => setMobileMenu(false)}>Men</Link></li>
                <li><Link 
                        href="/women"
                        onClick={() => setMobileMenu(false)}>Women</Link></li>
            </ul>
        </div>
    )
}