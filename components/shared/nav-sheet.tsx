'use client'

import { renderadminNavItems } from '@/app/dashboard/layout'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { AlignLeft } from 'lucide-react'

type TProps = {
  logo: string
  currentHash: string
  setCurrentHash: (hash: string) => void
  items: any[]
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export default function NavSheet({
  logo,
  items,
  side = 'left',
  currentHash,
  setCurrentHash
}: TProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline'>
          <AlignLeft />
        </Button>
      </SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>{logo}</SheetTitle>
        </SheetHeader>
        <div className='flex-1 overflow-y-auto py-5'>
          <nav className='px-3 space-y-1'>
            {renderadminNavItems(items, currentHash, setCurrentHash)}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
