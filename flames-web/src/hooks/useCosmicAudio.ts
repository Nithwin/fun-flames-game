import { useRef, useEffect, useCallback } from 'react';

// Using local audio files to avoid CORS issues
const BG_MUSIC_URL = '/audio/bg-music.mp3';
const SPARKLE_SFX_URL = '/audio/sparkle.mp3';

// Local music files for each result type
const RESULT_AUDIO_URLS: Record<string, string> = {
    'Lovers': '/audio/lovers.mp3',
    'Marriage': '/audio/lovers.mp3', // Same romantic vibe
    'Enemies': '/audio/enemies.mp3',
    'Friends': '/audio/friends.mp3',
    'Affectionate': '/audio/affectionate.mp3',
    'Siblings': '/audio/siblings.mp3'
};

export const useCosmicAudio = () => {
    const bgAudioRef = useRef<HTMLAudioElement | null>(null);
    const resultAudioRef = useRef<HTMLAudioElement | null>(null);
    const sparkleAudioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Initialize Background Music (Calculating phase)
        bgAudioRef.current = new Audio(BG_MUSIC_URL);
        bgAudioRef.current.loop = true;
        bgAudioRef.current.volume = 0.4;

        // Initialize Sparkle SFX
        sparkleAudioRef.current = new Audio(SPARKLE_SFX_URL);
        sparkleAudioRef.current.volume = 0.6;

        return () => {
            if (bgAudioRef.current) {
                bgAudioRef.current.pause();
                bgAudioRef.current = null;
            }
            if (resultAudioRef.current) {
                resultAudioRef.current.pause();
                resultAudioRef.current = null;
            }
            if (sparkleAudioRef.current) {
                sparkleAudioRef.current = null;
            }
        };
    }, []);

    const playMusic = useCallback(() => {
        if (bgAudioRef.current) {
            bgAudioRef.current.currentTime = 0;
            bgAudioRef.current.play().catch(() => {
                console.log("Audio play blocked by browser. Waiting for interaction.");
            });
        }
    }, []);

    const playSparkle = useCallback(() => {
        if (sparkleAudioRef.current) {
            const clone = sparkleAudioRef.current.cloneNode() as HTMLAudioElement;
            clone.play().catch(() => {});
        }
    }, []);

    const playResultMusic = useCallback((result: string) => {
        // Stop current background music
        if (bgAudioRef.current) {
            bgAudioRef.current.pause();
        }

        // Play result-specific song
        const url = RESULT_AUDIO_URLS[result] || RESULT_AUDIO_URLS['Friends'];
        if (resultAudioRef.current) {
            resultAudioRef.current.pause();
        }
        
        resultAudioRef.current = new Audio(url);
        resultAudioRef.current.volume = 0.5;
        resultAudioRef.current.play().catch(e => console.log("Result music blocked", e));
    }, []);

    const stopAllMusic = useCallback(() => {
        if (bgAudioRef.current) {
            bgAudioRef.current.pause();
            bgAudioRef.current.currentTime = 0;
        }
        if (resultAudioRef.current) {
            resultAudioRef.current.pause();
            resultAudioRef.current.currentTime = 0;
        }
    }, []);

    return { playMusic, playSparkle, playResultMusic, stopAllMusic };
};
