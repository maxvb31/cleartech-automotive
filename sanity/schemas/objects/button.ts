import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Button Label',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Link to Page',
      type: 'reference',
      to: [{ type: 'home' }, { type: 'page' }, { type: 'project' }],
    }),
    defineField({
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
      description: 'Optional: Specify an external link',
    }),
    defineField({
      name: 'anchor',
      title: 'Anchor Link',
      type: 'string',
      description: 'Optional: Specify an anchor link (e.g. section-id)',
    }),
    defineField({
      name: 'buttonColor',
      title: 'Button Colour',
      type: 'colorPicker',
    }),
  ],
  preview: {
    select: {
      title: 'label',
    },
  },
})
