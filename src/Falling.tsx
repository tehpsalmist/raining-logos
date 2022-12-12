import React, { ComponentProps, useState } from 'react'
import { useTimeout } from './hooks'

export interface FallingProps extends ComponentProps<'div'> {
  zIndex: number
  xIndex: number
}

export const Falling = ({
  className = '',
  style = {},
  xIndex,
  zIndex,
  ...props
}: FallingProps) => {
  const [firstRender, setFirstRender] = useState(true)

  const transitionDuration = `${(101 - zIndex) / 5 + 8}s`
  const yIndex = firstRender ? 0 : '150vh'

  useTimeout(() => {
    setFirstRender(false)
  }, 10)

  return (
    <div
      className={`${className} absolute bottom-[120vh] left-0`}
      style={{
        ...style,
        zIndex,
        transitionDuration,
        transitionTimingFunction: 'linear',
        transform: `translate(${xIndex}vw, ${yIndex}) scale(${
          zIndex / 10 + 0.5
        })`,
      }}
      {...props}
    />
  )
}
