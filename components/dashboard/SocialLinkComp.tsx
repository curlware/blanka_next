import { SOCIAL_PLATFORMS } from '@/configs/reset-data'
import { Plus, Trash2 } from 'lucide-react'
import { Control } from 'react-hook-form'
import { Button } from '../ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import SocialIcon from '../ui/SocialIcon'
import { TeamMemberFormValues } from './TeamMember'

// Social link item component
export function SocialLinkItem({
  index,
  socialIndex,
  control,
  onRemove
}: {
  index: number
  socialIndex: number
  control: Control<TeamMemberFormValues>
  onRemove: () => void
}) {
  return (
    <div className='flex gap-2 items-end'>
      {/* Social Platform */}
      <FormField
        control={control}
        name={`members.${index}.socialLinks.${socialIndex}.icon`}
        render={({ field }) => (
          <FormItem className='flex-1'>
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className='w-[140px]'>
                  <SelectValue placeholder='Platform'>
                    {field.value && (
                      <div className='flex items-center gap-2'>
                        <SocialIcon network={field.value} size={16} />
                        <span className='capitalize'>{field.value}</span>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {SOCIAL_PLATFORMS.map((platform) => (
                    <SelectItem key={platform} value={platform}>
                      <div className='flex items-center gap-2'>
                        <SocialIcon network={platform} size={16} />
                        <span className='capitalize'>{platform}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Social Link */}
      <FormField
        control={control}
        name={`members.${index}.socialLinks.${socialIndex}.link`}
        render={({ field }) => (
          <FormItem className='flex-[2]'>
            <FormControl>
              <Input placeholder='https://...' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Remove Link Button */}
      <Button
        type='button'
        variant='ghost'
        size='icon'
        className='h-9 w-9 text-destructive'
        onClick={onRemove}
      >
        <Trash2 className='h-4 w-4' />
      </Button>
    </div>
  )
}

// Social links section component
export function SocialLinksSection({
  index,
  form,
  control
}: {
  index: number
  form: any
  control: Control<TeamMemberFormValues>
}) {
  // Get social links only when needed using a callback
  const getSocialLinks = () => form.getValues(`members.${index}.socialLinks`) || []

  const addSocialLink = () => {
    const currentLinks = getSocialLinks()
    form.setValue(`members.${index}.socialLinks`, [
      ...currentLinks,
      {
        icon: 'linkedin',
        link: '',
        _id: Math.random().toString(36).substring(2, 9)
      }
    ])
  }

  const socialLinks = getSocialLinks()

  return (
    <div className='space-y-3'>
      <div className='flex justify-between items-center'>
        <FormLabel>Social Media Links</FormLabel>

        <Button type='button' variant='outline' size='sm' onClick={addSocialLink}>
          <Plus className='h-3 w-3 mr-1' />
          Add Link
        </Button>
      </div>

      <div className='space-y-2'>
        {socialLinks.map((_: any, socialIndex: any) => (
          <SocialLinkItem
            key={`${index}-${socialIndex}`}
            index={index}
            socialIndex={socialIndex}
            control={control}
            onRemove={() => {
              const currentLinks = [...getSocialLinks()]
              currentLinks.splice(socialIndex, 1)
              form.setValue(`members.${index}.socialLinks`, currentLinks)
            }}
          />
        ))}

        {(!socialLinks || socialLinks.length === 0) && (
          <div className='text-sm text-muted-foreground py-2'>
            No social links added. Click "Add Link" to add social media profiles.
          </div>
        )}
      </div>
    </div>
  )
}
