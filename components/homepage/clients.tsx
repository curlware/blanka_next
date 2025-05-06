import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { SectionHeading } from '../common'

type TProps = {
  data: ClientsSection | undefined
}

export default function ClientSection({ data = {} }: TProps) {
  const { title, logos } = data

  if (!logos?.length) return null

  return (
    <section
      id='Clients'
      className={cn(
        'relative flex justify-center items-center py-20 md:py-30  bg-secondary-foreground/15'
      )}
    >
      <div className='space-y-16 mx-auto px-4 max-w-6xl container'>
        <SectionHeading title={title} />

        <div className='flex flex-wrap justify-center items-center gap-4 md:gap-12'>
          {logos?.map((logo, index) => (
            <Link
              key={index}
              href={logo?.link || '#'}
              target='_blank'
              rel='noopener noreferrer'
              className='flex justify-center items-center border w-fit'
            >
              <Image
                src={logo?.image?.file || ''}
                alt={`Client Logo ${index}`}
                width={180}
                height={65}
                className=''
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
