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
  pointerColor?: string
  outlineColor?: string
  hoverBackground?: string
  showCursor?: boolean
  circleWidth?: number
  circleWidthHover?: number
  useSvgOnHover?: boolean
  svg?: string
  reRenderCursor?: number
}

const MagicMouse: FC<MagicMouseProps> = ({
  pointerColor,
  outlineColor,
  hoverBackground,
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
      rootStyle?.style.setProperty('--cursor-width', `60px`)
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
      cursor.current.style.backgroundImage = `white`
      rootStyle?.style.setProperty('--cursor-width', `8px`)
      rootStyle?.style.setProperty(
        '--background-cursor-hover',
        `${pointerColor}`
      )
    }
  }

  useEffect(() => {
    document.body.style.cursor = showCursor ? 'auto' : 'none'
    console.log('RENDER')
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
  ])
  return (
    <React.Fragment>
      <div
        ref={cursor}
        className="cursor"
        style={{
          backgroundColor: pointerColor,
          borderColor: pointerColor,
        }}
      ></div>
      <div
        ref={outline}
        className="outline"
        style={{
          borderColor: outlineColor,
          width: `${circleWidth}px`,
          height: `${circleWidth}px`,
        }}
      ></div>
    </React.Fragment>
  )
}

export default MagicMouse
