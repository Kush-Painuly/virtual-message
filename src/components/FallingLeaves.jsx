import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const LEAF_COLORS = [
  '#e84393', '#f06292', '#d81b60',
  '#e91e63', '#c62828', '#ef5350', '#f48fb1',
]

function LeafSVG({ color }) {
  const veinColor = color === '#e84393' ? '#c01070' : '#c0002a'
  return (
    <svg viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 1 C9 1, 18 8, 16 16 C14 22, 4 23, 2 17 C0 11, 4 3, 9 1Z"
        fill={color}
        opacity="0.88"
      />
      <path
        d="M9 22 C9 22, 9 12, 9 2"
        stroke={veinColor}
        strokeWidth="0.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function FallingLeaves({ count = 22 }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const leaves = []

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div')
      const color = LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)]
      const size = 14 + Math.random() * 14

      Object.assign(el.style, {
        position: 'fixed',
        width: `${size}px`,
        height: `${size * 1.4}px`,
        left: `${Math.random() * 110 - 5}vw`,
        top: '-40px',
        pointerEvents: 'none',
        zIndex: '0',
        transform: `rotate(${Math.random() * 360}deg)`,
        opacity: '0',
      })

      // Inline SVG
      el.innerHTML = `
        <svg viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size * 1.4}">
          <path d="M9 1 C9 1, 18 8, 16 16 C14 22, 4 23, 2 17 C0 11, 4 3, 9 1Z" fill="${color}" opacity="0.88"/>
          <path d="M9 22 C9 22, 9 12, 9 2" stroke="${color === '#e84393' ? '#c01070' : '#c0002a'}" stroke-width="0.8" stroke-linecap="round"/>
        </svg>
      `

      container.appendChild(el)
      leaves.push(el)
    }

    const animations = []

    function animateLeaf(el, delay) {
      const startLeft = Math.random() * 110 - 5
      const drift = (Math.random() - 0.5) * 30
      const duration = 7 + Math.random() * 8

      gsap.set(el, { top: '-40px', left: `${startLeft}vw`, opacity: 0 })

      const anim = gsap.to(el, {
        top: '110vh',
        left: `${startLeft + drift}vw`,
        rotation: `+=${200 + Math.random() * 300}`,
        opacity: 0.85,
        duration,
        delay,
        ease: 'none',
        onComplete: () => {
          gsap.set(el, {
            top: '-40px',
            left: `${Math.random() * 110 - 5}vw`,
            opacity: 0,
          })
          animateLeaf(el, Math.random() * 2)
        },
      })
      animations.push(anim)
    }

    leaves.forEach((el, i) => animateLeaf(el, i * 0.35))

    return () => {
      animations.forEach(a => a.kill())
      leaves.forEach(el => el.remove())
    }
  }, [count])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  )
}
