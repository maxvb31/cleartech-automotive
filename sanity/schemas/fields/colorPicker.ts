export default {
  name: 'colorPicker',
  title: 'Simpler Color',
  type: 'simplerColor',
  options: {
    colorList: [
      { label: 'White', value: '#FFFFFF' },
      { label: 'Black', value: '#171717' },
      { label: 'Transparent', value: 'transparent' },
    ],
    layout: 'radio',
  },
}
