import React, { useState, useEffect, useRef } from "react";
import { FlameIcon, Volume2Icon, VolumeXIcon } from "lucide-react";

/**
 * A premium glassmorphic modal that displays a savage roast text (with a typewriter animation),
 * a dynamically fetched meme (GIF or transparent sticker), and a viral sound effect.
 *
 * Props:
 *  - isOpen: boolean
 *  - text: string (the roast)
 *  - gifUrl: string (media URL from Giphy/Tenor)
 *  - mediaType: "gif" | "sticker" (controls how the image renders)
 *  - soundUrl: string (meme sound effect mp3 URL)
 *  - onClose: function
 */
function RoastModal({ isOpen, text, gifUrl, mediaType, soundUrl, onClose }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // Play sound effect when modal opens
  useEffect(() => {
    if (!isOpen || !soundUrl) return;

    const audio = new Audio(soundUrl);
    audio.volume = 0.5;
    audioRef.current = audio;

    audio.play().catch((e) => {
      console.warn("Autoplay blocked by browser:", e.message);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div
        className="bg-neutral-900 border border-solid border-[#FF3B30]/30 shadow-[0_0_50px_rgba(255,59,48,0.25)] rounded-2xl max-w-md w-full p-6 flex flex-col items-center text-center gap-5 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #151515 50%, #FF3B3015 100%)",
        }}
      >
        {/* Sound toggle */}
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors z-10"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeXIcon className="size-5" />
          ) : (
            <Volume2Icon className="size-5" />
          )}
        </button>

        {/* Animated Header */}
        <div className="flex items-center gap-2 text-[#FF3B30] font-extrabold text-2xl uppercase tracking-widest animate-pulse">
          <FlameIcon className="size-6 animate-bounce" />
          <span>Note Saved!</span>
          <FlameIcon className="size-6 animate-bounce" />
        </div>

        {/* Dynamic Media Display */}
        {gifUrl && (
          <div className={`w-full flex items-center justify-center ${isSticker ? "" : "relative"}`}>
            <img
              src={gifUrl}
              alt="Meme Roast"
              className={
                isSticker
                  ? "max-h-56 object-contain drop-shadow-[0_0_20px_rgba(255,59,48,0.3)]"
                  : "w-full h-56 object-cover rounded-xl border border-solid border-white/10 shadow-lg"
              }
            />
            {!isSticker && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />
            )}
          </div>
        )}

        {/* Media type badge */}
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold border-b border-solid border-neutral-800 pb-1">
            Critique Assessment
          </span>
          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FF3B30]/20 text-[#FF3B30] font-bold">
            {isSticker ? "🎯 Sticker" : "🎬 GIF"}
          </span>
        </div>

        {/* Sarcastic Typewriter Roast Text */}
        <div className="min-h-16 flex items-center justify-center px-2">
          <p className="text-base text-white font-medium leading-relaxed italic">
            &quot;{displayedText}&quot;
            <span className="inline-block w-1.5 h-4 ml-1 bg-[#FF3B30] animate-pulse" />
          </p>
        </div>

        {/* Action button */}
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
