import { useQuery } from '@/sanity/loader/useQuery'
import { serviceBySlugQuery } from '@/sanity/lib/queries'
import { ServicePayload } from '@/types'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { Header } from '@/components/shared/Header'
import ImageBox from '@/components/shared/ImageBox'

export interface ServicePageProps {
  data: ServicePayload | null
}

export function ServicePage({ data }: ServicePageProps) {
  const { title, coverImage, button } = data ?? {}

  return (
    <div>
      <div className="mb-20 space-y-6">
        {/* Header */}
        <Header title={title} />

        <div className="rounded-md border">
          {/* Image */}
          <ImageBox
            image={coverImage}
            alt={title}
            classesWrapper="relative aspect-[16/9]"
          />
        </div>

        {/* Button */}
        {button && button.label && (
          <a href={button.link?.slug || '#'} className="btn">
            {button.label}
          </a>
        )}
      </div>
    </div>
  )
}

export default ServicePage
