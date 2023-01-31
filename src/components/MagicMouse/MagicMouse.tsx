import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import './magicMouse.css'

interface MagicMouseProps {
  type?: 'light' | 'dark' | 'custom'
  pointerColor?: string
  outlineColor?: string
  hoverBackground?: string
  showCursor?: boolean
  circleWidth?: number
  outlineWidth?: number
  circleWidthHover?: number
  useSvgOnHover?: boolean
  svg?: string
}

const MagicMouse: FC<MagicMouseProps> = ({
  type = 'light',
  pointerColor,
  outlineColor,
  hoverBackground,
  outlineWidth = 64,
  circleWidth = 8,
  circleWidthHover,
  showCursor = false,
  useSvgOnHover = false,
  svg,
}) => {
  const cursor = useRef<HTMLDivElement>(null!)
  const outline = useRef<HTMLDivElement>(null!)

  let rootStyle: HTMLBodyElement | null = document.querySelector(':root')

  const cursorMovement = (e: MouseEvent) => {
    let x = e.clientX
    let y = e.clientY

    outline.current.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`
    cursor.current.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`
  }

  const handleMouseOver = (e: MouseEvent) => {
    outline.current.classList.add('hover')
    cursor.current.classList.add('hover')

    if (useSvgOnHover === true) {
      cursor.current.style.backgroundImage = `url(${svg})`
      cursor.current.style.width = '60px'
      cursor.current.style.height = '60px'

      rootStyle?.style.setProperty('--background-cursor-hover', `transparent`)
    } else {
      rootStyle?.style.setProperty(
        '--background-cursor-hover',
        `${pointerColor}`
      )
    }
  }

  const handleMouseleave = (e: MouseEvent) => {
    outline.current.classList.remove('hover')
    cursor.current.classList.remove('hover')
    if (useSvgOnHover === true) {
      cursor.current.style.backgroundImage = `transparent`
      cursor.current.style.width = `${circleWidth}px`
      cursor.current.style.height = `${circleWidth}px`
      rootStyle?.style.setProperty('--cursor-width', `8px`)
      rootStyle?.style.setProperty(
        '--background-cursor-hover',
        `${pointerColor}`
      )
    }
  }

  useEffect(() => {
    document.body.style.cursor = showCursor ? 'auto' : 'none'
    document.addEventListener('mousemove', cursorMovement)
    let linkInPage: HTMLAnchorElement[] = [...document.querySelectorAll('a')]
    linkInPage?.forEach((item: HTMLAnchorElement) => {
      item.addEventListener('mouseover', handleMouseOver)
      item.addEventListener('mouseleave', handleMouseleave)
    })

    rootStyle?.style.setProperty(
      '--background-outline-hover',
      hoverBackground as string
    )
    rootStyle?.style.setProperty(
      '--circle-width-hover',
      `${circleWidthHover}px`
    )

    return () => {
      document.removeEventListener('mousemove', cursorMovement)
      linkInPage?.forEach((item: HTMLAnchorElement) => {
        item.removeEventListener('mouseover', handleMouseOver)
        item.removeEventListener('mouseleave', handleMouseleave)
      })
    }
  }, [
    ,
    pointerColor,
    outlineColor,
    hoverBackground,
    circleWidth,
    circleWidthHover,
    showCursor,
    useSvgOnHover,
    svg,
    type,
  ])
  return (
    <React.Fragment>
      <div
        ref={cursor}
        className={`cursor cursor-${type}`}
        style={{
          backgroundColor: type === 'custom' ? pointerColor : undefined,
          borderColor: type === 'custom' ? pointerColor : undefined,
          width: `${circleWidth}px`,
          height: `${circleWidth}px`,
        }}
      ></div>
      <div
        ref={outline}
        className={`outline outline-${type}`}
        style={{
          borderColor: type === 'custom' ? outlineColor : undefined,
          width: `${outlineWidth}px`,
          height: `${outlineWidth}px`,
        }}
      ></div>
    </React.Fragment>
  )
}

export default MagicMouse
