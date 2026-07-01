import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import FallingLeaves from '../components/FallingLeaves';

const styles = {
    root: {
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #fff0f8 0%, #f8e6ff 45%, #fff5eb 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Playfair Display', Georgia, serif",
    },

    content: {
        textAlign: 'center',
        zIndex: 10,
        maxWidth: '90%',
    },

    title: {
        fontSize: 'clamp(3.2rem, 8vw, 6.5rem)',
        fontWeight: 700,
        color: '#5c2d5c',
        lineHeight: 1.1,
        marginBottom: '2rem',
        textShadow: '0 8px 30px rgba(194,59,111,0.25)',
    },

    subtitle: {
        fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)',
        color: '#c23b6f',
        fontStyle: 'italic',
        marginBottom: '3rem',
        opacity: 0.9,
    },

    heart: {
        fontSize: '5.5rem',
        margin: '2rem 0',
        display: 'block',
    },
};

export default function Screen6() {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const heartRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.4 });

        tl.fromTo(titleRef.current,
            { opacity: 0, y: 80 },
            { opacity: 1, y: 0, duration: 2.2, ease: "back.out(1.2)" }
        )
            .fromTo(heartRef.current,
                { opacity: 0, scale: 0.3, rotation: -25 },
                { opacity: 1, scale: 1, rotation: 0, duration: 1.8, ease: "elastic.out(1, 0.5)" },
                "-=1.4"
            )
            .fromTo(subtitleRef.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1.8, ease: "power3.out" },
                "-=1"
            );

        // Gentle floating hearts
        gsap.to(heartRef.current, {
            y: -25,
            duration: 3.5,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });

        return () => tl.kill();
    }, []);

    return (
        <div style={styles.root}>
            <div style={styles.content}>
                <h1 ref={titleRef} style={styles.title}>
                    I love you more<br />than you know
                </h1>

                <span ref={heartRef} style={styles.heart}>💖</span>

                <p ref={subtitleRef} style={styles.subtitle}>
                    Forever &amp; always, my love 🌹
                </p>
            </div>

            {/* Romantic floating flowers */}
            <FallingLeaves count={28} />

            {/* Final touch */}
            <div style={{
                position: 'absolute',
                bottom: '8%',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '1.1rem',
                color: '#c23b6f',
                opacity: 0.8,
                zIndex: 20,
            }}>
                Made with all my love for you 💕
            </div>
        </div>
    );
}