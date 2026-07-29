import React, { useState, useEffect, useRef } from "react";
import { FlameIcon, Volume2Icon, VolumeXIcon, MusicIcon } from "lucide-react";

/**
 * A premium glassmorphic modal that displays a savage roast text (with a typewriter animation),
 * a dynamically fetched viral meme (GIF or transparent sticker), and a viral audio sound effect.
 *
 * Props:
 *  - isOpen: boolean
 *  - text: string (the roast)
 *  - gifUrl: string (media URL from Giphy)
 *  - mediaType: "gif" | "sticker"
 *  - soundUrl: string (viral sound audio URL)
 *  - soundName: string (viral sound label e.g., "Faah / Huh Meme 🔊")
 *  - onClose: function
 */
function RoastModal({ isOpen, text, gifUrl, mediaType, soundUrl, soundName, onClose }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Play viral sound effect when modal opens
  useEffect(() => {
    if (!isOpen || !soundUrl) return;

    const audio = new Audio(soundUrl);
    audio.volume = 0.55;
    audioRef.current = audio;

    audio.onplay = () => setIsPlaying(true);
    audio.onended = () => setIsPlaying(false);
    audio.onpause = () => setIsPlaying(false);

    audio.play().catch((e) => {
      console.warn("Autoplay blocked by browser policy:", e.message);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    };
  }, [isOpen, soundUrl]);

  // Typewriter text animation
  useEffect(() => {
    if (!isOpen || !text) return;

    let index = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 22);

    return () => clearInterval(interval);
  }, [isOpen, text]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  if (!isOpen) return null;

  const isSticker = mediaType === "sticker";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in">
      <div
        className="bg-neutral-900 border border-solid border-[#FF3B30]/30 shadow-[0_0_50px_rgba(255,59,48,0.25)] rounded-2xl max-w-md w-full p-6 flex flex-col items-center text-center gap-4 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #151515 50%, #FF3B3015 100%)",
        }}
      >
        {/* Mute/Unmute audio button */}
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors z-10 p-1 rounded-full bg-black/40 border border-white/10"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeXIcon className="size-5 text-red-400" />
          ) : (
            <Volume2Icon className="size-5 text-green-400" />
          )}
        </button>

        {/* Header Title */}
        <div className="flex items-center gap-2 text-[#FF3B30] font-extrabold text-2xl uppercase tracking-widest animate-pulse">
          <FlameIcon className="size-6 animate-bounce" />
          <span>Note Saved!</span>
          <FlameIcon className="size-6 animate-bounce" />
        </div>

        {/* Dynamic Giphy Viral Media Display */}
        {gifUrl && (
          <div className={`w-full flex items-center justify-center ${isSticker ? "py-2" : "relative"}`}>
            <img
              src={gifUrl}
              alt="Viral Meme Roast"
              className={
                isSticker
                  ? "max-h-52 object-contain drop-shadow-[0_0_25px_rgba(255,59,48,0.4)] animate-pulse"
                  : "w-full h-52 object-cover rounded-xl border border-solid border-white/10 shadow-lg"
              }
            />
            {!isSticker && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />
            )}
          </div>
        )}

        {/* Media & Audio Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {/* Media type badge */}
          <span className="text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-neutral-800 border border-white/10 text-neutral-300 font-bold">
            {isSticker ? "🎯 Sticker" : "🎬 GIF"}
          </span>

          {/* Viral Sound Badge */}
          {soundName && (
            <span className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider px-3 py-1 rounded-full bg-[#FF3B30]/20 border border-[#FF3B30]/40 text-[#FF3B30]">
              <MusicIcon className="size-3.5" />
              <span>{soundName}</span>
              
              {/* Equalizer Animation */}
              {isPlaying && !isMuted && (
                <span className="flex items-end gap-0.5 h-3 ml-1">
                  <span className="w-0.5 bg-[#FF3B30] h-full animate-pulse" />
                  <span className="w-0.5 bg-[#FF3B30] h-2/3 animate-ping" />
                  <span className="w-0.5 bg-[#FF3B30] h-full animate-bounce" />
                </span>
              )}
            </span>
          )}
        </div>

        {/* Sarcastic Typewriter Roast Text */}
        <div className="min-h-16 flex items-center justify-center px-2 py-1">
          <p className="text-base text-white font-medium leading-relaxed italic">
            &quot;{displayedText}&quot;
            <span className="inline-block w-1.5 h-4 ml-1 bg-[#FF3B30] animate-pulse" />
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn btn-error w-full font-bold tracking-widest uppercase transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02] border-none bg-gradient-to-r from-[#FF3B30] to-[#E02B20] text-white"
        >
          Ouch. I Accept the Damage
        </button>
      </div>
    </div>
  );
}

export default RoastModal;
