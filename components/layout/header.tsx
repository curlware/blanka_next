import { SheetHeader } from '@/components/ui/sheet'
import { siteConfig } from "@/configs/nav-data"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTrigger } from "../ui/sheet"

export default function Header() {
    return (
        <header className="top-0 z-10 sticky bg-primary p-4 text-white">
            <div className="mx-auto container">
                <nav className="flex justify-between items-center">
                    <Link href='/' className="">
                        <Image src='/logo.png' alt="Logo" height={20} width={140} />
                    </Link>

                    <ul className="hidden md:flex space-x-4">
                        {siteConfig?.mainNav?.map((item) =>
                            <li>
                                <Link prefetch={false} href={item?.href} className="block px-3 py-2 text-white hover:text-primary-foreground">{item?.title}</Link>
                            </li>
                        )}
                    </ul>


                    <div className="md:hidden block">
                        <Sheet>
                            <SheetTrigger>
                                <button className="group md:hidden flex flex-col justify-center items-center gap-1.5 p-2 border border-transparent rounded-md focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 font-medium text-white text-sm cursor-pointer">
                                    <span className="bg-white w-6 h-[3px]" />
                                    <span className="bg-white -mr-5 group-hover:-mr-0 w-6 h-[3px] transition-all duration-300 ease-in-out transform" />
                                    <span className="bg-white w-6 h-[3px]" />
                                </button>
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
                                            <li>
                                                <Link prefetch={false} href={item?.href} className="block px-3 py-3.5 text-white hover:text-primary-foreground">{item?.title}</Link>
                                            </li>
                                        )}
                                        <li>
                                            <Link prefetch={false} href='/contact' className="block px-3 py-3.5 text-white hover:text-primary-foreground">Contact Us</Link>
                                        </li>
                                    </ul>
                                </SheetDescription>
                            </SheetContent>
                        </Sheet>
                    </div>


                    <Link href='/contact' >
                        <span className='block bg-[#5f1ab4] hover:bg-primary-foreground px-6 py-2 rounded-full font-bold transition-all duration-300 ease-in-out transform'>Contact Us</span>
                    </Link>
                </nav>
            </div>
        </header >
    )
}
