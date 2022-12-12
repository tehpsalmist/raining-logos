import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Falling } from './Falling'
import { useInterval } from './hooks'

const textClasses = [
  'text-fuchsia-400',
  'text-sky-400',
  'text-orange-400',
  'text-lime-400',
] as const

interface FallingItem {
  zIndex: number
  xIndex: number
  id: number
  textClass: typeof textClasses[number]
}

export const App = () => {
  const [interval, setInterval] = useState(() =>
    Math.floor(Math.random() * 1500)
  )
  const [fallingItems, setFallingItems] = useState<FallingItem[]>(() => [])

  useInterval(() => {
    setFallingItems((f) =>
      f
        .concat([
          {
            xIndex: Math.floor(Math.random() * 100),
            zIndex: Math.floor(Math.random() * 100),
            id: Date.now(),
            textClass:
              textClasses[Math.floor(Math.random() * textClasses.length)],
          },
        ])
        .slice(-100)
    )
    setInterval(Math.floor(Math.random() * 1500))
  }, interval)

  return (
    <main className="max-h-screen h-screen overflow-hidden relative  bg-gray-900">
      {fallingItems.map(({ xIndex, zIndex, id, textClass }) => (
        <Falling key={id} zIndex={zIndex} xIndex={xIndex}>
          <div className={`${textClass} text- text-shadow`}>NOICE</div>
        </Falling>
      ))}
    </main>
  )
}

const root = createRoot(document.getElementById('app')!)

root.render(<App />)
