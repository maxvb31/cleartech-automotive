import { SanityImage } from '@/types'
import { urlForImage } from '@/sanity/lib/utils'

interface DoubleImagesProps {
  image1?: SanityImage
  image2?: SanityImage
}

export default function DoubleImages({ image1, image2 }: DoubleImagesProps) {
  return (
    <div className="flex flex-col md:flex-row w-full bg-[#F6F1ED]">
      <div className="w-full">
        {image1 && (
          <img
            src={urlForImage(image1 as any)?.url() || ''}
            alt={image1?.alt || 'Project image 1'}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="w-full">
        {image2 && (
          <img
            src={urlForImage(image2 as any)?.url() || ''}
            alt={image2?.alt || 'Project image 2'}
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  )
}
