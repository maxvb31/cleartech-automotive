import Link from 'next/link'

interface ButtonProps {
  label: string
  link?: { slug: string | null; _type?: string }
  externalLink?: string
  anchor?: string
  buttonColor?: { label: string; value: string } | undefined
  className?: string
  icon?: JSX.Element
}

export function Button({
  label,
  link,
  externalLink,
  anchor,
  buttonColor,
  className = '',
  icon,
}: ButtonProps) {
  // Determine the href based on external link, anchor, or internal link
  const href = externalLink
    ? externalLink // If external link is provided, use it
    : anchor
      ? `#${anchor}` // If anchor is provided, scroll to anchor
      : link
        ? link._type === 'project'
          ? `/projects/${link.slug}`
          : link.slug === null || link.slug === 'home'
            ? '/'
            : `/${link.slug}`
        : '#'

  // Strip out any invisible characters from color value and label
  const cleanColorValue =
    buttonColor?.value.replace(/[\u200B-\u200D\uFEFF]/g, '').trim() || '#FFFFFF'
  const cleanLabel = buttonColor?.label
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .trim()

  let buttonStyle: React.CSSProperties = {}
  let textColor = ''

  // Handle transparent button separately
  if (cleanLabel === 'Transparent') {
    buttonStyle = {
      backgroundColor: 'transparent',
    }
    textColor = '#000000'
  } else {
    buttonStyle = {
      backgroundColor: cleanColorValue,
    }

    if (cleanLabel === 'White') {
      textColor = '#000000'
    } else if (cleanLabel === 'Black') {
      textColor = '#FFFFFF'
    } else if (cleanLabel === 'Green') {
      textColor = '#000000'
    } else {
      textColor = '#000000'
    }
  }

  const textStyle: React.CSSProperties = {
    color: textColor,
  }

  return (
    <Link
      href={href}
      className={`btn-primary ${className} ${
        cleanLabel === 'Transparent' ? 'transparent-btn' : ''
      }`}
      style={buttonStyle}
      aria-label={label}
      target={externalLink ? '_blank' : '_self'}
      rel={externalLink ? 'noopener noreferrer' : undefined}
      scroll={!!anchor}
    >
      <span style={textStyle} className="flex items-center">
        {label}
        {icon && <span className="ml-1">{icon}</span>}
      </span>
    </Link>
  )
}

export default Button
