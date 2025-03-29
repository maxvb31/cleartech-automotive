import { CogIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'menuItems',
      title: 'Menu Item List',
      description: 'Links displayed in the site header.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          title: 'Internal Page Link',
          to: [{ type: 'home' }, { type: 'page' }, { type: 'project' }],
        }),
        defineArrayMember({
          type: 'object',
          title: 'Anchor Link',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'anchor',
              title: 'Anchor ID',
              type: 'string',
              description: 'The ID of the section to scroll to.',
            },
          ],
        }),
      ],
    }),

    // Footer Info
    defineField({
      name: 'footer',
      title: 'Footer Info',
      description: 'Block of text displayed at the bottom of the page.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),

    // Open Graph Image
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      description: 'Displayed on social cards and search engines.',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    // Email Address
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    // Social Media Links
    defineField({
      name: 'socialMediaLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Social Media Link',
          fields: [
            {
              name: 'name',
              title: 'Platform Name',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            },
          ],
        }),
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Settings',
      }
    },
  },
})
