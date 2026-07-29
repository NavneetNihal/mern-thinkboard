import dotenv from "dotenv";
dotenv.config();

// ─────────────────────────────────────────────────────────────
// LOCAL ROAST DATABASE (used when Gemini API key is not set)
// ─────────────────────────────────────────────────────────────
const LOCAL_ROASTS = [
  {
    keywords: ["todo", "task", "job", "work", "study", "exam", "homework", "learn", "read", "plan", "schedule"],
    roasts: [
      "Ah, another to-do list that will sit here collecting digital dust. We both know you're going to open YouTube instead.",
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
    keywords: ["bug", "code", "error", "react", "mongoose", "backend", "programming", "javascript", "developer", "git", "deploy", "api", "css", "html"],
    roasts: [
      "One compiler error away from a complete emotional breakdown, aren't we?",
      "Your code has more bugs than a tropical rainforest. Have you tried turning your brain on?",
      "Writing down your code logic here because it certainly doesn't work inside your editor.",
      "Stack Overflow called. They said even THEY can't help you at this point."
    ]
  },
  {
    keywords: ["money", "salary", "broke", "buy", "shop", "pay", "rent", "loan", "invest", "crypto", "budget"],
    roasts: [
      "Writing about money in a free notes app. The irony is simply too perfect.",
      "Your bank account just saw this note and filed a restraining order.",
      "A budget plan? That's adorable. We both know you'll impulse-buy something useless by tomorrow.",
      "Financial planning from someone who considers instant noodles a balanced meal. Inspiring."
    ]
  },
  {
    keywords: ["sleep", "tired", "nap", "insomnia", "rest", "bed", "wake", "morning", "night", "late"],
    roasts: [
      "Writing notes at this hour? Your body is begging you to sleep but you chose violence.",
      "A note about sleep? The irony of being awake to write this is chef's kiss.",
      "Maybe if you spent less time taking notes and more time in bed, you wouldn't look like a zombie.",
      "Your sleep schedule is more broken than Internet Explorer. Just shut down already."
    ]
  },
  {
    keywords: ["food", "eat", "recipe", "cook", "pizza", "burger", "lunch", "dinner", "breakfast", "hungry", "snack"],
    roasts: [
      "A food note? Your fridge is right there. Stop documenting and start cooking.",
      "Writing about food while probably ordering UberEats. The duality of man.",
      "Gordon Ramsay would look at this note and just whisper... 'pathetic.'",
      "Your cooking skills are so bad, even the smoke alarm cheers when you order takeout."
    ]
  }
];

const GENERAL_ROASTS = [
  "Is this really the most important thing you had to write down today? Sarcastic applause.",
  "I've seen grocery lists with more emotional depth than this note.",
  "Your thoughts are like default folders: empty and unorganized.",
  "Writing a note is a great way to pretend you have your life together. Keep dreaming!",
  "This note has the energy of a participation trophy. You showed up, but that's about it.",
  "Somewhere out there, a tree produced oxygen for you to write THIS. Apologize to that tree.",
  "If notes could file for divorce, this one would've already hired a lawyer.",
  "Congratulations on documenting the most unremarkable thought in human history."
];

// ─────────────────────────────────────────────────────────────
// SOUND EFFECTS POOL — large variety, always randomly picked
// ─────────────────────────────────────────────────────────────
const SOUNDS = [
  "https://www.myinstants.com/media/sounds/emotional-damage-meme.mp3",
  "https://www.myinstants.com/media/sounds/bruh.mp3",
  "https://www.myinstants.com/media/sounds/sadviolin.mp3",
  "https://www.myinstants.com/media/sounds/windows-xp-error.mp3",
  "https://www.myinstants.com/media/sounds/directed-by-robert-b-weide.mp3",
  "https://www.myinstants.com/media/sounds/oof_x200.mp3",
  "https://www.myinstants.com/media/sounds/the-rock-sus.mp3",
  "https://www.myinstants.com/media/sounds/wow-so-cool.mp3",
  "https://www.myinstants.com/media/sounds/among-us-role-reveal-sound.mp3",
  "https://www.myinstants.com/media/sounds/taco-bell-bong-sfx.mp3",
  "https://www.myinstants.com/media/sounds/dun-dun-dun.mp3",
  "https://www.myinstants.com/media/sounds/inception-horn.mp3",
  "https://www.myinstants.com/media/sounds/the-price-is-right-losing-horn.mp3",
  "https://www.myinstants.com/media/sounds/nani.mp3",
  "https://www.myinstants.com/media/sounds/roblox-death-sound_1.mp3",
  "https://www.myinstants.com/media/sounds/wii-sports-knockout.mp3",
  "https://www.myinstants.com/media/sounds/vine-boom.mp3",
  "https://www.myinstants.com/media/sounds/metal-pipe-falling-sound-effect.mp3"
];

// ─────────────────────────────────────────────────────────────
// CONTENT-BASED KEYWORD EXTRACTION
// Pulls real words from the user's note to build search queries
// ─────────────────────────────────────────────────────────────
const STOP_WORDS = new Set([
  "i", "me", "my", "the", "a", "an", "is", "am", "are", "was", "were",
  "be", "been", "being", "have", "has", "had", "do", "does", "did",
  "will", "would", "could", "should", "shall", "may", "might", "can",
  "to", "of", "in", "for", "on", "with", "at", "by", "from", "as",
  "into", "about", "it", "its", "this", "that", "and", "but", "or",
  "so", "if", "not", "no", "just", "also", "than", "then", "very",
  "too", "some", "all", "any", "each", "much", "more", "most", "here",
  "there", "when", "how", "what", "which", "who", "up", "out", "going",
  "want", "need", "get", "got", "make", "made", "know", "think", "go",
  "really", "thing", "things", "still", "even", "like", "one", "two"
]);

function extractSearchTerms(title, content) {
  const allText = `${title} ${content}`;
  // Pull out meaningful words (3+ chars, not stop words)
  const words = allText
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !STOP_WORDS.has(w));

  // Remove duplicates
  const unique = [...new Set(words)];

  // Shuffle and pick 2-4 random content words
  const shuffled = unique.sort(() => Math.random() - 0.5);
  const picked = shuffled.slice(0, Math.min(3, shuffled.length));

  // If we got nothing useful, return a random funny fallback
  if (picked.length === 0) {
    const fallbacks = ["cringe fail", "sarcastic reaction", "facepalm moment", "disappointed", "bruh moment", "awkward silence"];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  return picked.join(" ");
}

// ─────────────────────────────────────────────────────────────
// MEDIA SEARCH ENGINE
// Searches the internet for GIFs, stickers, or clips based on
// actual note content. Different result every single time.
// ─────────────────────────────────────────────────────────────

const GIPHY_API_KEY = process.env.GIPHY_API_KEY || "dc6zaTOxFJmzC";
const TENOR_API_KEY = "LIVDTRZKBEDH";

/**
 * Searches Giphy for content. Returns { url, mediaType }.
 * mediaType is either "gif" or "sticker".
 */
async function searchGiphy(searchQuery) {
  const isSticker = Math.random() > 0.5;
  const endpoint = isSticker ? "stickers" : "gifs";
  const mediaType = isSticker ? "sticker" : "gif";
  const query = encodeURIComponent(searchQuery);
  const offset = Math.floor(Math.random() * 50); // random page offset for variety
  const url = `https://api.giphy.com/v1/${endpoint}/search?api_key=${GIPHY_API_KEY}&q=${query}&limit=25&offset=${offset}&rating=pg`;

  try {
    const res = await fetch(url);
    const result = await res.json();
    if (result.data && result.data.length > 0) {
      const pick = result.data[Math.floor(Math.random() * result.data.length)];
      return { url: pick.images.original.url, mediaType };
    }
  } catch (err) {
    console.warn("Giphy search failed:", err.message);
  }
  return null;
}

/**
 * Searches Tenor for content. Returns { url, mediaType }.
 */
async function searchTenor(searchQuery) {
  const query = encodeURIComponent(searchQuery);
  const pos = Math.floor(Math.random() * 30); // random starting position
  const url = `https://g.tenor.com/v1/search?q=${query}&key=${TENOR_API_KEY}&limit=25&pos=${pos}&media_filter=minimal`;

  try {
    const res = await fetch(url);
    const result = await res.json();
    if (result.results && result.results.length > 0) {
      const pick = result.results[Math.floor(Math.random() * result.results.length)];
      const media = pick.media?.[0];
      if (media?.gif?.url) {
        return { url: media.gif.url, mediaType: "gif" };
      }
    }
  } catch (err) {
    console.warn("Tenor search failed:", err.message);
  }
  return null;
}

/**
 * Main media fetcher. Searches the internet using actual note content.
 * Randomly routes between Giphy and Tenor, uses content-derived search terms,
 * and applies random modifiers for maximum variety.
 */
async function fetchMemeMedia(contentSearchTerms, aiSearchPhrase) {
  // Build multiple search strategies for variety
  const modifiers = ["funny", "meme", "reaction", "fail", "roast", "savage", "cringe", "lol"];
  const randomMod = modifiers[Math.floor(Math.random() * modifiers.length)];

  // Use AI-provided search phrase if available, otherwise use content-extracted terms
  const baseQuery = aiSearchPhrase || contentSearchTerms;
  const searchQuery = `${baseQuery} ${randomMod}`;

  // Fire BOTH engines concurrently for speed, pick whichever returns first
  const [giphyResult, tenorResult] = await Promise.all([
    searchGiphy(searchQuery),
    searchTenor(searchQuery)
  ]);

  // Collect all successful results into a pool and pick randomly
  const pool = [giphyResult, tenorResult].filter(Boolean);

  if (pool.length > 0) {
    return pool[Math.floor(Math.random() * pool.length)];
  }

  // If both failed with the content query, try a generic funny fallback
  const emergencyQueries = ["sarcastic meme", "facepalm reaction", "disappointed reaction", "cringe meme", "bruh meme"];
  const emergencyQuery = emergencyQueries[Math.floor(Math.random() * emergencyQueries.length)];
  const emergencyResult = await searchGiphy(emergencyQuery);
  if (emergencyResult) return emergencyResult;

  // Absolute last resort: hardcoded GIF
  return {
    url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2FqdTV0Z2cwbW55ejVpZnFzZG10bmk1azVzZ3psYW5qazh1NHl5bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/129NVCr1U09si4/giphy.gif",
    mediaType: "gif"
  };
}

// ─────────────────────────────────────────────────────────────
// LOCAL ROAST GENERATOR (no AI key needed)
// ─────────────────────────────────────────────────────────────

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
// MAIN EXPORT — generates roast + fetches media concurrently
// ─────────────────────────────────────────────────────────────

export async function generateRoast(title, content) {
  const geminiKey = process.env.GEMINI_API_KEY;

  // Step 1: Extract real search terms from the note content immediately
  const contentSearchTerms = extractSearchTerms(title, content);

  // Step 2: Generate the roast text (AI or local) AND start media search concurrently
  let roastText = "";
  let aiSearchPhrase = ""; // Gemini can suggest a creative search phrase

  if (geminiKey) {
    const prompt = `You are a savage, sarcastic internet roaster. Read this note:
Title: "${title}"
Content: "${content}"

Do two things:
1. Write a short (1-2 sentence), extremely sarcastic, witty, and savage roast about the user based on their note.
2. Come up with a creative, funny 2-4 word search phrase to find a relatable meme/GIF about their note's topic. Make it specific and humorous. Examples: "crying over code", "gym motivation fail", "procrastinator sleeping", "broke student ramen".

IMPORTANT: The search phrase should be DIFFERENT and CREATIVE every time. Do NOT repeat generic words like "sarcastic" or "lazy". Make it specific to what the user wrote.

Output EXACTLY this JSON:
{
  "roast": "Your savage roast here",
  "searchPhrase": "creative funny search phrase"
}`;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`;

    try {
      // Fire Gemini roast generation AND media search at the same time
      const geminiPromise = fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      // Start media search immediately with content-derived terms (don't wait for AI)
      const mediaPromise = fetchMemeMedia(contentSearchTerms, null);

      const [geminiResponse, earlyMedia] = await Promise.all([geminiPromise, mediaPromise]);

      if (geminiResponse.ok) {
        const data = await geminiResponse.json();
        const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        const parsed = JSON.parse(jsonText);
        roastText = parsed.roast;
        aiSearchPhrase = parsed.searchPhrase || "";

        // If AI gave us a creative search phrase, do a SECOND media search with it
        // and pick between the early result and this new one randomly
        if (aiSearchPhrase) {
          const aiMedia = await fetchMemeMedia(contentSearchTerms, aiSearchPhrase);
          // Pick randomly between the two for extra variety
          const mediaPool = [earlyMedia, aiMedia].filter(Boolean);
          const finalMedia = mediaPool[Math.floor(Math.random() * mediaPool.length)];
          const soundUrl = SOUNDS[Math.floor(Math.random() * SOUNDS.length)];
          return {
            text: roastText,
            gifUrl: finalMedia.url,
            mediaType: finalMedia.mediaType,
            soundUrl
          };
        }
      } else {
        const status = geminiResponse.status;
        const body = await geminiResponse.text();
        console.warn(`Gemini API failed [${status}]: ${body.substring(0, 200)}`);
        roastText = generateLocalRoast(title, content);
      }

      // Use early media result
      const soundUrl = SOUNDS[Math.floor(Math.random() * SOUNDS.length)];
      return {
        text: roastText || generateLocalRoast(title, content),
        gifUrl: earlyMedia.url,
        mediaType: earlyMedia.mediaType,
        soundUrl
      };
    } catch (err) {
      console.error("Gemini service error:", err.message);
      roastText = generateLocalRoast(title, content);
    }
  } else {
    roastText = generateLocalRoast(title, content);
  }

  // Fallback path: no Gemini or Gemini failed after catch
  const media = await fetchMemeMedia(contentSearchTerms, null);
  const soundUrl = SOUNDS[Math.floor(Math.random() * SOUNDS.length)];

  return {
    text: roastText,
    gifUrl: media.url,
    mediaType: media.mediaType,
    soundUrl
  };
}
