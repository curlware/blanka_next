import Link from "next/link";
import { siteConfig } from '../../configs/nav-data';

export default function Footer() {
    return (
        <footer className="bg-primary py-9 text-white text-center">
            <div className="mx-auto container">
                <div className="flex md:flex-row flex-col justify-center md:justify-evenly items-center w-full">
                    <p>&copy; {new Date().getFullYear()} Blanka Theme by Curlware.</p>

                    <ul className="inline-flex">
                        {siteConfig?.socialNav?.map((item) =>
                            <li key={item.title}>
                                <Link href={item?.href} className="p-2.5 hover:text-primary-foreground">{item?.title}</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </footer>
    )
}
