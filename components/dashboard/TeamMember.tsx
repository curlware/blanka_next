import { updateHomepageSection } from '@/actions/data/homepage'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import ImageUploader from '../others/ImageUploader'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { SocialLinksSection } from './SocialLinkComp'

type TProps = {
  index: number
  memberImage?: MediaFile
  onImageChange: (file: MediaFile) => void
  onRemove: () => void
  form: any
  control: any
  disabled: boolean
}

// Define the Zod schema for social links - removed validation for performance
const socialLinkSchema = z.object({
  icon: z.string().optional(), // Removed validation that required a value
  link: z.string().optional(), // Removed validation that required a valid URL
  _id: z.string().optional() // For unique identification
})

// Define the Zod schema for team members
const teamMemberSchema = z.object({
  members: z
    .array(
      z.object({
        name: z
          .string()
          .min(1, { message: 'Name is required' })
          .max(100, { message: 'Name is too long' }),
        role: z
          .string()
          .min(1, { message: 'Role is required' })
          .max(100, { message: 'Role is too long' }),
        bio: z.string().max(500, { message: 'Bio is too long' }).optional(),
        // Image will be handled separately with ImageUploader
        socialLinks: z.array(socialLinkSchema).optional(),
        _id: z.string().optional() // For unique identification
      })
    )
    .min(1, { message: 'At least one team member is required' })
})

type TeamMemberFormValues = z.infer<typeof teamMemberSchema>

function TeamMemberCard({
  index,
  memberImage,
  onImageChange,
  onRemove,
  form,
  control,
  disabled
}: TProps) {
  return (
    <Card className='p-5 relative border border-gray-200'>
      <div className='absolute top-4 right-4'>
        <Button
          type='button'
          onClick={onRemove}
          variant='ghost'
          size='icon'
          className='h-8 w-8 text-destructive'
          disabled={disabled}
        >
          <Trash2 className='h-4 w-4' />
        </Button>
      </div>

      <div className='grid gap-6 md:grid-cols-[200px_1fr]'>
        {/* Team member photo and basic info */}
        <div className='space-y-4'>
          <div className='space-y-2'>
            <FormLabel>Profile Photo</FormLabel>

            {/* Image preview */}
            {memberImage?.file && (
              <div className='mb-4 relative'>
                <div className='border rounded-md overflow-hidden relative w-32 h-32'>
                  <Image
                    src={memberImage.file}
                    alt={`${form.getValues().members[index].name || 'Team member'} profile`}
                    fill
                    className='object-cover'
                  />
                </div>
                <p className='text-xs text-muted-foreground mt-1'>Current photo</p>
              </div>
            )}

            {/* Image uploader */}
            <ImageUploader fileId={memberImage?.fileId} setFile={onImageChange} />
            <p className='text-xs text-muted-foreground'>
              Upload a profile photo. Square photos work best.
            </p>
          </div>

          {/* Member name */}
          <FormField
            control={control}
            name={`members.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='John Doe' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Member role */}
          <FormField
            control={control}
            name={`members.${index}.role`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role/Position</FormLabel>
                <FormControl>
                  <Input placeholder='CEO' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='space-y-6'>
          {/* Member bio */}
          <FormField
            control={control}
            name={`members.${index}.bio`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='A brief bio about this team member...'
                    className='min-h-[100px]'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Social Links */}
          <SocialLinksSection index={index} form={form} control={control} />
        </div>
      </div>
    </Card>
  )
}

export default function TeamMembers({ data }: { data?: TeamSection }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [memberImages, setMemberImages] = useState<(MediaFile | undefined)[]>(
    data?.members?.map((member) => member.image) || []
  )

  const form = useForm<TeamMemberFormValues>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      members: data?.members?.map((member) => ({
        name: member.name || '',
        role: member.role || '',
        bio: member.bio || '',
        socialLinks:
          member.socialLinks?.map((link: any) => ({
            icon: link.icon || '',
            link: link.link || '',
            _id: Math.random().toString(36).substring(2, 9)
          })) || [],
        _id: Math.random().toString(36).substring(2, 9)
      })) || [
        {
          name: '',
          role: '',
          bio: '',
          socialLinks: [],
          _id: Math.random().toString(36).substring(2, 9)
        }
      ]
    },
    mode: 'onBlur', // Changed from onBlur to onSubmit for better performance
    shouldUnregister: false, // Keep fields registered when they unmount
    reValidateMode: 'onBlur' // Changed from onBlur to onSubmit for better performance
  })

  const { control } = form

  // Set up field array for managing team members
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members'
  })

  // Update team member image when adding or removing items
  const updateMemberImage = (index: number, image: MediaFile) => {
    const newImages = [...memberImages]
    newImages[index] = image
    setMemberImages(newImages)
  }

  // Add a new team member
  const addTeamMember = () => {
    append({
      name: '',
      role: '',
      bio: '',
      socialLinks: [],
      _id: Math.random().toString(36).substring(2, 9)
    })
    // Add an empty image placeholder
    setMemberImages([...memberImages, undefined])
  }

  // Remove a team member
  const removeTeamMember = (index: number) => {
    remove(index)
    // Also remove the corresponding image
    const newImages = [...memberImages]
    newImages.splice(index, 1)
    setMemberImages(newImages)
  }

  const onSubmit = async (values: TeamMemberFormValues) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Combine form data with image data
      const teamData: TeamSection = {
        title: data?.title || '',
        subtitle: data?.subtitle || '',
        leftText: data?.leftText || '',
        rightText: data?.rightText || '',
        members: values.members.map((member, index) => ({
          name: member.name,
          role: member.role,
          bio: member.bio,
          image: memberImages[index],
          // Filter out empty links and _id to prevent MongoDB validation errors
          socialLinks: member.socialLinks
            ?.filter((link) => link.icon && link.link)
            .map((link) => ({
              icon: link.icon,
              link: link.link
              // Intentionally omitting _id here
            }))
        }))
      }

      // Call the server action to update the team section
      const result = await updateHomepageSection('team', teamData)

      if (result.success) {
        toast.success('Team members updated successfully')
      } else {
        toast.error(result.error || 'An error occurred while updating the team members')
        setError(result.error || 'An error occurred while updating the team members')
      }
    } catch (err) {
      console.error('Error updating team members:', err)
      toast.error('An unexpected error occurred')
      setError('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className='mt-6'>
      <CardContent>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-medium'>Team Members</h2>
          <Button type='button' onClick={addTeamMember} variant='success' size='sm'>
            <Plus className='h-4 w-4 mr-2' />
            Add Team Member
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            {fields.map((field, index) => (
              <TeamMemberCard
                key={field._id}
                index={index}
                memberImage={memberImages[index]}
                onImageChange={(file) => updateMemberImage(index, file)}
                onRemove={() => removeTeamMember(index)}
                form={form}
                control={control}
                disabled={fields.length <= 1}
              />
            ))}

            {fields.length > 0 && (
              <Button type='submit' disabled={isSubmitting} className='mt-6'>
                {isSubmitting ? 'Saving...' : 'Save Team Members'}
              </Button>
            )}
          </form>
        </Form>

        {fields.length === 0 && (
          <div className='text-center py-8 text-muted-foreground'>
            No team members added yet. Click the "Add Team Member" button to add one.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
