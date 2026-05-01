# Story Garden 🌿

Generates moral-driven children's stories with llama-3.3-70b-versatile model, reads them aloud via Speechmatics TTS.

## Setup

1. Install dependencies
   cd backend && npm install
   cd ../frontend && npm install
   (root) npm install

2. Add API keys — edit backend/.env:
   GROQ_API_KEY=your_key
   SPEECHMATICS_API_KEY=your_key

3. Run: npm run dev (from root)
   Frontend → http://localhost:3000
   Backend  → http://localhost:3001

## Structure
story-app/
├── backend/
│   ├── server.js
│   ├── .env                    ← API keys
│   ├── routes/story.js         ← POST /api/story/generate
│   ├── routes/tts.js           ← POST /api/tts/synthesize
│   ├── services/geminiService.js
│   ├── services/speechmaticsService.js
│   └── prompts/systemPrompt.js
└── frontend/src/
    ├── App.jsx
    ├── components/StoryForm.jsx
    ├── components/StoryPlayer.jsx
    ├── hooks/useStory.js
    └── services/api.js
