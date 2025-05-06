'use client'

import { Blog } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'

interface BlogViewProps {
  blog: Blog
}

export default function BlogView({ blog }: BlogViewProps) {
  return (
    <div className='space-y-6'>
      {/* Featured Image */}
      {blog.image?.file && (
        <div className='relative w-full aspect-video rounded-md overflow-hidden'>
          <Image
            src={blog.image.file || '/placeholder.webp'}
            alt={blog.title}
            fill
            className='object-cover'
          />
        </div>
      )}

      {/* Blog Header */}
      <div className='space-y-2'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold'>{blog.title}</h1>
          <span className='text-sm text-muted-foreground'>
            {blog.published ? (
              <span className='px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs'>
                Published
              </span>
            ) : (
              <span className='px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs'>
                Draft
              </span>
            )}
          </span>
        </div>
        <p className='text-sm text-muted-foreground'>{formatDate(blog.createdAt)}</p>
      </div>

      {/* Blog Short Description */}
      <div className='bg-muted/40 p-4 rounded-md border italic'>
        <p>{blog.shortDescription}</p>
      </div>

      {/* Blog Content */}
      <div className='prose prose-slate max-w-none'>
        {blog.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  )
}
