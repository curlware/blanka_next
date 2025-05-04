import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

type TProps = {}

export default function page({}: TProps) {
  return (
    <div>
      <div>
        <Link className='flex' href='/dashboard'>
          Dashboard <ArrowRight />
        </Link>
      </div>
    </div>
  )
}
