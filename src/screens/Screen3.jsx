import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import FallingLeaves from '../components/FallingLeaves';

const romanticLines = [
    "Hey my love...",
    "From the moment I first saw you, my heart knew you were the one.",
    "Your smile lights up my darkest days.",
    "Every moment with you feels like a beautiful dream.",
    "I love the way you are — kind, beautiful, and so genuine.",
    "I want to create hundreds of happy memories with you.",
    "Will you go on a date with me?",
    "I can't wait to hold your hand and make this real... 💕"
];

const styles = {
    root: {
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #fff0f8 0%, #f8e6ff 40%, #f0f8ff 75%, #fff5eb 100%)',
        fontFamily: "'Playfair Display', Georgia, serif",
    },

    cafeBg: {
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI9AG8NDeEj5-JbL6hsbLguemJZDtzPjw3g2cAgOFTLstKeoM0ig7pdX00&s=10")',
        backgroundSize: 'cover',
        backgroundPosition: 'center 35%',
        filter: 'brightness(0.82) saturate(1.12)',
        zIndex: 1,
    },

    softOverlay: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(255,240,248,0.4), rgba(255,240,248,0.88))',
        zIndex: 2,
    },

    curtain: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to right, #3a2a20, #6b4e3d, #3a2a20)',
        zIndex: 5,
        transformOrigin: 'center',
    },

    tablesContainer: {
        position: 'absolute',
        bottom: '8%',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '85px',
        alignItems: 'flex-end',
        zIndex: 10,
    },

    sideTable: {
        position: 'relative',
        width: '170px',
        height: '240px',
        opacity: 0.45,
        fontSize: '3.4rem',
    },

    mainTableContainer: {
        position: 'relative',
        width: '560px',
        height: '540px',
        zIndex: 15,
    },

    boy: {
        position: 'absolute',
        left: '48px',
        bottom: '95px',
        width: '190px',
        height: '310px',
        backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH_vCVs9XTDjSgak3I25x0cVn3Ad-o7bfn6x8vTA-ZZdmPsYb9PJ8JsWw&s=10")',
        backgroundSize: 'contain',
        backgroundPosition: 'bottom center',
        backgroundRepeat: 'no-repeat',
        zIndex: 22,
        filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.35))',
    },

    girl: {
        position: 'absolute',
        right: '45px',
        bottom: '92px',
        width: '195px',
        height: '310px',
        backgroundImage: 'url("https://dreampfp.com/wp-content/uploads/2026/05/Aesthetic-Pfp-Black-And-White-2.webp")',
        backgroundSize: 'contain',
        backgroundPosition: 'bottom center',
        backgroundRepeat: 'no-repeat',
        zIndex: 22,
        filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.35))',
    },

    table: {
        position: 'absolute',
        bottom: '105px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '7.2rem',
        zIndex: 12,
    },

    // Message at the VERY TOP
    letterContainer: {
        position: 'absolute',
        top: '6%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '88%',
        maxWidth: '860px',
        zIndex: 60, // Very high
        textAlign: 'center',
        padding: '1rem',
    },

    messageLine: {
        fontSize: '24px',
        lineHeight: '140%',
        marginBottom: '2rem',
        fontStyle: 'italic',
        color: '#5c2d5c',
        textShadow: '0 4px 15px rgba(0,0,0,0.2)',
        minHeight: '80px',
    },

    continueHint: {
        position: 'absolute',
        bottom: '8%',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '1.7rem',
        color: '#c23b6f',
        cursor: 'pointer',
        zIndex: 70,
        padding: '18px 56px',
        borderRadius: '50px',
        background: 'rgba(255,255,255,0.95)',
        boxShadow: '0 15px 45px rgba(194,59,111,0.4)',
    },
};

export default function Screen3({ onNext }) {
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [showContinue, setShowContinue] = useState(false);

    const curtainRef = useRef(null);
    const boyRef = useRef(null);
    const girlRef = useRef(null);
    const messageRef = useRef(null);

    // Cinematic entrance
    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.3 });

        tl.to(curtainRef.current, { scaleX: 0, duration: 2.6, ease: "power4.inOut" })
            .fromTo(boyRef.current, { opacity: 0, x: -90 }, { opacity: 1, x: 0, duration: 2, ease: "back.out(1.5)" }, "-=1.6")
            .fromTo(girlRef.current, { opacity: 0, x: 90 }, { opacity: 1, x: 0, duration: 2, ease: "back.out(1.5)" }, "-=1.7")
            .to(girlRef.current, { y: -68, duration: 1.9, ease: "power3.out" }, "-=1.4")
            .to(girlRef.current, { y: 0, duration: 1.5, ease: "power2.in" })
            .to(boyRef.current, { y: 25, duration: 1.4, ease: "power2.in" }, "-=1.1");

        return () => tl.kill();
    }, []);

    // Sequential message
    useEffect(() => {
        let index = 0;

        const interval = setInterval(() => {
            if (index < romanticLines.length) {
                setCurrentLineIndex(index);

                // Fade in effect
                if (messageRef.current) {
                    gsap.fromTo(messageRef.current,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 1.6, ease: "power2.out" }
                    );
                }

                index++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    setShowContinue(true);
                    gsap.to(curtainRef.current.parentNode, { filter: 'brightness(0.72)', duration: 4 });
                }, 800);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={styles.root}>
            <div style={styles.cafeBg} />
            <div style={styles.softOverlay} />

            <div ref={curtainRef} style={styles.curtain} />

            <div style={styles.tablesContainer}>
                <div style={styles.sideTable}>👫</div>
                <div style={styles.sideTable}>💑</div>

                <div style={styles.mainTableContainer}>
                    <div ref={boyRef} style={{ ...styles.boy, opacity: 0 }} />
                    <div ref={girlRef} style={{ ...styles.girl, opacity: 0 }} />

                    <div style={styles.table}>🪑&nbsp;&nbsp;🍷&nbsp;&nbsp;🪑</div>

                    <div style={{ position: 'absolute', bottom: '205px', left: '44%', fontSize: '3.6rem', zIndex: 25 }}>🕯️</div>
                    <div style={{ position: 'absolute', bottom: '192px', right: '38%', fontSize: '3.4rem', zIndex: 25 }}>🌹</div>
                </div>

                <div style={styles.sideTable}>👫</div>
                <div style={styles.sideTable}>💑</div>
            </div>

            {/* Message at Top - High Visibility */}
            <div style={styles.letterContainer}>
                <h2 style={{ marginBottom: '2.2rem', fontSize: '3.1rem', color: '#c23b6f', fontStyle: 'italic' }}>
                    My Dearest...
                </h2>

                <p
                    ref={messageRef}
                    style={styles.messageLine}
                >
                    {romanticLines[currentLineIndex] || ""}
                </p>
            </div>

            {showContinue && (
                <div
                    style={styles.continueHint}
                    onClick={onNext}
                >
                    Tap to continue ✨
                </div>
            )}

            <FallingLeaves count={20} />
        </div>
    );
}