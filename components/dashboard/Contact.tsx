'use client'

import { updateHomepageSection } from '@/actions/data/homepage'
import { FormError } from '@/components/shared/form-error'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Globe, Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { Card, CardContent } from '../ui/card'

type TProps = {
  data?: ContactSection
}

// Define the Zod schema for map location
const mapLocationSchema = z.object({
  lat: z.coerce
    .number()
    .min(-90, 'Please enter correct lat-lng value between -90 to 180')
    .max(90, 'Please enter correct lat-lng value between -90 to 180')
    .optional(),
  lng: z.coerce
    .number()
    .min(-180, 'Please enter correct lat-lng value between -90 to 180')
    .max(180, 'Please enter correct lat-lng value between -90 to 180')
    .optional()
})

// Define the Zod schema for validation
const contactSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(100, { message: 'Title is too long' }),
  subtitle: z
    .string()
    .min(1, { message: 'Subtitle is required' })
    .max(300, { message: 'Subtitle is too long' }),
  heading: z
    .string()
    .min(1, { message: 'Heading is required' })
    .max(100, { message: 'Heading is too long' }),
  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .max(500, { message: 'Description is too long' }),
  address: z.string().min(1, { message: 'Address is required' }),
  phone: z.string().min(1, { message: 'Phone number is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  website: z.string().min(1, { message: 'Please enter a valid URL' }).optional(),
  mapLocation: mapLocationSchema.optional()
})

// Define the form type
type ContactFormValues = z.infer<typeof contactSchema>

export default function Contact({ data }: TProps) {
  // Form submission states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Create form with default values from data prop
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      title: data?.title || '',
      subtitle: data?.subtitle || '',
      heading: data?.heading || '',
      description: data?.description || '',
      address: data?.address || '',
      phone: data?.phone || '',
      email: data?.email || '',
      website: data?.website || '',
      mapLocation: {
        lat: data?.mapLocation?.lat,
        lng: data?.mapLocation?.lng
      }
    },
    mode: 'onBlur' // Better performance by validating only on blur
  })

  // Submit handler
  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Call the server action to update the contact section
      const result = await updateHomepageSection('contact', values)

      if (result.success) {
        toast.success('Contact section updated successfully')
      } else {
        toast.error(result.error || 'An error occurred while updating the contact section')
        setError(result.error || 'An error occurred while updating the contact section')
      }
    } catch (err) {
      console.error('Error updating contact section:', err)
      toast.error('An unexpected error occurred')
      setError('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Generate Google Maps URL preview based on coordinates
  const getMapPreviewUrl = () => {
    const lat = form.watch('mapLocation.lat')
    const lng = form.watch('mapLocation.lng')

    if (lat && lng) {
      return `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`
    }
    return null
  }

  return (
    <div>
      <h1 className='text-lg my-5 font-semibold lg:text-3xl'>Contact Section</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          {/* Display error message */}
          {error && <FormError message={error} />}

          {/* Section Heading */}
          <div className='grid gap-4 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Title</FormLabel>
                  <FormControl>
                    <Input placeholder='Contact Us' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='subtitle'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Subtitle</FormLabel>
                  <FormControl>
                    <Input placeholder='Get in touch with our team' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Contact Form Heading and Description */}
          <div className='grid gap-4 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='heading'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Form Heading</FormLabel>
                  <FormControl>
                    <Input placeholder='Send Us a Message' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Have questions or want to learn more? Feel free to reach out to us.'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Contact Information */}
          <Card className='space-y-6'>
            <CardContent>
              <h3 className='text-lg font-medium mb-4'>Contact Information</h3>

              <div className='space-y-4'>
                {/* Address */}
                <FormField
                  control={form.control}
                  name='address'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center gap-2'>
                        <MapPin className='h-4 w-4' />
                        Address
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='123 Street Name, City, Country'
                          rows={2}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center gap-2'>
                        <Phone className='h-4 w-4' />
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input placeholder='+1 (123) 456-7890' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center gap-2'>
                        <Mail className='h-4 w-4' />
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input placeholder='info@example.com' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Website */}
                <FormField
                  control={form.control}
                  name='website'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center gap-2'>
                        <Globe className='h-4 w-4' />
                        Website (Optional)
                      </FormLabel>
                      <FormControl>
                        <Input placeholder='https://www.example.com' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Map Location */}
          <Card className='space-y-4'>
            <CardContent>
              <h3 className='text-lg font-medium mb-4'>Map Location</h3>

              <div className='grid gap-4 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='mapLocation.lat'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Latitude</FormLabel>
                      <FormControl>
                        <Input type='number' step='0.000001' placeholder='40.7128' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='mapLocation.lng'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Longitude</FormLabel>
                      <FormControl>
                        <Input type='number' step='0.000001' placeholder='-74.0060' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Map Preview */}
              {getMapPreviewUrl() && (
                <div className='mt-4'>
                  <p className='text-sm font-medium mb-2'>Map Preview:</p>
                  <div className='border rounded-md overflow-hidden h-72'>
                    <iframe
                      title='Google Maps Location'
                      src={getMapPreviewUrl() || ''}
                      width='100%'
                      height='100%'
                      style={{ border: 0 }}
                      loading='lazy'
                      referrerPolicy='no-referrer-when-downgrade'
                    ></iframe>
                  </div>
                  <p className='text-xs text-muted-foreground mt-1'>
                    This is a preview of how the map will appear on your website.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Button type='submit' disabled={isSubmitting} className='mt-6'>
            {isSubmitting ? 'Saving...' : 'Save Contact Information'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
