'use client'
import { SheetHeader } from '@/components/ui/sheet'
import { siteConfig } from "@/configs/nav-data"
import { cn } from "@/lib/utils"
import { scrollToElement } from '@/utils/scrollTo'
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from 'react'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTrigger } from "../ui/sheet"

export default function Header() {
    const [currentHash, setCurrentHash] = useState('')

    useEffect(() => {
        if (window) {
            const id = window.location.hash?.substring(1) || ''
            setCurrentHash(id)
            scrollToElement(id)
        }
    }, [])
    return (
        <header className="top-0 z-10 fixed bg-primary p-4 w-full text-white">
            <div className="mx-auto container">
                <nav className="flex justify-between items-center">
                    <Link href='/' className="">
                        <Image src='/logo.png' alt="Logo" height={20} width={140} />
                    </Link>

                    <ul className="hidden md:flex space-x-4">
                        {siteConfig?.mainNav?.map((item) =>
                            <li key={item?.title}>
                                <button
                                    className="block px-3 py-2.5 text-white hover:text-secondary"
                                    onClick={() => {
                                        scrollToElement(item.title)
                                        setCurrentHash(item.title)
                                    }}
                                >
                                    {item?.title}
                                </button>
                            </li>
                        )}
                    </ul>


                    <div className="md:hidden block">
                        <Sheet>
                            <SheetTrigger>
                                <span className="group md:hidden flex flex-col justify-center items-center gap-1.5 p-2 border border-transparent rounded-md focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 font-medium text-white text-sm cursor-pointer">
                                    <span className="bg-white w-6 h-[3px]" />
                                    <span className="bg-white -mr-5 group-hover:-mr-0 w-6 h-[3px] transition-all duration-300 ease-in-out transform" />
                                    <span className="bg-white w-6 h-[3px]" />
                                </span>
                            </SheetTrigger>
                            <SheetContent className="bg-primary !border-none w-[85%] max-w-sm">
                                <SheetHeader>
                                    <SheetClose className={cn("absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background !bg-primary !z-50 transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent")}>
                                        <button className="group md:hidden flex flex-col justify-center items-center gap-1.5 p-2 rounded-md focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 font-medium text-white text-sm cursor-pointer">
                                            <span className="bg-white w-6 h-[3px]" />
                                            <span className="bg-white -ml-5 group-hover:-ml-0 w-6 h-[3px] transition-all duration-300 ease-in-out transform" />
                                            <span className="bg-white w-6 h-[3px]" />
                                        </button>
                                    </SheetClose>
                                </SheetHeader>
                                {/* Custom Close Button */}
                                <SheetDescription>
                                    <ul className="flex flex-col justify-center space-x-4 text-center">
                                        {siteConfig?.mainNav?.map((item) =>
                                            <li key={item?.title}>
                                                <Link prefetch={false} href={item?.href} className="block px-3 py-3.5 text-white hover:text-secondary">{item?.title}</Link>
                                            </li>
                                        )}
                                        <li>
                                            <Link prefetch={false} href='/contact' className="block px-3 py-3.5 text-white hover:text-secondary">Contact Us</Link>
                                        </li>
                                    </ul>
                                </SheetDescription>
                            </SheetContent>
                        </Sheet>
                    </div>


                    <button
                        className='hidden md:block bg-primary-foreground hover:bg-secondary-foreground px-6 py-2 rounded-full font-bold transition-all duration-300 ease-in-out transform'
                        onClick={() => {
                            scrollToElement('Contact')
                            setCurrentHash('Contact')
                        }}
                    >
                        Contact Us
                    </button>
                </nav>
            </div>
        </header >
    )
}
