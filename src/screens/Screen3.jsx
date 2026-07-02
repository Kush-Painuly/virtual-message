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
        background: 'linear-gradient(to bottom, rgba(255,240,248,0.45), rgba(255,240,248,0.88))',
        zIndex: 2,
    },

    curtain: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to right, #3a2a20, #6b4e3d, #3a2a20)',
        zIndex: 100,
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

    chef: {
        position: 'absolute',
        top: '85px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '3.8rem',
        zIndex: 18,
    },

    letterContainer: {
        position: 'absolute',
        top: '8%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '86%',
        maxWidth: '820px',
        zIndex: 40,
        textAlign: 'center',
        padding: '1.5rem',
    },

    messageLine: {
        fontSize: '1.72rem',
        lineHeight: 1.95,
        marginBottom: '1.8rem',
        fontStyle: 'italic',
        color: '#5c2d5c',
        opacity: 1,
        transform: 'translateY(30px)',
        letterSpacing: '0.6px',
    },

    continueHint: {
        position: 'absolute',
        bottom: '8%',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '1.6rem',
        color: '#c23b6f',
        cursor: 'pointer',
        zIndex: 50,
        padding: '16px 48px',
        borderRadius: '50px',
        background: 'rgba(255,255,255,0.92)',
        boxShadow: '0 15px 40px rgba(194,59,111,0.3)',
    },
};

export default function Screen3({ onNext }) {
    const [lines, setLines] = useState([]);
    const [showContinue, setShowContinue] = useState(false);

    const curtainRef = useRef(null);
    const boyRef = useRef(null);
    const girlRef = useRef(null);
    const lineRefs = useRef([]);

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

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < romanticLines.length) {
                setLines(prev => [...prev, romanticLines[index]]);

                setTimeout(() => {
                    if (lineRefs.current[index]) {
                        gsap.to(lineRefs.current[index], {
                            opacity: 1,
                            y: 0,
                            duration: 1.8,
                            ease: "power3.out"
                        });
                    }
                }, 120);

                index++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    setShowContinue(true);
                    gsap.to(curtainRef.current.parentNode, { filter: 'brightness(0.72)', duration: 4 });
                }, 1100);
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
                    <div style={styles.chef}>👨‍🍳</div>

                    <div ref={boyRef} style={{ ...styles.boy, opacity: 0 }} />
                    <div ref={girlRef} style={{ ...styles.girl, opacity: 0 }} />

                    <div style={styles.table}>🪑&nbsp;&nbsp;🍷&nbsp;&nbsp;🪑</div>

                    <div style={{ position: 'absolute', bottom: '205px', left: '44%', fontSize: '3.6rem', zIndex: 25 }}>🕯️</div>
                    <div style={{ position: 'absolute', bottom: '192px', right: '38%', fontSize: '3.4rem', zIndex: 25 }}>🌹</div>
                </div>

                <div style={styles.sideTable}>👫</div>
                <div style={styles.sideTable}>💑</div>
            </div>

            {/* Elegant Message at Top */}
            <div style={styles.letterContainer}>
                <h2 style={{ marginBottom: '2.8rem', fontSize: '2.9rem', color: '#c23b6f', fontStyle: 'italic' }}>
                    My Dearest...
                </h2>

                {lines.map((line, i) => (
                    <p
                        key={i}
                        ref={el => lineRefs.current[i] = el}
                        style={styles.messageLine}
                    >
                        {line}
                    </p>
                ))}
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