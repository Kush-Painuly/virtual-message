import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import FallingLeaves from '../components/FallingLeaves.jsx'

const styles = {
  root: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #fff0f3 0%, #ffe4ec 30%, #ffd6e7 60%, #ffe8d6 100%)',
    cursor: 'pointer',
    userSelect: 'none',
  },
  // Soft ambient orbs
  orb: {
    position: 'absolute',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 1,
  },
  orb1: {
    width: '420px',
    height: '420px',
    background: 'radial-gradient(circle, #ffb3cc88 0%, transparent 70%)',
    top: '-100px',
    left: '-100px',
  },
  orb2: {
    width: '350px',
    height: '350px',
    background: 'radial-gradient(circle, #ffd0a866 0%, transparent 70%)',
    bottom: '-80px',
    right: '-80px',
  },
  orb3: {
    width: '240px',
    height: '240px',
    background: 'radial-gradient(circle, #f9c0d855 0%, transparent 70%)',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  // Center content
  center: {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  emoji: {
    fontSize: 'clamp(3rem, 8vw, 5rem)',
    lineHeight: 1,
    display: 'block',
    opacity: 0,
    transform: 'scale(0.3)',
  },
  headline: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
    fontWeight: 700,
    color: '#c23b6f',
    lineHeight: 1.25,
    letterSpacing: '-0.3px',
    opacity: 0,
    transform: 'translateY(32px)',
    textShadow: '0 2px 20px rgba(194,59,111,0.15)',
  },
  sub: {
    fontFamily: "'Lato', sans-serif",
    fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
    fontWeight: 300,
    fontStyle: 'italic',
    color: '#e07a9f',
    letterSpacing: '0.5px',
    opacity: 0,
    transform: 'translateY(18px)',
  },
  hint: {
    fontFamily: "'Lato', sans-serif",
    fontSize: '0.78rem',
    color: '#e8a0ba',
    letterSpacing: '0.8px',
    opacity: 0,
    marginTop: '0.6rem',
    textTransform: 'lowercase',
  },
}

export default function Screen1({ onNext }) {
  const emojiRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const hintRef = useRef(null)
  const rootRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 })

    // Emoji bounces in with elastic spring
    tl.to(emojiRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'elastic.out(1.1, 0.5)',
    })
      // Headline slides up
      .to(headlineRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.35')
      // Subtext follows
      .to(subRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.4')
      // Tap hint fades in last
      .to(hintRef.current, {
        opacity: 0.75,
        duration: 0.8,
        ease: 'power1.out',
      }, '-=0.1')

    // Continuous: emoji floats up & down
    gsap.to(emojiRef.current, {
      y: -10,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      delay: 1.6,
    })

    // Continuous: headline gentle glow pulse
    gsap.to(headlineRef.current, {
      textShadow: '0 4px 32px rgba(194,59,111,0.38)',
      duration: 2.2,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      delay: 2,
    })

    return () => tl.kill()
  }, [])

  return (
    <div ref={rootRef} style={styles.root} onClick={onNext} role="button" aria-label="Continue">
      {/* Ambient orbs */}
      <div style={{ ...styles.orb, ...styles.orb1 }} />
      <div style={{ ...styles.orb, ...styles.orb2 }} />
      <div style={{ ...styles.orb, ...styles.orb3 }} />

      {/* Falling red leaves */}
      <FallingLeaves count={24} />

      {/* Main content */}
      <div style={styles.center}>
        <span ref={emojiRef} style={styles.emoji} aria-hidden="true">
          🤭😍
        </span>

        <h1 ref={headlineRef} style={styles.headline}>
          Hey, I want to say<br />something…
        </h1>

        <p ref={subRef} style={styles.sub}>
          something straight from the heart 🌸
        </p>

        <p ref={hintRef} style={styles.hint}>
          ( tap anywhere to continue )
        </p>
      </div>
    </div>
  )
}
