import { defineType, defineField } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'

export default defineType({
  name: 'textSection',
  title: 'Text Section',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      description: 'Optional section heading',
    }),
    defineField({
      name: 'textContent',
      title: 'Text Content',
      type: 'textContent',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'textContent.title',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Text Section',
        subtitle: subtitle || 'Text content section',
      }
    },
  },
})
