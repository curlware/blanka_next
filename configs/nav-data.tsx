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
    icon: <Image className='mr-2 w-4 h-4' />
  },
  {
    label: 'Hero',
    link: 'hero',
    icon: <LayoutGrid className='mr-2 w-4 h-4' />
  },
  {
    label: 'Services',
    link: 'services',
    icon: <Lightbulb className='mr-2 w-4 h-4' />
  },
  {
    label: 'Portfolio',
    link: 'portfolio',
    icon: <Image className='mr-2 w-4 h-4' />
  },
  {
    label: 'About',
    link: 'about',
    icon: <FileText className='mr-2 w-4 h-4' />
  },
  {
    label: 'Skills',
    link: 'skills',
    icon: <BarChart3 className='mr-2 w-4 h-4' />
  },
  {
    label: 'Clients',
    link: 'clients',
    icon: <ShoppingBag className='mr-2 w-4 h-4' />
  },
  {
    label: 'Testimonials',
    link: 'testimonials',
    icon: <MessageSquare className='mr-2 w-4 h-4' />
  },
  {
    label: 'Team',
    link: 'team',
    icon: <Users className='mr-2 w-4 h-4' />
  },
  {
    label: 'Pricing',
    link: 'pricing',
    icon: <PieChart className='mr-2 w-4 h-4' />
  },
  {
    label: 'Contact',
    link: 'contact',
    icon: <Phone className='mr-2 w-4 h-4' />
  },
  {
    label: 'Footer',
    link: 'footer',
    icon: <Settings className='mr-2 w-4 h-4' />
  }
]

export const adminNavItems = [
  {
    label: 'Go to Site',
    link: '/',
    icon: <Home className='mr-2 w-4 h-4' />
  },
  {
    label: 'Site Content',
    link: '',
    icon: <Settings className='mr-2 w-4 h-4' />,
    children: siteContentNavItems
  }
]

export const siteConfig = {
  name: 'Next.js Template',
  description: 'A simple Next.js template with Tailwind CSS and Lucide Icons.',
  mainNav: [
    {
      title: 'Home',
      href: '/'
    },
    {
      title: 'Services',
      href: '/#services'
    },
    {
      title: 'About',
      href: '/#about'
    },
    {
      title: 'Clients',
      href: '/#clients'
    },
    {
      title: 'Team',
      href: '/#team'
    },
    {
      title: 'News',
      href: '/#news'
    }
  ],
  footerNav: [
    {
      title: 'Privacy Policy',
      href: '/privacy'
    }
  ],
  socialNav: [
    {
      title: 'Facebook',
      href: 'https://www.facebook.com'
    },
    {
      title: 'Twitter',
      href: 'https://www.twitter.com'
    },
    {
      title: 'Instagram',
      href: 'https://www.instagram.com'
    },
    {
      title: 'LinkedIn',
      href: 'https://www.linkedin.com'
    }
  ]
}
