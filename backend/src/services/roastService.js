import dotenv from "dotenv";
dotenv.config();

// ─────────────────────────────────────────────────────────────
// 52+ MEGA VIRAL INSTAGRAM & TIKTOK SOUNDBOARD LIBRARY (2026)
// ─────────────────────────────────────────────────────────────
const VIRAL_SOUNDS = [
  { name: "Faaaaaaa! 🎺🔥", url: "https://www.myinstants.com/media/sounds/faah.mp3" },
  { name: "Faaah Insta Meme 🎺", url: "https://www.myinstants.com/media/sounds/faah_1.mp3" },
  { name: "Huh Cat / What?! 🔊", url: "https://www.myinstants.com/media/sounds/huh-cat-meme-sound.mp3" },
  { name: "Vine Boom 💥", url: "https://www.myinstants.com/media/sounds/vine-boom.mp3" },
  { name: "Emotional Damage! 💔", url: "https://www.myinstants.com/media/sounds/emotional-damage-meme.mp3" },
  { name: "Bruh Moment 🤦‍♂️", url: "https://www.myinstants.com/media/sounds/bruh.mp3" },
  { name: "Oh No No No Laugh 😭", url: "https://www.myinstants.com/media/sounds/oh-no-no-no-tik-tok-sound-effect.mp3" },
  { name: "FBI Open Up! 🚨", url: "https://www.myinstants.com/media/sounds/fbi-open-up-sfx.mp3" },
  { name: "Robert B. Weide Theme 🎬", url: "https://www.myinstants.com/media/sounds/directed-by-robert-b-weide.mp3" },
  { name: "GigaChad Theme 🗿", url: "https://www.myinstants.com/media/sounds/gigachad-theme.mp3" },
  { name: "Sad Violin 🎻", url: "https://www.myinstants.com/media/sounds/sadviolin.mp3" },
  { name: "Metal Pipe Falling 🔔", url: "https://www.myinstants.com/media/sounds/metal-pipe-falling-sound-effect.mp3" },
  { name: "The Rock Sus Eyebrow 🤨", url: "https://www.myinstants.com/media/sounds/the-rock-sus.mp3" },
  { name: "Roblox Death Oof 💀", url: "https://www.myinstants.com/media/sounds/oof_x200.mp3" },
  { name: "Taco Bell Bong 🔔", url: "https://www.myinstants.com/media/sounds/taco-bell-bong-sfx.mp3" },
  { name: "Windows XP Fatal Error 💻", url: "https://www.myinstants.com/media/sounds/windows-xp-error.mp3" },
  { name: "Bombastic Side Eye 👁️", url: "https://www.myinstants.com/media/sounds/bombastic-side-eye.mp3" },
  { name: "Criminal Side Eye 😒", url: "https://www.myinstants.com/media/sounds/side-eye-meme.mp3" },
  { name: "Heheheha Laugh 👑", url: "https://www.myinstants.com/media/sounds/clash-royale-heheheha.mp3" },
  { name: "Aww Hell Nah 🙅‍♂️", url: "https://www.myinstants.com/media/sounds/aww-hell-nah.mp3" },
  { name: "Hold Up Wait A Minute ✋", url: "https://www.myinstants.com/media/sounds/hold-up-wait-a-minute.mp3" },
  { name: "Why You Always Lying 🎶", url: "https://www.myinstants.com/media/sounds/why-you-always-lying.mp3" },
  { name: "Screaming Goat 🐐", url: "https://www.myinstants.com/media/sounds/screaming-goat.mp3" },
  { name: "Run Meme Beat 🏃‍♂️", url: "https://www.myinstants.com/media/sounds/run-meme-sound.mp3" },
  { name: "iPhone Trap Ringtone 📱", url: "https://www.myinstants.com/media/sounds/iphone-trap-remix.mp3" },
  { name: "Nani?! ⚡", url: "https://www.myinstants.com/media/sounds/nani.mp3" },
  { name: "SpongeBob Fail Flute 🪈", url: "https://www.myinstants.com/media/sounds/spongebob-fail.mp3" },
  { name: "Among Us Role Reveal 📮", url: "https://www.myinstants.com/media/sounds/among-us-role-reveal-sound.mp3" },
  { name: "Among Us Emergency 🚨", url: "https://www.myinstants.com/media/sounds/emergency-meeting-among-us.mp3" },
  { name: "Inception BWAAAH 📢", url: "https://www.myinstants.com/media/sounds/inception-horn.mp3" },
  { name: "Dun Dun Dun! 🥁", url: "https://www.myinstants.com/media/sounds/dun-dun-dun.mp3" },
  { name: "Price is Right Losing Horn 🎺", url: "https://www.myinstants.com/media/sounds/the-price-is-right-losing-horn.mp3" },
  { name: "Fortnite Knockdown 🎮", url: "https://www.myinstants.com/media/sounds/fortnite-knocked-down.mp3" },
  { name: "Anime Wow Sound 🌟", url: "https://www.myinstants.com/media/sounds/wow-so-cool.mp3" },
  { name: "Wasted (GTA V) 🚗", url: "https://www.myinstants.com/media/sounds/gta-v-wasted.mp3" },
  { name: "Hitmarker CoD 🎯", url: "https://www.myinstants.com/media/sounds/hitmarker-sound.mp3" },
  { name: "No God Please No 😭", url: "https://www.myinstants.com/media/sounds/no-god-please-no.mp3" },
  { name: "Sigma Male Grindset 🕶️", url: "https://www.myinstants.com/media/sounds/sigma-male.mp3" },
  { name: "Sheesh! 🗣️", url: "https://www.myinstants.com/media/sounds/sheesh-sound.mp3" },
  { name: "Airhorn Triple Blast 📯", url: "https://www.myinstants.com/media/sounds/mlg-airhorn.mp3" },
  { name: "Sarcastic Applause 👏", url: "https://www.myinstants.com/media/sounds/applause-sound-effect.mp3" },
  { name: "Cricket Chirps 🦗", url: "https://www.myinstants.com/media/sounds/cricket-chirp.mp3" },
  { name: "Record Scratch 🎙️", url: "https://www.myinstants.com/media/sounds/record-scratch.mp3" },
  { name: "Slip Cartoon Fall 🍌", url: "https://www.myinstants.com/media/sounds/cartoon-slip.mp3" },
  { name: "Windows Shutdown 🔌", url: "https://www.myinstants.com/media/sounds/windows-xp-shutdown.mp3" },
  { name: "Keyboard Fury Typing ⌨️", url: "https://www.myinstants.com/media/sounds/fast-keyboard-typing.mp3" },
  { name: "What the Dog Doin 🐶", url: "https://www.myinstants.com/media/sounds/what-the-dog-doin.mp3" },
  { name: "Bing Chilling 🍦", url: "https://www.myinstants.com/media/sounds/bing-chilling.mp3" },
  { name: "Rizz Whistle 🎷", url: "https://www.myinstants.com/media/sounds/rizz-whistle.mp3" },
  { name: "Crying Baby Meme 👶", url: "https://www.myinstants.com/media/sounds/crying-baby.mp3" },
  { name: "Gawk Gawk 3000 🔊", url: "https://www.myinstants.com/media/sounds/gawk-gawk.mp3" },
  { name: "PacMan Death 🕹️", url: "https://www.myinstants.com/media/sounds/pacman-death.mp3" }
];

// Memory buffer to prevent repeating recently played sounds
const recentlyPlayedSounds = [];

function getNextViralSound() {
  // Filter out recent sound URLs to guarantee high sound rotation
  const candidates = VIRAL_SOUNDS.filter((s) => !recentlyPlayedSounds.includes(s.url));
  const pool = candidates.length > 0 ? candidates : VIRAL_SOUNDS;

  const selected = pool[Math.floor(Math.random() * pool.length)];

  // Track history (keep last 20 sounds in history buffer)
  recentlyPlayedSounds.push(selected.url);
  if (recentlyPlayedSounds.length > 20) {
    recentlyPlayedSounds.shift();
  }

  return selected;
}

// ─────────────────────────────────────────────────────────────
// LOCAL ROAST DATABASE (Fallback when Gemini is offline)
// ─────────────────────────────────────────────────────────────
const LOCAL_ROASTS = [
  {
    keywords: ["todo", "task", "job", "work", "study", "exam", "homework", "learn", "read", "plan", "schedule"],
    roasts: [
      "Ah, another to-do list that will sit here collecting digital dust. We both know you're going to open Instagram Reels instead.",
      "Writing it down doesn't count as actually doing it, buddy. But nice try pretending you're being productive.",
      "A productivity note? Fascinating. Let me know when you actually start working rather than planning to plan.",
      "You've written more notes about studying than actual pages you've studied. That's impressive in the worst way."
    ]
  },
  {
    keywords: ["gym", "workout", "exercise", "run", "diet", "fit", "healthy", "lift", "training", "weight", "muscle"],
    roasts: [
      "Writing about the gym is the closest you've gotten to a workout all week.",
      "A fitness note? Bold of you to plan a workout when walking to the fridge is your absolute limit for cardio.",
      "Sure, put it in a note. That will definitely burn the calories from the pizza you just ordered.",
      "Your gym membership is crying right now. It hasn't seen you in weeks but still charges your card."
    ]
  },
  {
    keywords: ["love", "girl", "boy", "relationship", "date", "crush", "dating", "heart", "miss", "breakup", "ex"],
    roasts: [
      "Analyzing your crush in a note? They haven't texted you back in 6 hours, it is time to move on.",
      "This reads like the beginning of a tragic fanfiction. Go touch some grass immediately.",
      "Writing about relationship problems? Maybe spend less time typing notes and more time communicating.",
      "Your love life has more plot twists than a Netflix series but zero subscribers."
    ]
  },
  {
    keywords: ["bug", "code", "error", "react", "mongoose", "backend", "programming", "javascript", "developer", "git", "deploy", "api"],
    roasts: [
      "One compiler error away from a complete emotional breakdown, aren't we?",
      "Your code has more bugs than a tropical rainforest. Have you tried turning your brain on?",
      "Writing down your code logic here because it certainly doesn't work inside your editor.",
      "Stack Overflow called. They said even THEY can't help you at this point."
    ]
  }
];

const GENERAL_ROASTS = [
  "Is this really the most important thing you had to write down today? Sarcastic applause.",
  "I've seen grocery lists with more emotional depth than this note.",
  "Your thoughts are like default folders: empty and unorganized.",
  "Writing a note is a great way to pretend you have your life together. Keep dreaming!",
  "This note has the energy of a participation trophy. You showed up, but that's about it.",
  "Somewhere out there, a tree produced oxygen for you to write THIS. Apologize to that tree."
];

// ─────────────────────────────────────────────────────────────
// STOP WORDS & CONTENT EXTRACTION
// ─────────────────────────────────────────────────────────────
const STOP_WORDS = new Set([
  "i", "me", "my", "the", "a", "an", "is", "am", "are", "was", "were",
  "be", "been", "being", "have", "has", "had", "do", "does", "did",
  "will", "would", "could", "should", "shall", "may", "might", "can",
  "to", "of", "in", "for", "on", "with", "at", "by", "from", "as",
  "into", "about", "it", "its", "this", "that", "and", "but", "or",
  "so", "if", "not", "no", "just", "also", "than", "then", "very",
  "too", "some", "all", "any", "each", "much", "more", "most", "here"
]);

function extractSearchTerms(title, content) {
  const allText = `${title} ${content}`;
  const words = allText
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !STOP_WORDS.has(w));

  const unique = [...new Set(words)];
  const shuffled = unique.sort(() => Math.random() - 0.5);
  const picked = shuffled.slice(0, Math.min(3, shuffled.length));

  if (picked.length === 0) {
    const fallbacks = ["viral meme", "instagram reaction", "cringe fail", "sarcastic reaction"];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  return picked.join(" ");
}

// ─────────────────────────────────────────────────────────────
// GIPHY INSTAGRAM & TIKTOK VIRAL MEDIA ENGINE
// ─────────────────────────────────────────────────────────────
async function fetchMemeMedia(contentSearchTerms, aiSearchPhrase) {
  const apiKey = process.env.GIPHY_API_KEY || "HnzXC3svlF6dYEtayKR32Z6IEP7jfsT5";
  const viralModifiers = ["instagram meme", "viral reaction", "tiktok meme", "funny roast", "fail reaction", "savage meme"];
  const randomMod = viralModifiers[Math.floor(Math.random() * viralModifiers.length)];

  const baseQuery = aiSearchPhrase || contentSearchTerms;
  const searchQuery = encodeURIComponent(`${baseQuery} ${randomMod}`);

  // Randomize between GIFs and transparent Stickers
  const isSticker = Math.random() > 0.4;
  const endpoint = isSticker ? "stickers" : "gifs";
  const mediaType = isSticker ? "sticker" : "gif";

  const randomOffset = Math.floor(Math.random() * 50);
  const url = `https://api.giphy.com/v1/${endpoint}/search?api_key=${apiKey}&q=${searchQuery}&limit=25&offset=${randomOffset}&rating=pg`;

  try {
    const res = await fetch(url);
    if (res.ok) {
      const result = await res.json();
      if (result.data && result.data.length > 0) {
        const pick = result.data[Math.floor(Math.random() * result.data.length)];
        return {
          url: pick.images.original.url || pick.images.downsized_medium.url,
          mediaType
        };
      }
    }
  } catch (err) {
    console.warn("Giphy API fetch failed:", err.message);
  }

  // Backup Giphy Trending endpoint search
  try {
    const trendingUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25&offset=${randomOffset}&rating=pg`;
    const res = await fetch(trendingUrl);
    if (res.ok) {
      const result = await res.json();
      if (result.data && result.data.length > 0) {
        const pick = result.data[Math.floor(Math.random() * result.data.length)];
        return {
          url: pick.images.original.url,
          mediaType: "gif"
        };
      }
    }
  } catch (err) {
    console.warn("Giphy trending fallback failed:", err.message);
  }

  // Last-resort fallback GIF
  return {
    url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2FqdTV0Z2cwbW55ejVpZnFzZG10bmk1azVzZ3psYW5qazh1NHl5bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/129NVCr1U09si4/giphy.gif",
    mediaType: "gif"
  };
}

function generateLocalRoast(title, content) {
  const combinedText = `${title} ${content}`.toLowerCase();
  for (const category of LOCAL_ROASTS) {
    const matched = category.keywords.some((kw) => combinedText.includes(kw));
    if (matched) {
      return category.roasts[Math.floor(Math.random() * category.roasts.length)];
    }
  }
  return GENERAL_ROASTS[Math.floor(Math.random() * GENERAL_ROASTS.length)];
}

// ─────────────────────────────────────────────────────────────
// MAIN ROAST GENERATOR
// ─────────────────────────────────────────────────────────────
export async function generateRoast(title, content) {
  const geminiKey = process.env.GEMINI_API_KEY;
  const contentSearchTerms = extractSearchTerms(title, content);

  let roastText = "";
  let aiSearchPhrase = "";

  if (geminiKey) {
    const prompt = `You are a savage, sarcastic internet roaster on Instagram & TikTok. Read this note:
Title: "${title}"
Content: "${content}"

1. Write a short (1-2 sentence), viral, extremely sarcastic roast about the user based on their note.
2. Come up with a creative, trending Instagram meme search phrase (2-4 words) to find a funny reaction GIF/Sticker.

Output EXACTLY this JSON:
{
  "roast": "Your viral savage roast here",
  "searchPhrase": "trending viral search phrase"
}`;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`;

    try {
      const response = await fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        const parsed = JSON.parse(jsonText);
        roastText = parsed.roast;
        aiSearchPhrase = parsed.searchPhrase;
      } else {
        roastText = generateLocalRoast(title, content);
      }
    } catch (err) {
      console.error("Gemini API error:", err.message);
      roastText = generateLocalRoast(title, content);
    }
  } else {
    roastText = generateLocalRoast(title, content);
  }

  // Fetch viral Giphy media
  const media = await fetchMemeMedia(contentSearchTerms, aiSearchPhrase);

  // Pick a non-repeating viral sound from our 52+ soundboard
  const selectedSound = getNextViralSound();

  return {
    text: roastText,
    gifUrl: media.url,
    mediaType: media.mediaType,
    soundUrl: selectedSound.url,
    soundName: selectedSound.name
  };
}
