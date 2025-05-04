import mongoose, { Schema } from 'mongoose'

// Define the Site Content schema
const siteContentSchema = new Schema(
  {
    content: {
      // Logo
      logo: {
        thumbnail: String,
        file: String,
        fileId: String
      },
      // Hero section
      hero: {
        title: String,
        subtitle: String,
        ctaText: String,
        ctaLink: String,
        backgroundImage: {
          thumbnail: String,
          file: String,
          fileId: String
        }
      },
      // Services section
      services: {
        title: String,
        subtitle: String,
        items: [
          {
            icon: {
              thumbnail: String,
              file: String,
              fileId: String
            },
            title: String,
            description: String,
            link: String
          }
        ]
      },
      // Portfolio section
      // portfolio: {
      //   title: String,
      //   categories: [String],
      //   items: [
      //     {
      //       title: String,
      //       subTitle: String,
      //       category: String,
      //       image: {
      //         thumbnail: String,
      //         file: String,
      //         fileId: String
      //       },
      //       link: String
      //     }
      //   ]
      // },
      // About section
      about: {
        title: String,
        subtitle: String,
        heading: String,
        description: String,
        ctaText: String,
        ctaLink: String,
        media: {
          thumbnail: String,
          file: String,
          fileId: String
        }
      },
      // Skills section
      skills: [
        {
          title: String,
          percentage: Number
        }
      ],
      // Clients section
      clients: {
        title: String,
        // stats: {
        //   count: Number,
        //   label: String
        // },
        logos: [
          {
            image: {
              thumbnail: String,
              file: String,
              fileId: String
            },
            link: String
          }
        ]
      },
      // Testimonials section
      testimonials: [
        {
          name: String,
          role: String,
          image: {
            thumbnail: String,
            file: String,
            fileId: String
          },
          message: String
        }
      ],
      // Team section
      team: {
        title: String,
        subtitle: String,
        rightText: String,
        leftText: String,
        members: [
          {
            name: String,
            role: String,
            image: {
              thumbnail: String,
              file: String,
              fileId: String
            },
            bio: String,
            socialLinks: [
              {
                icon: String,
                link: String
              }
            ]
          }
        ]
      },
      // Pricing section
      // pricing: {
      //   title: String,
      //   subtitle: String,
      //   plans: [
      //     {
      //       name: String,
      //       price: Number,
      //       period: String,
      //       features: [String],
      //       ctaText: String,
      //       ctaLink: String
      //     }
      //   ]
      // },
      // Contact section
      contact: {
        title: String,
        subtitle: String,
        heading: String,
        description: String,
        address: String,
        phone: String,
        email: String,
        website: String,
        mapLocation: {
          lat: Number,
          lng: Number
        }
      },
      // Footer section
      footer: {
        copyright: String,
        socialLinks: [
          {
            title: String,
            link: String
          }
        ]
      }
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

// Create the model
const SiteContent = mongoose.models.SiteContent || mongoose.model('SiteContent', siteContentSchema)

export default SiteContent
