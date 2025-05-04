import { siteContentNavItems } from '@/configs/nav-data'

export default function DashboardPage() {
  return (
    <div className='grid gap-4'>
      {siteContentNavItems
        .map((item) => item.link)
        .map((link, idx) => (
          <div key={idx} id={link} className='mb-2 bg-blue-100 w-full h-64'>
            <a href={link} className=''>
              {link}
            </a>
          </div>
        ))}
    </div>
  )
}
