import React, { useEffect, useRef, useCallback } from 'react'
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
        userSelect: 'none',
    },
    orb: {
        position: 'absolute',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 1,
    },
    orb1: {
        width: '420px', height: '420px',
        background: 'radial-gradient(circle, #ffb3cc88 0%, transparent 70%)',
        top: '-100px', left: '-100px',
    },
    orb2: {
        width: '350px', height: '350px',
        background: 'radial-gradient(circle, #ffd0a866 0%, transparent 70%)',
        bottom: '-80px', right: '-80px',
    },
    center: {
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2.2rem',
    },
    emoji: {
        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
        lineHeight: 1,
        opacity: 0,
        display: 'block',
    },
    question: {
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: 'clamp(1.6rem, 4.5vw, 2.8rem)',
        fontWeight: 700,
        color: '#c23b6f',
        lineHeight: 1.3,
        letterSpacing: '-0.2px',
        textShadow: '0 2px 20px rgba(194,59,111,0.15)',
        opacity: 0,
    },
    btnRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        justifyContent: 'center',
        opacity: 0,
        // overflow visible so No can fly outside the row bounds
        overflow: 'visible',
    },
    yesBtn: {
        fontFamily: "'Lato', sans-serif",
        fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
        fontWeight: 700,
        letterSpacing: '0.5px',
        padding: '0.85rem 2.6rem',
        borderRadius: '50px',
        border: 'none',
        cursor: 'pointer',
        background: 'linear-gradient(135deg, #e84393 0%, #c23b6f 100%)',
        color: '#fff',
        boxShadow: '0 6px 24px rgba(194,59,111,0.35)',
        outline: 'none',
        whiteSpace: 'nowrap',
        flexShrink: 0,
    },
    noBtn: {
        fontFamily: "'Lato', sans-serif",
        fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
        fontWeight: 400,
        letterSpacing: '0.4px',
        padding: '0.8rem 2.2rem',
        borderRadius: '50px',
        border: '1.5px solid #f0a0c0',
        cursor: 'not-allowed',
        background: 'rgba(255,255,255,0.6)',
        color: '#d46090',
        outline: 'none',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        // position relative so GSAP x/y transforms move it freely
        position: 'relative',
    },
    hint: {
        fontFamily: "'Lato', sans-serif",
        fontSize: '0.78rem',
        color: '#e8a0ba',
        letterSpacing: '0.8px',
        opacity: 0,
        fontStyle: 'italic',
    },
}

export default function Screen2({ onNext }) {
    const emojiRef = useRef(null)
    const questionRef = useRef(null)
    const btnRowRef = useRef(null)
    const hintRef = useRef(null)
    const yesBtnRef = useRef(null)
    const noBtnRef = useRef(null)

    const quickX = useRef(null)
    const quickY = useRef(null)

    // Set up quickTo after mount
    useEffect(() => {
        const noEl = noBtnRef.current
        if (!noEl) return
        gsap.set(noEl, { x: 0, y: 0 })
        quickX.current = gsap.quickTo(noEl, 'x', { duration: 0.65, ease: 'power3.out' })
        quickY.current = gsap.quickTo(noEl, 'y', { duration: 0.65, ease: 'power3.out' })
    }, [])

    // Entrance timeline
    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.2 })

        tl.to(emojiRef.current, {
            opacity: 1, scale: 1, duration: 0.9, ease: 'elastic.out(1, 0.55)',
        })
            .to(questionRef.current, {
                opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            }, '-=0.3')
            .to(btnRowRef.current, {
                opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
            }, '-=0.3')
            .to(hintRef.current, {
                opacity: 0.7, duration: 0.6,
            }, '-=0.1')

        gsap.to(emojiRef.current, {
            y: -8, duration: 2, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1.5,
        })
        gsap.to(yesBtnRef.current, {
            boxShadow: '0 8px 32px rgba(194,59,111,0.55)',
            scale: 1.04, duration: 1.2, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1.8,
        })

        return () => tl.kill()
    }, [])

    const handleMouseMove = useCallback((e) => {
        const noEl = noBtnRef.current
        if (!noEl || !quickX.current || !quickY.current) return

        const noRect = noEl.getBoundingClientRect()
        const noCX = noRect.left + noRect.width / 2
        const noCY = noRect.top + noRect.height / 2

        const dx = e.clientX - noCX
        const dy = e.clientY - noCY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const TRIGGER = 160

        if (dist < TRIGGER) {
            const angle = Math.atan2(dy, dx)
            const strength = (1 - dist / TRIGGER) * 260

            // Current GSAP x/y on the element
            const curX = gsap.getProperty(noEl, 'x')
            const curY = gsap.getProperty(noEl, 'y')

            let newX = curX - Math.cos(angle) * strength
            let newY = curY - Math.sin(angle) * strength

            // Clamp so it doesn't leave the viewport
            const pad = 16
            const originRect = noEl.getBoundingClientRect()
            const maxDX = window.innerWidth - originRect.right - pad
            const maxDY_down = window.innerHeight - originRect.bottom - pad
            const maxDX_left = -(originRect.left - pad)
            const maxDY_up = -(originRect.top - pad)

            newX = Math.max(curX + maxDX_left, Math.min(curX + maxDX, newX))
            newY = Math.max(curY + maxDY_up, Math.min(curY + maxDY_down, newY))

            quickX.current(newX)
            quickY.current(newY)
        } else {
            // Gently drift back to original position when mouse is far
            quickX.current(0)
            quickY.current(0)
        }
    }, [])

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [handleMouseMove])

    const handleYes = () => {
        gsap.to(
            [emojiRef.current, questionRef.current, btnRowRef.current, hintRef.current],
            { opacity: 0, y: -20, duration: 0.5, stagger: 0.06, ease: 'power2.in', onComplete: onNext }
        )
    }

    const handleYesHover = (e) => gsap.to(e.currentTarget, { scale: 1.08, duration: 0.2, ease: 'power2.out' })
    const handleYesLeave = (e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: 'power2.out' })

    return (
        <div style={styles.root} onMouseMove={handleMouseMove}>
            <div style={{ ...styles.orb, ...styles.orb1 }} />
            <div style={{ ...styles.orb, ...styles.orb2 }} />
            <FallingLeaves count={24} />

            <div style={styles.center}>
                <span ref={emojiRef} style={{ ...styles.emoji, transform: 'scale(0.3)' }} aria-hidden="true">
                    🥺💖
                </span>

                <h1 ref={questionRef} style={{ ...styles.question, transform: 'translateY(28px)' }}>
                    Do you want to go<br />on a date? 🌹
                </h1>

                <div ref={btnRowRef} style={{ ...styles.btnRow, transform: 'translateY(16px)' }}>
                    <button
                        ref={yesBtnRef}
                        style={styles.yesBtn}
                        onClick={handleYes}
                        onMouseEnter={handleYesHover}
                        onMouseLeave={handleYesLeave}
                    >
                        Yes! 🥰
                    </button>

                    <button ref={noBtnRef} style={styles.noBtn} tabIndex={-1} aria-label="No">
                        No 🙅‍♀️
                    </button>
                </div>

                <p ref={hintRef} style={styles.hint}>
                    there's only one right answer here 😉
                </p>
            </div>
        </div>
    )
}