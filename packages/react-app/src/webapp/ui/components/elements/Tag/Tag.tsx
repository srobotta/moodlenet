import type { FollowTag } from '@moodlenet/component-library'
import { tm } from '@moodlenet/core/i18n'
import type { CSSProperties, FC } from 'react'
import { Link } from '../link.js'
import './Tag.scss'

export type TagProps = {
  tag: FollowTag
  click: boolean
  index: number
  size?: 'small' | 'medium' | 'big'
  style?: CSSProperties
}

export const Tag: FC<TagProps> = ({ tag, size, index = 0, click = true, style }) => {
  const keys = tag.href ? tag.href.url.split('/') : []
  const label = tm(tag.type, keys[2] || tag.name)
  return click && tag.href ? (
    <Link href={tag.href} className="tag-container" key={index}>
      <div className={`tag ${tag.type} ${tag.href ? 'hover' : ''} ${size}`} style={style}>
        <abbr title={label}>{label}</abbr>
      </div>
    </Link>
  ) : (
    <div className={`tag ${tag.type} ${size}`} key={index} style={style}>
      <abbr title={label}>{label}</abbr>
    </div>
  )
}

export const getTagList = (tags: FollowTag[], size: 'small' | 'medium' | 'big', click = true) => {
  return tags.map((tag, i) => {
    // return getTag(tag, size, click, index)
    return <Tag key={tag.name} tag={tag} size={size} click={click} index={i} />
  })
}
