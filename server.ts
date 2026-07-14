import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

function getAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY environment variable is not configured. Please set it in the Secrets panel in AI Studio.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser
  app.use(express.json());

  // API Route: Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // API Route: Custom Pharaoh Itinerary Creator using Gemini 3.5 Flash
  app.post("/api/itinerary", async (req, res) => {
    try {
      const { durationDays, interest, intensity, companion, customPreferences } = req.body;
      
      const prompt = `You are Sennedjem, the Royal Scribe of Kemet, an ancient Egyptian counselor and travel sage. 
Craft a bespoke, day-by-day vacation itinerary located around the Red Sea, Egypt (specifically based out of Hurghada/Sharm El Sheikh).

User preferences:
- Duration: ${durationDays || 3} Days
- Focus: ${interest || 'Balanced Exploration (Corals, Desert, History)'}
- Pace/Intensity: ${intensity || 'Leisurely'}
- Companions: ${companion || 'Solo traveler'}
- Special Requests: ${customPreferences || 'None'}

Incorporate these elements:
1. A poetic Pharaonic introduction greeting the traveler as a visiting noble or dignitary.
2. Day-by-day activities pairing Red Sea wonders (diving Ras Mohammed, Giftun Island, snorkeling reefs) with majestic Desert Safaris (camel treks, Bedouin tea, star gazing under the eye of Nut) and historic Ancient Egypt excursions (like a day-trip to Luxor/Karnak or a mystical valley tour).
3. "Scribe's Wisdom": Ancient lore, mythical trivia, or safety tips for each day (e.g. mentioning Anubis, Ra, Osiris, or the god of the sea, Nun).
4. A concluding royal blessing or cartouche blessing in prose.

Ensure the output is formatted as a clean, structured JSON object with the following JSON schema:
{
  "royalGreeting": "Greeting string",
  "title": "A Pharaonic title for the itinerary",
  "days": [
    {
      "dayNumber": 1,
      "theme": "Theme of the day",
      "activities": ["Activity 1", "Activity 2"],
      "scribeWisdom": "Lore, myth or tip for this day"
    }
  ],
  "blessing": "Concluding blessing"
}

Respond ONLY with valid JSON. Do not wrap in markdown blocks, do not write anything else.`;

      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text || "{}";
      const parsedItinerary = JSON.parse(responseText.trim());
      res.json(parsedItinerary);
    } catch (error: any) {
      console.error("Error generating itinerary:", error);
      res.status(500).json({ 
        error: error.message || "Failed to summon the Royal Scribe. Please check your Gemini API key." 
      });
    }
  });

  // API Route: Royal Scribe Interactive Oracle Chat
  app.post("/api/scribe-chat", async (req, res) => {
    try {
      const { message, chatHistory } = req.body;
      const ai = getAI();

      const systemInstruction = `You are Sennedjem, the wise Royal Scribe of Kemet. You speak in a highly sophisticated, polite, and atmospheric Pharaonic style. You use terms like 'noble traveler', 'Kemet', 'the gift of the Nile', 'the golden sun of Ra', 'by the grace of Isis'.
You are an expert on Egyptian mythology, history, desert safaris, and the secrets of the Red Sea (Nun's great waters).
If the user asks to translate a name or word into hieroglyphs or to explain its meaning, do so beautifully and explain what ancient symbols represent it (e.g., Scarab for transformation, Ankh for life, Eye of Horus for protection).
Keep your responses relatively concise (1-2 short paragraphs) but highly immersive and flavorful.`;

      // Format history for the chat API
      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction,
          temperature: 0.8,
        }
      });

      // If we have history, we can seed it, but for a simple endpoint we can also just run generateContent or send message.
      // Let's do a simple sendMessage with chat history passed or just generateContent. Let's send a single message with history summarized, or use the chat session.
      // To keep it robust, let's build the prompt with history or use generateContent.
      let prompt = "";
      if (chatHistory && chatHistory.length > 0) {
        prompt += "Here is our previous conversation:\n";
        chatHistory.forEach((h: any) => {
          prompt += `${h.role === 'user' ? 'Traveler' : 'Scribe Sennedjem'}: ${h.text}\n`;
        });
        prompt += "\n";
      }
      prompt += `Traveler: ${message}\nScribe Sennedjem:`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
        }
      });

      res.json({ response: response.text });
    } catch (error: any) {
      console.error("Error in scribe chat:", error);
      res.status(500).json({ 
        error: error.message || "Failed to consult the Oracle. Please check your Gemini API key." 
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Kemet Excursions] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
