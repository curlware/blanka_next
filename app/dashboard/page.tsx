import Hero from '@/components/dashboard/Hero'
import Logo from '@/components/dashboard/Logo'
import Services from '@/components/dashboard/Services'
import { Card, CardContent } from '@/components/ui/card'

export default async function DashboardPage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/get-data`, {
    next: { tags: ['data'] }
  })

  const data: ResponseData = await response.json()
  if (!data?.data) {
    return <div>No data available</div>
  }

  return (
    <div className='grid gap-4'>
      <div id='logo'>
        <Card>
          <CardContent>
            <Logo data={data.data.logo} />
          </CardContent>
        </Card>
      </div>
      <div id='hero'>
        <Card>
          <CardContent>
            <Hero data={data.data.hero} />
          </CardContent>
        </Card>
      </div>
      <div id='services'>
        <Card>
          <CardContent>
            <Services data={data.data.services} />
          </CardContent>
        </Card>
      </div>
      <div id='footer'>
        <Card>
          <CardContent>
            <p className='text-sm'>Footer content goes here...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
