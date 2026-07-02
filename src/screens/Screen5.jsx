import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import FallingLeaves from '../components/FallingLeaves';
import RomDance from "../../public/rom-dance.mp4";
import DieWithASmile from "../../public/bg-music.mp3";

const styles = {
    root: {
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#000',
    },
    videoBg: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        minWidth: '100%',
        minHeight: '100%',
        width: 'auto',
        height: 'auto',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
        objectFit: 'cover',
    },
    overlay: {
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.35)',
        zIndex: 2,
    },
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        zIndex: 3,
        color: 'white',
        textShadow: '0 4px 20px rgba(0,0,0,0.7)',
    },
    title: {
        fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
        fontWeight: 700,
        marginBottom: '1.5rem',
        letterSpacing: '2px',
    },
    subtitle: {
        fontSize: 'clamp(1.3rem, 3vw, 2rem)',
        fontStyle: 'italic',
        opacity: 0.95,
    },
};

export default function Screen5({ onNext }) {
    const videoRef = useRef(null);
    const audioRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(contentRef.current,
            { opacity: 0, y: 60 },
            { opacity: 1, y: 0, duration: 2.2, ease: "power3.out" }
        );

        // Auto play music and video
        if (videoRef.current) videoRef.current.play().catch(() => { });
        if (audioRef.current) {
            audioRef.current.volume = 0.6;
            audioRef.current.play().catch(() => { });
        }

        // Stop music after ~30 seconds
        const timer = setTimeout(() => {
            if (audioRef.current) audioRef.current.pause();
        }, 30000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={styles.root}>
            {/* Background Video - Couple Dancing in Rain */}
            <video
                ref={videoRef}
                style={styles.videoBg}
                autoPlay
                loop
                muted
                playsInline
            >
                <source src={RomDance} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div style={styles.overlay} />

            {/* Romantic Text Overlay */}
            <div ref={contentRef} style={styles.content}>
                <h1 style={styles.title}>Dancing with you...</h1>
                <p style={styles.subtitle}>
                    in the rain, under the stars<br />
                    feels like a dream come true 💕
                </p>
            </div>

            {/* Background Music */}
            <audio ref={audioRef} loop>
                <source src={DieWithASmile} type="audio/mpeg" />
            </audio>

            {/* Floating Leaves */}
            <FallingLeaves count={18} />

            {/* Click to continue */}
            <div
                onClick={onNext}
                style={{
                    position: 'absolute',
                    bottom: '8%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: 'white',
                    fontSize: '1.3rem',
                    cursor: 'pointer',
                    zIndex: 50,
                    textShadow: '0 4px 15px rgba(0,0,0,0.6)',
                    padding: '12px 32px',
                    border: '2px solid rgba(255,255,255,0.6)',
                    borderRadius: '50px',
                }}
            >
                Click to continue our story ✨
            </div>
        </div>
    );
}