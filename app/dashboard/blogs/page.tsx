'use client'

import { deleteBlog, getBlogs, toggleBlogPublishStatus } from '@/actions/blogs'
import BlogForm from '@/components/others/blog-form'
import BlogView from '@/components/others/blog-view'
import { DataTable } from '@/components/shared/data-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { Blog } from '@/lib/types'
import { Edit, Eye, PlusCircle, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)

  const loadBlogs = async () => {
    setIsLoading(true)
    try {
      const result = await getBlogs(1, 100)
      if (result.success) {
        setBlogs(result.blogs || [])
      } else {
        console.error('Failed to load blogs:', result.error)
      }
    } catch (error) {
      console.error('Error loading blogs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadBlogs()
  }, [])

  const handleDelete = async (blogId: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        const result = await deleteBlog(blogId)
        if (result.success) {
          loadBlogs() // Reload blogs after deletion
        } else {
          alert(result.error || 'Failed to delete blog post')
        }
      } catch (error) {
        console.error('Error deleting blog post:', error)
        alert('An error occurred while deleting the blog post')
      }
    }
  }

  const handleTogglePublish = async (blogId: string, currentStatus: boolean) => {
    try {
      const result = await toggleBlogPublishStatus(blogId, !currentStatus)
      if (result.success) {
        loadBlogs() // Reload blogs after status change
      } else {
        alert(result.error || 'Failed to update blog status')
      }
    } catch (error) {
      console.error('Error updating blog status:', error)
      alert('An error occurred while updating the blog status')
    }
  }

  const columns = [
    {
      header: 'Title',
      accessorKey: 'title'
    },
    {
      header: 'Description',
      accessorKey: (row: Blog) => (
        <span className='line-clamp-2 max-w-xs'>{row.shortDescription}</span>
      )
    },
    {
      header: 'Published',
      accessorKey: (row: Blog) => (
        <Switch
          checked={row.published}
          onCheckedChange={() => handleTogglePublish(row._id, row.published || false)}
          className='cursor-pointer'
        />
      )
    },
    {
      header: 'Date',
      accessorKey: (row: Blog) => new Date(row.createdAt).toLocaleDateString()
    },
    {
      header: 'Actions',
      accessorKey: (row: Blog) => (
        <div className='flex space-x-2'>
          <Button
            variant='ghost'
            size='sm'
            onClick={(e) => {
              e.stopPropagation()
              setSelectedBlog(row)
              setViewOpen(true)
            }}
          >
            <Eye className='h-4 w-4' />
          </Button>
          <Button
            variant='ghost'
            size='sm'
            onClick={(e) => {
              e.stopPropagation()
              setSelectedBlog(row)
              setFormOpen(true)
            }}
          >
            <Edit className='h-4 w-4' />
          </Button>
          <Button
            variant='ghost'
            size='sm'
            onClick={(e) => {
              e.stopPropagation()
              handleDelete(row._id)
            }}
          >
            <Trash2 className='h-4 w-4' />
          </Button>
        </div>
      )
    }
  ]

  return (
    <div className='container mx-auto py-8'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between'>
          <div>
            <CardTitle>Blog Posts</CardTitle>
            <CardDescription>Manage your blog content</CardDescription>
          </div>
          <Dialog open={formOpen} onOpenChange={setFormOpen}>
            <Button
              onClick={() => {
                setSelectedBlog(null)
                setFormOpen(true)
              }}
            >
              <PlusCircle className='h-4 w-4 mr-2' />
              Add New Post
            </Button>
            <DialogContent className='max-w-3xl max-h-[calc(100vh-10rem)] overflow-y-auto'>
              <DialogHeader>
                <DialogTitle>{selectedBlog ? 'Edit Blog Post' : 'Add New Blog Post'}</DialogTitle>
              </DialogHeader>
              <BlogForm
                blog={selectedBlog}
                onSuccess={() => {
                  setFormOpen(false)
                  loadBlogs()
                }}
              />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className='flex justify-center py-8'>Loading...</div>
          ) : (
            <DataTable data={blogs} columns={columns} searchable pagination pageSize={10} />
          )}
        </CardContent>
      </Card>

      {/* View Blog Dialog */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className='max-w-3xl max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Blog Post Details</DialogTitle>
          </DialogHeader>
          {selectedBlog && <BlogView blog={selectedBlog} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}
