export default {
  title: 'Image',
  name: 'customImage',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    {
      title: 'Alt Text',
      name: 'alt',
      type: 'string',
      description:
        'IMPORTANT: This text will be used for screen readers to describe the image.',
      validation: (Rule) => Rule.error('alt Text can not be empty').required(),
      options: {
        isHighlighted: true,
      },
    },
  ],
}
