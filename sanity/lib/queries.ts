import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    overview,
    showcaseProjects[]->{
      _type,
      coverImage,
      overview,
      "slug": slug.current,
      tags,
      title,
    },
    title,
    sections[]{
      _type,
      title,
      video,
      button {
        label,
        "link": link-> { "slug": slug.current, title },
        buttonColor, 
      },
      overview,
      ...,
      _type == 'hero' => {
        ...,
        title,
        overview,
        video {
          _type,
          asset-> {
            _id,
            url,
            originalFilename,
            mimeType,
            extension
          },
          alt
        },
        buttons[] {
          label,
          "link": link-> { "slug": slug.current, title },
          anchor,
          externalLink,
          buttonColor
        }
      },
    },
    largeProductShowcase {
      _type,
      tagline,
      title,
      product,
      buttons[] {
        label,
        "link": link-> { "slug": slug.current, title },
        anchor,
        externalLink,
        buttonColor
      },
    },
    infoTabs {
      _type,
      title,
      tabs[] {
        _type,
        title,
        overview,
      },
      backgroundImage {
        hotspot,
        asset,
        url,
        crop,
        alt
      },
      buttons[] {
        label,
        "link": link-> { "slug": slug.current, title },
        anchor,
        externalLink,
        buttonColor
      }
    },
    infoBlock {
      _type,
      image,
      title,
      overview,
    },
    contact {
      _type,
      title,
      overview,
      backgroundImage {
        hotspot,
        asset,
        url,
        crop,
        alt
      },
      
    }
  }
`

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    overview,
    showcaseProjects[]->{
      _type,
      coverImage,
      overview,
      "slug": slug.current,
      tags,
      title,
    },
    title,
    sections[]{
      _type,
      title,
      backgroundImage,
      button {
        label,
        "link": link-> { "slug": slug.current, title },
        buttonColor, 
      },
      overview,
      ...,
      _type == 'hero' => {
       backgroundImage {
        hotspot,
        asset,
        url,
        crop,
        alt
      },
        button {
          label,
          "link": link-> { "slug": slug.current, title },
          anchor,
          externalLink,
          buttonColor
        },
      },
      _type == 'selectedWork' => {
        title,
        overview,
        projects[]->{
          _type,
          coverImage,
          title,
          "slug": slug.current,
          tags,
          videoLink,
            siteLink,
          backgroundPattern,
          category->{
            _type,
            name,
          }
        }
      },

    }
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    coverImage,
    overview,
    siteLink,
    videoLink,
    "slug": slug.current,
    tags,
    title,
    sections,
    category->{
      _type,
      name,
    }
  }
`

export const serviceBySlugQuery = `*[_type == "service" && slug.current == $slug][0]{
  title,
  coverImage,
  description,
  button,
  slug,
  overview,
  number,
  
  subServices[]->{
    _type,
    title,
    icon,
    overview,
    number,
  }
}`

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    siteTitle,
    footer,
    email,
    socialMediaLinks[]{
      name,
      url
    },
    menuItems[]{
      ...,
      _type == "reference" => @->{
        _type,
        "slug": slug.current,
        title
      },
      _type == "anchorLink" => {
        _type,
        title,
        anchor
      }
    },
    ogImage,
  }
`
