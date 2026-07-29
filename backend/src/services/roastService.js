import dotenv from "dotenv";
dotenv.config();

// Pre-defined database of funny roasts and tags for local fallback when no Gemini API key is configured
const LOCAL_ROASTS = [
  {
    keywords: ["todo", "task", "job", "work", "study", "exam", "homework", "learn", "read"],
    roasts: [
      "Ah, another to-do list that will sit here collecting digital dust. We both know you're going to open YouTube instead.",
      "Writing it down doesn't count as actually doing it, buddy. But nice try pretending you're being productive.",
      "A productivity note? Fascinating. Let me know when you actually start working rather than planning to plan."
    ],
    searchKeys: ["lazy", "procrastinate", "sleeping", "bored"]
  },
  {
    keywords: ["gym", "workout", "exercise", "run", "diet", "fit", "healthy", "lift", "training"],
    roasts: [
      "Writing about the gym is the closest you've gotten to a workout all week.",
      "A fitness note? Bold of you to plan a workout when walking to the fridge is your absolute limit for cardio.",
      "Sure, put it in a note. That will definitely burn the calories from the pizza you just ordered."
    ],
    searchKeys: ["workout-fail", "eating-pizza", "tired-gym", "fat-cat"]
  },
  {
    keywords: ["love", "girl", "boy", "relationship", "date", "crush", "dating", "heart"],
    roasts: [
      "Analyzing your crush in a note? They haven't texted you back in 6 hours, it is time to move on.",
      "This reads like the beginning of a tragic fanfiction. Go touch some grass immediately.",
      "Writing about relationship problems? Maybe spend less time typing notes and more time communicating."
    ],
    searchKeys: ["cringe", "lonely", "relationship-fail", "broken-heart"]
  },
  {
    keywords: ["bug", "code", "error", "react", "mongoose", "backend", "programming", "javascript", "developer", "git"],
    roasts: [
      "One compiler error away from a complete emotional breakdown, aren't we?",
      "Your code has more bugs than a tropical rainforest. Have you tried turning your brain on?",
      "Writing down your code logic here because it certainly doesn't work inside your editor."
    ],
    searchKeys: ["angry-developer", "coding-fail", "screaming-computer", "programming"]
  }
];

const GENERAL_ROASTS = [
  "Is this really the most important thing you had to write down today? Sarcastic applause.",
  "I've seen grocery lists with more emotional depth than this note.",
  "Your thoughts are like default folders: empty and unorganized.",
  "Writing a note is a great way to pretend you have your life together. Keep dreaming!"
];

const DEFAULT_GIFS = {
  lazy: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2FqdTV0Z2cwbW55ejVpZnFzZG10bmk1azVzZ3psYW5qazh1NHl5bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/129NVCr1U09si4/giphy.gif",
  gym: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbms1amZ5dzR3Ynp4OHVwcXVqNDl5cW85MHQ2dG41Y3FyeHp0azE2NSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/11KzOet1ElBDz2/giphy.gif",
  love: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3V4Mzh2azhvdzh4MmpsaGszZGN1MXNtbjVrbmVnMDlycmtyaDdxayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/G3w5bFfY85rag/giphy.gif",
  coding: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTV3ejVwNzh5N2w4ZWsyMG5qNDYxNXB5ZWZ1cTVrMnEybzBmcTNyOCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/dh1t8hUqHgV5C/giphy.gif",
  general: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3V4Mzh2azhvdzh4MmpsaGszZGN1MXNtbjVrbmVnMDlycmtyaDdxayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/G3w5bFfY85rag/giphy.gif"
};

const SOUNDS = [
  "https://www.myinstants.com/media/sounds/emotional-damage-meme.mp3",
  "https://www.myinstants.com/media/sounds/bruh.mp3",
  "https://www.myinstants.com/media/sounds/sadviolin.mp3",
  "https://www.myinstants.com/media/sounds/windows-xp-error.mp3",
  "https://www.myinstants.com/media/sounds/directed-by-robert-b-weide.mp3"
];

function getSoundUrl(searchKey) {
  const sk = searchKey.toLowerCase();
  if (sk.includes("lazy") || sk.includes("procrastinate") || sk.includes("sleep")) return SOUNDS[1]; // Bruh
  if (sk.includes("gym") || sk.includes("workout") || sk.includes("tired")) return SOUNDS[1]; // Bruh
  if (sk.includes("love") || sk.includes("lonely") || sk.includes("cringe")) return SOUNDS[0]; // Emotional Damage
  if (sk.includes("bug") || sk.includes("coding") || sk.includes("error") || sk.includes("fail") || sk.includes("program")) return SOUNDS[3]; // Windows XP Error
  if (sk.includes("sarcastic") || sk.includes("clap") || sk.includes("general")) return SOUNDS[4]; // Robert Weide
  
  // Pick a random sound as fallback
  return SOUNDS[Math.floor(Math.random() * SOUNDS.length)];
}

/**
 * Searches Giphy for a relevant funny GIF or Sticker using the provided query key.
 * Dynamically toggles between standard GIFs and transparent Stickers for variety.
 */
async function fetchGiphyMeme(searchKey) {
  const apiKey = "dc6zaTOxFJmzC"; // Public beta Giphy API key
  const query = encodeURIComponent(`${searchKey} funny meme`);
  
  // 50% chance to fetch a transparent sticker, 50% to fetch a standard GIF
  const isSticker = Math.random() > 0.5;
  const endpoint = isSticker ? "stickers" : "gifs";
  const url = `https://api.giphy.com/v1/${endpoint}/search?api_key=${apiKey}&q=${query}&limit=10&rating=pg`;

  try {
    const res = await fetch(url);
    const result = await res.json();
    if (result.data && result.data.length > 0) {
      const randomIndex = Math.floor(Math.random() * result.data.length);
      return result.data[randomIndex].images.original.url;
    }
  } catch (error) {
    console.error("Giphy Search API error, falling back to local asset", error);
  }

  // Fallback map
  if (searchKey.includes("gym")) return DEFAULT_GIFS.gym;
  if (searchKey.includes("love") || searchKey.includes("cringe")) return DEFAULT_GIFS.love;
  if (searchKey.includes("coding") || searchKey.includes("developer")) return DEFAULT_GIFS.coding;
  if (searchKey.includes("lazy") || searchKey.includes("procrastinate")) return DEFAULT_GIFS.lazy;
  return DEFAULT_GIFS.general;
}

/**
 * Local rule-based keyword scan to generate roasts when no Gemini API key is active.
 */
function generateLocalRoast(title, content) {
  const combinedText = `${title} ${content}`.toLowerCase();
  
  for (const category of LOCAL_ROASTS) {
    const matched = category.keywords.some((keyword) => combinedText.includes(keyword));
    if (matched) {
      const randomRoast = category.roasts[Math.floor(Math.random() * category.roasts.length)];
      const randomSearch = category.searchKeys[Math.floor(Math.random() * category.searchKeys.length)];
      return { roast: randomRoast, searchKey: randomSearch };
    }
  }

  const randomGeneral = GENERAL_ROASTS[Math.floor(Math.random() * GENERAL_ROASTS.length)];
  return { roast: randomGeneral, searchKey: "sarcastic" };
}

/**
 * Generates a savage roast and searches Giphy for a relevant meme.
 * Uses Google Gemini AI if GEMINI_API_KEY environment variable is configured.
 */
export async function generateRoast(title, content) {
  const geminiKey = process.env.GEMINI_API_KEY;
  let roastText = "";
  let searchKey = "";

  if (geminiKey) {
    const prompt = `You are a savage, sarcastic internet roaster. Read the following note:
Title: "${title}"
Content: "${content}"

Write a short, hilarious, burning roast about the user based on their note. Keep it to 1-2 sentences. Keep it extremely sarcastic, witty, and savage. Do not be polite or friendly.
Also, output a single word search query (such as 'lazy', 'procrastinator', 'delusional', 'crying', 'broken-code', 'hopeless-romantic') that represents the core theme of the note for looking up a funny meme/GIF on Giphy.

Format your output EXACTLY as a JSON object with keys:
{
  "roast": "The roast text",
  "searchKey": "the single search word"
}`;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;

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
        searchKey = parsed.searchKey || "sarcastic";
      } else {
        console.warn("Gemini API call failed, falling back to local roaster");
        const fallback = generateLocalRoast(title, content);
        roastText = fallback.roast;
        searchKey = fallback.searchKey;
      }
    } catch (err) {
      console.error("Gemini service error, falling back to local roaster", err);
      const fallback = generateLocalRoast(title, content);
      roastText = fallback.roast;
      searchKey = fallback.searchKey;
    }
  } else {
    // If no key is set, run local keyword analyzer
    const fallback = generateLocalRoast(title, content);
    roastText = fallback.roast;
    searchKey = fallback.searchKey;
  }

  // Fetch the GIF URL from Giphy
  const gifUrl = await fetchGiphyMeme(searchKey);
  const soundUrl = getSoundUrl(searchKey);

  return {
    text: roastText,
    gifUrl: gifUrl,
    soundUrl: soundUrl
  };
}
