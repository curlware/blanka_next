import {
  BarChart3,
  FileText,
  Home,
  Image,
  LayoutGrid,
  Lightbulb,
  MessageSquare,
  Phone,
  PieChart,
  Settings,
  ShoppingBag,
  Users
} from 'lucide-react'

export const siteContentNavItems = [
  {
    label: 'Logo',
    link: 'logo',
    icon: <Image className='h-4 w-4 mr-2' />
  },
  {
    label: 'Hero',
    link: 'hero',
    icon: <LayoutGrid className='h-4 w-4 mr-2' />
  },
  {
    label: 'Services',
    link: 'services',
    icon: <Lightbulb className='h-4 w-4 mr-2' />
  },
  {
    label: 'Portfolio',
    link: 'portfolio',
    icon: <Image className='h-4 w-4 mr-2' />
  },
  {
    label: 'About',
    link: 'about',
    icon: <FileText className='h-4 w-4 mr-2' />
  },
  {
    label: 'Skills',
    link: 'skills',
    icon: <BarChart3 className='h-4 w-4 mr-2' />
  },
  {
    label: 'Clients',
    link: 'clients',
    icon: <ShoppingBag className='h-4 w-4 mr-2' />
  },
  {
    label: 'Testimonials',
    link: 'testimonials',
    icon: <MessageSquare className='h-4 w-4 mr-2' />
  },
  {
    label: 'Team',
    link: 'team',
    icon: <Users className='h-4 w-4 mr-2' />
  },
  {
    label: 'Pricing',
    link: 'pricing',
    icon: <PieChart className='h-4 w-4 mr-2' />
  },
  {
    label: 'Contact',
    link: 'contact',
    icon: <Phone className='h-4 w-4 mr-2' />
  },
  {
    label: 'Footer',
    link: 'footer',
    icon: <Settings className='h-4 w-4 mr-2' />
  }
]

export const adminNavItems = [
  {
    label: 'Go to Site',
    link: '/',
    icon: <Home className='h-4 w-4 mr-2' />
  },
  {
    label: 'Site Content',
    link: '',
    icon: <Settings className='h-4 w-4 mr-2' />,
    children: siteContentNavItems
  }
]
