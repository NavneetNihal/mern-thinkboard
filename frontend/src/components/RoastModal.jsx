import React, { useState, useEffect } from "react";
import { FlameIcon } from "lucide-react";

/**
 * A premium glassmorphic modal that displays a savage roast text (with a typewriter animation)
 * and a funny Giphy GIF to mock the user upon saving a note.
 */
function RoastModal({ isOpen, text, gifUrl, onClose }) {
  const [displayedText, setDisplayedText] = useState("");

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
    }, 25); // Speed of typing: 25ms per character

    return () => clearInterval(interval);
  }, [isOpen, text]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md animate-fade-in p-4">
      <div 
        className="bg-neutral-900 border border-solid border-[#FF3B30]/30 shadow-[0_0_50px_rgba(255,59,48,0.25)] rounded-2xl max-w-md w-full p-6 flex flex-col items-center text-center gap-5 transition-all transform scale-100 duration-300 relative overflow-hidden"
        style={{ background: "radial-gradient(125% 125% at 50% 10%, #151515 50%, #FF3B3015 100%)" }}
      >
        {/* Animated Header */}
        <div className="flex items-center gap-2 text-[#FF3B30] font-extrabold text-2xl uppercase tracking-widest animate-pulse">
          <FlameIcon className="size-6 animate-bounce" />
          <span>Note Saved!</span>
          <FlameIcon className="size-6 animate-bounce" />
        </div>

        {/* Dynamic GIF Display */}
        {gifUrl && (
          <div className="w-full relative group">
            <img 
              src={gifUrl} 
              alt="Meme Roast" 
              className="w-full h-56 object-cover rounded-xl border border-solid border-white/10 shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />
          </div>
        )}

        {/* Sarcastic Subtitle */}
        <div className="text-xs uppercase tracking-widest text-neutral-400 font-semibold border-b border-solid border-neutral-800 pb-2 w-full">
          Critique Assessment
        </div>

        {/* Sarcastic Typewriter Roast Text */}
        <div className="min-h-16 flex items-center justify-center px-2">
          <p className="text-base text-white font-medium leading-relaxed italic">
            "{displayedText}"
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
