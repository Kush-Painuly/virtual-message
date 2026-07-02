import React, { useEffect, useRef, useState } from 'react';
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
        background: 'rgba(0,0,0,0.4)',
        zIndex: 2,
    },
    content: {
        position: 'absolute',
        bottom: '8%',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        zIndex: 3,
        color: 'white',
        textShadow: '0 4px 20px rgba(0,0,0,0.7)',
        width: '90%',
        maxWidth: '800px',
    },
    title: {
        fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
        fontWeight: 700,
        marginBottom: '0.8rem',
        letterSpacing: '1px',
    },
    subtitle: {
        fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
        fontStyle: 'italic',
        opacity: 0.95,
    },
    imageContainer: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '380px',
        height: '520px',
        border: '12px solid rgba(255,255,255,0.9)',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
        zIndex: 10,
        opacity: 0,
    },
};

const memoryImages = [
    "https://static.vecteezy.com/system/resources/thumbnails/035/929/121/small/ai-generated-romantic-couple-in-love-on-the-background-of-a-beautiful-sunset-a-couple-embracing-in-front-of-a-vibrant-valentine-s-day-sunset-ai-generated-free-photo.jpg", // Replace with your 8 images
    "https://img.magnific.com/free-photo/illustration-anime-city_23-2151779628.jpg?w=360",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBrJNMD-R3-7IlEH37qf3ekbXp-32zRPxN730WBxEAS3wTAEXo1Zgdbfk&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4AHYcVQ5_ApmTihUO5yaQPtZuGwX07B4XUY0-nIMYxg&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwgOOsNl9ueXNwGYT8X6W1pQ2G6ew5_rbKjVk9T3hIhY4ijA3EWzMnHI8z&s=10",
    "https://www.zastavki.com/pictures/600x382/2024/Anime_Anime_couple_with_sparklers_near_the_water_172994_33.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvr7KGlgxFD1oNO_bJiOQHfa0Urkz_cT8XaAMdxnwnZaOlUrFyyl-RHJHY&s=10",
    "https://w0.peakpx.com/wallpaper/92/525/HD-wallpaper-girl-listening-boy-playing-guitar-watching-sunshine-love-couple-artist-artwork-digital-art-artstation-thumbnail.jpg",
];

export default function Screen5({ onNext }) {
    const videoRef = useRef(null);
    const audioRef = useRef(null);
    const contentRef = useRef(null);
    const imageRef = useRef(null);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLeftSide, setIsLeftSide] = useState(true);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(contentRef.current,
            { opacity: 0, y: 60 },
            { opacity: 1, y: 0, duration: 2.2, ease: "power3.out" }
        );

        if (videoRef.current) videoRef.current.play().catch(() => { });
        if (audioRef.current) {
            audioRef.current.volume = 0.6;
            audioRef.current.play().catch(() => { });
        }

        // Image slideshow
        const imageInterval = setInterval(() => {
            const nextIndex = (currentImageIndex + 1) % memoryImages.length;
            const nextSide = !isLeftSide;

            // Fade out current
            gsap.to(imageRef.current, {
                opacity: 0,
                duration: 1.2,
                onComplete: () => {
                    setCurrentImageIndex(nextIndex);
                    setIsLeftSide(nextSide);

                    // Fade in new image
                    gsap.fromTo(imageRef.current,
                        { opacity: 0, x: nextSide ? -80 : 80 },
                        { opacity: 1, x: 0, duration: 1.8, ease: "power2.out" }
                    );
                }
            });
        }, 30000); // 30 seconds per image

        return () => {
            clearInterval(imageInterval);
            if (audioRef.current) audioRef.current.pause();
        };
    }, [currentImageIndex, isLeftSide]);

    return (
        <div style={styles.root}>
            {/* Background Video */}
            <video
                ref={videoRef}
                style={styles.videoBg}
                autoPlay
                loop
                muted
                playsInline
            >
                <source src={RomDance} type="video/mp4" />
            </video>

            <div style={styles.overlay} />

            {/* Memory Images Slideshow */}
            <div
                ref={imageRef}
                style={{
                    ...styles.imageContainer,
                    left: isLeftSide ? '12%' : 'auto',
                    right: isLeftSide ? 'auto' : '12%',
                }}
            >
                <img
                    src={memoryImages[currentImageIndex]}
                    alt="Memory"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>

            {/* Romantic Text at Bottom */}
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

            <FallingLeaves count={18} />

            {/* Click to continue */}
            <div
                onClick={onNext}
                style={{
                    position: 'absolute',
                    bottom: '5%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: 'white',
                    fontSize: '1.35rem',
                    cursor: 'pointer',
                    zIndex: 50,
                    textShadow: '0 4px 15px rgba(0,0,0,0.6)',
                    padding: '14px 38px',
                    border: '2px solid rgba(255,255,255,0.7)',
                    borderRadius: '50px',
                }}
            >
                Click to continue our story ✨
            </div>
        </div>
    );
}