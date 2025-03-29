import { PortableTextBlock } from 'next-sanity'
import { CustomPortableText } from './CustomPortableText'
import Button from '../Button'
import { TextContent as TextContentType } from '@/types'

interface TextContentProps {
  content: TextContentType
  className?: string
}

export default function TextContent({
  content,
  className = '',
}: TextContentProps) {
  const { alignment, title, body, buttons, backgroundColor } = content

  // Get the background color style
  const bgColorStyle = backgroundColor
    ? { backgroundColor: backgroundColor.value }
    : {}

  // Get the correct alignment class
  const alignmentClass = alignment ? `text-${alignment}` : 'text-left'

  return (
    <div
      className={`text-content ${alignmentClass} ${className}`}
      style={bgColorStyle}
    >
      {title && <h2 className="text-content-title">{title}</h2>}

      {body && (
        <div className="text-content-body">
          <CustomPortableText value={body as PortableTextBlock[]} />
        </div>
      )}

      {buttons && buttons.length > 0 && (
        <div className="text-content-buttons flex flex-wrap gap-4 mt-6">
          {buttons.map((button, index) => (
            <Button
              key={`button-${index}`}
              label={button.label}
              link={button.link}
              externalLink={button.externalLink}
              anchor={button.anchor}
              buttonColor={button.buttonColor}
            />
          ))}
        </div>
      )}
    </div>
  )
}
