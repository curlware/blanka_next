type TProps = {
    title?: string
    subtitle?: string
}

export default function SectionHeading({ title, subtitle }: TProps) {
    return (
        <div className="flex flex-col justify-center items-center space-y-10 md:space-y-12 mx-auto max-w-md md:max-w-3xl h-full text-center">
            <h1 className="bg-primary-foreground/15 px-9 py-3.5 rounded-full font-poppins font-normal text-primary-foreground text-xs uppercase tracking-[5px]">{title}</h1>
            <p className="font-poppins font-bold text-secondary-foreground text-xl md:text-2xl leading-relaxed">{subtitle}</p>
        </div>
    )
}
