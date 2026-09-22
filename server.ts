import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;
let aiClient: GoogleGenAI | null = null;

function getAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured.");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "OmniPDF Suite API" });
  });

  // Client ID endpoint for Google Drive
  app.get("/api/auth/google/client_id", (_req, res) => {
    const clientId = process.env.GOOGLE_CLIENT_ID || "";
    res.json({ clientId });
  });

  // Gemini AI endpoint for Summarization, Translation, Chat, Quiz Generation, and Document Analysis
  app.post("/api/ai/process", async (req, res) => {
    try {
      const { task, documentText, prompt, targetLanguage, questionsCount } = req.body;

      if (!documentText && !prompt) {
        return res.status(400).json({ error: "Missing documentText or prompt" });
      }

      const ai = getAI();
      let systemInstruction = "";
      let userPrompt = "";

      switch (task) {
        case "summarize":
          systemInstruction = "You are an enterprise document analyst. Provide an executive summary, key takeaways, and section-by-section breakdown of the provided document text. Use markdown with clean headings and bullet points.";
          userPrompt = `Please summarize the following document:\n\n${documentText.slice(0, 40000)}`;
          break;

        case "translate":
          systemInstruction = `You are a professional legal and document translator. Translate the given document into ${targetLanguage || "Spanish"}. Maintain formatting, terminology, and tone.`;
          userPrompt = `Translate the following text into ${targetLanguage || "Spanish"}:\n\n${documentText.slice(0, 35000)}`;
          break;

        case "chat":
          systemInstruction = "You are an intelligent PDF reading assistant. Answer questions strictly based on the provided document text. If something is not in the text, note that clearly. Provide precise citations or quotes when relevant.";
          userPrompt = `Document Content:\n"""\n${documentText.slice(0, 35000)}\n"""\n\nUser Question: ${prompt}`;
          break;

        case "quiz":
          systemInstruction = "You are an expert educator. Based on the document content, generate a comprehensive multiple-choice quiz with answers and explanations in JSON format. Return valid JSON only.";
          userPrompt = `Generate ${questionsCount || 5} multiple-choice questions from this document:\n\n${documentText.slice(0, 35000)}\n\nFormat as JSON array with properties: question (string), options (array of 4 strings), correctIndex (0-3), explanation (string).`;
          break;

        case "compare":
          systemInstruction = "You are a legal contract and document comparison specialist. Compare Document A and Document B. Highlight semantic differences, additions, deletions, risks, and critical changes.";
          userPrompt = `Compare these two texts:\n\n=== DOCUMENT A ===\n${(req.body.docA || "").slice(0, 20000)}\n\n=== DOCUMENT B ===\n${(req.body.docB || "").slice(0, 20000)}`;
          break;

        case "form-detect":
          systemInstruction = "Analyze this document text and detect all fillable form fields, data types, required signatures, and key extracted values. Return a structured breakdown in JSON.";
          userPrompt = `Detect form fields from this text:\n\n${documentText.slice(0, 25000)}`;
          break;

        default:
          systemInstruction = "You are a professional PDF document analysis assistant.";
          userPrompt = prompt || `Analyze this document:\n\n${documentText.slice(0, 30000)}`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userPrompt,
        config: {
          systemInstruction,
          temperature: 0.2,
        },
      });

      res.json({ result: response.text });
    } catch (err: any) {
      console.error("Gemini processing error:", err);
      res.status(500).json({ error: err.message || "Failed to process AI request" });
    }
  });

  // OCR and text extraction helper fallback
  app.post("/api/ocr/extract", async (req, res) => {
    try {
      const { textSample } = req.body;
      res.json({ status: "success", detectedText: textSample || "" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Vite middleware in dev, static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`OmniPDF Server running on port ${PORT}`);
  });
}

startServer();
