import { SanityImage } from '@/types'
import { urlForImage } from '@/sanity/lib/utils'

interface SingleImageProps {
  image?: SanityImage
}

export default function SingleImage({ image }: SingleImageProps) {
  return (
    <div className="w-full bg-[#F6F1ED]">
      {image && (
        <img
          src={urlForImage(image as any)?.url() || ''}
          alt={image?.alt || 'Project image'}
          className="w-full max-h-[800px] object-cover"
        />
      )}
    </div>
  )
}
