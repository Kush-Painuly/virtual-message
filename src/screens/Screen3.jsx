import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import FallingLeaves from '../components/FallingLeaves';

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
        background: 'linear-gradient(to bottom, rgba(255,240,248,0.5), rgba(255,240,248,0.85))',
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

    messageBoy: {
        position: 'absolute',
        left: '8%',
        top: '18%',
        background: 'rgba(255, 225, 235, 0.97)',
        padding: '18px 26px',
        borderRadius: '26px 26px 8px 26px',
        maxWidth: '48%',
        boxShadow: '0 15px 40px rgba(194,59,111,0.35)',
        zIndex: 35,
        fontSize: '1.22rem',
    },

    messageGirl: {
        position: 'absolute',
        right: '8%',
        top: '18%',
        background: 'rgba(225, 240, 255, 0.97)',
        padding: '18px 26px',
        borderRadius: '26px 26px 26px 8px',
        maxWidth: '48%',
        boxShadow: '0 15px 40px rgba(194,59,111,0.35)',
        zIndex: 35,
        fontSize: '1.22rem',
    },

    inputContainer: {
        position: 'absolute',
        bottom: '7%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '92%',
        maxWidth: '680px',
        zIndex: 40,
        padding: '0 10px',
    },
};

export default function Screen3({ onNext }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isBoyTurn, setIsBoyTurn] = useState(true);
    const [scene, setScene] = useState('day');

    const curtainRef = useRef(null);
    const boyRef = useRef(null);
    const girlRef = useRef(null);
    const inputRef = useRef(null);

    // Real-time messages
    useEffect(() => {
        const q = query(collection(db, "romanticChat"), orderBy("timestamp"));
        const unsubscribe = onSnapshot(q, (snap) => {
            setMessages(snap.docs.map(d => ({ ...d.data() })));
        });
        return unsubscribe;
    }, []);

    // Real-time turn sync
    useEffect(() => {
        const turnRef = doc(db, "gameState", "currentTurn");
        const unsubscribe = onSnapshot(turnRef, (docSnap) => {
            if (docSnap.exists()) {
                setIsBoyTurn(docSnap.data().isBoyTurn);
            } else {
                setDoc(turnRef, { isBoyTurn: true });
            }
        });
        return unsubscribe;
    }, []);

    // Cinematic animation (same as before)
    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.3 });
        tl.to(curtainRef.current, { scaleX: 0, duration: 2.6, ease: "power4.inOut" })
            .fromTo(boyRef.current, { opacity: 0, x: -90 }, { opacity: 1, x: 0, duration: 2, ease: "back.out(1.5)" }, "-=1.6")
            .fromTo(girlRef.current, { opacity: 0, x: 90 }, { opacity: 1, x: 0, duration: 2, ease: "back.out(1.5)" }, "-=1.7")
            .to(girlRef.current, { y: -68, duration: 1.9, ease: "power3.out" }, "-=1.4")
            .to(girlRef.current, { y: 0, duration: 1.5, ease: "power2.in" })
            .to(boyRef.current, { y: 25, duration: 1.4, ease: "power2.in" }, "-=1.1");

        tl.to(inputRef.current, { opacity: 1, y: 0, duration: 1.7, ease: "back.out(1.6)" }, "-=0.9");

        return () => tl.kill();
    }, []);

    // Night mode
    useEffect(() => {
        if (messages.length >= 5) {
            setScene('night');
            gsap.to(curtainRef.current.parentNode, { filter: 'brightness(0.72)', duration: 4.5 });
        }
    }, [messages.length]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        await addDoc(collection(db, "romanticChat"), {
            text: input.trim(),
            sender: isBoyTurn ? "boy" : "girl",
            timestamp: serverTimestamp(),
        });

        // Switch turn in Firebase
        const turnRef = doc(db, "gameState", "currentTurn");
        await setDoc(turnRef, { isBoyTurn: !isBoyTurn });

        setInput('');
    };
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

            {/* Messages */}
            {messages.slice(-5).map((msg, i) => (
                <div
                    key={i}
                    style={msg.sender === 'boy' ? styles.messageBoy : styles.messageGirl}
                >
                    <strong>{msg.sender === 'boy' ? '❤️ You' : '💕 Her'}</strong><br />
                    {msg.text}
                </div>
            ))}

            {/* Input */}
            <div ref={inputRef} style={{ ...styles.inputContainer, opacity: 0 }}>
                <div style={{ display: 'flex', gap: '12px', flexDirection: 'column', sm: { flexDirection: 'row' } }}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder={isBoyTurn ? "Tell her how special she is..." : "Waiting for her sweet reply..."}
                        disabled={!isBoyTurn}
                        style={{
                            flex: 1,
                            padding: '20px 28px',
                            fontSize: '1.2rem',
                            borderRadius: '9999px',
                            border: 'none',
                            background: isBoyTurn ? 'rgba(255,255,255,0.96)' : 'rgba(240,240,240,0.8)',
                            boxShadow: '0 15px 45px rgba(194,59,111,0.2)',
                            cursor: isBoyTurn ? 'text' : 'not-allowed',
                        }}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!isBoyTurn}
                        style={{
                            padding: '20px 48px',
                            background: isBoyTurn ? 'linear-gradient(45deg, #ff4d94, #c22b6f)' : '#ccc',
                            color: 'white',
                            border: 'none',
                            borderRadius: '9999px',
                            fontSize: '1.2rem',
                            cursor: isBoyTurn ? 'pointer' : 'not-allowed',
                            boxShadow: isBoyTurn ? '0 15px 45px rgba(255,77,148,0.4)' : 'none',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        Send 💌
                    </button>
                </div>
            </div>

            {scene === 'night' && (
                <div onClick={onNext} style={{
                    position: 'absolute',
                    bottom: '6%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '1.5rem',
                    color: '#5c2d5c',
                    cursor: 'pointer',
                    zIndex: 50,
                }}>
                    The night feels so romantic... Tap to continue ✨
                </div>
            )}

            <FallingLeaves count={20} />
        </div>
    );
}