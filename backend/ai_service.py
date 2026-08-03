# ═══════════════════════════════════════════════════════════
# AI Service — OpenAI / Gemini Chat Integration
# Shreyash Portfolio Legendary Edition
# ═══════════════════════════════════════════════════════════

import os
from typing import Optional, Dict, List


class AIService:
    """
    AI chatbot service for portfolio.
    Falls back to smart template responses if no API key is configured.
    """

    def __init__(self):
        self.openai_key = os.getenv("OPENAI_API_KEY", "")
        self.gemini_key = os.getenv("GEMINI_API_KEY", "")
        self._sessions: Dict[str, List[dict]] = {}

        # System prompt for the AI assistant
        self.system_prompt = """You are Shreyash Srivastava's portfolio AI assistant.
You help visitors learn about Shreyash's work, skills, and availability.

KEY FACTS:
- Shreyash is a Full-Stack Developer & Creative Coder
- Specializes in Next.js, Three.js, TypeScript, Python, AI/ML
- Built IHateLovePDF (100% client-side PDF toolkit at ihatelovepdf.com)
- 3+ years of experience shipping production applications
- Passionate about immersive web experiences and creative coding
- Available for freelance projects and full-time opportunities

PERSONALITY:
- Friendly, professional, enthusiastic about tech
- Keep responses concise (2-4 sentences max)
- Use emoji sparingly for warmth
- Always encourage visitors to reach out via the contact form

If asked about pricing: "Pricing depends on project scope. Use the contact form and Shreyash will get back to you with a custom quote!"
If asked about availability: "Shreyash is currently accepting new projects! Fill out the contact form to discuss your idea."
"""

    async def chat(self, message: str, session_id: Optional[str] = None) -> str:
        """Process a chat message and return AI response."""

        # Try OpenAI first
        if self.openai_key:
            return await self._chat_openai(message, session_id)

        # Try Gemini
        if self.gemini_key:
            return await self._chat_gemini(message, session_id)

        # Fallback to smart templates
        return self._smart_fallback(message)

    async def _chat_openai(self, message: str, session_id: Optional[str]) -> str:
        try:
            import openai
            client = openai.AsyncOpenAI(api_key=self.openai_key)

            # Get or create session history
            history = self._get_history(session_id)
            history.append({"role": "user", "content": message})

            response = await client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": self.system_prompt},
                    *history[-10:]  # Keep last 10 messages for context
                ],
                max_tokens=300,
                temperature=0.7,
            )

            reply = response.choices[0].message.content
            history.append({"role": "assistant", "content": reply})
            if session_id:
                self._sessions[session_id] = history

            return reply

        except Exception as e:
            print(f"OpenAI error: {e}")
            return self._smart_fallback(message)

    async def _chat_gemini(self, message: str, session_id: Optional[str]) -> str:
        try:
            import google.generativeai as genai
            genai.configure(api_key=self.gemini_key)
            model = genai.GenerativeModel("gemini-2.0-flash")

            prompt = f"{self.system_prompt}\n\nUser: {message}\nAssistant:"
            response = model.generate_content(prompt)

            return response.text

        except Exception as e:
            print(f"Gemini error: {e}")
            return self._smart_fallback(message)

    def _get_history(self, session_id: Optional[str]) -> list:
        if session_id and session_id in self._sessions:
            return self._sessions[session_id]
        return []

    def _smart_fallback(self, message: str) -> str:
        """Smart template responses when no AI API is configured."""
        msg = message.lower().strip()

        # Greeting
        if any(w in msg for w in ["hi", "hello", "hey", "sup", "yo"]):
            return "Hey there! 👋 Welcome to Shreyash's portfolio. I'm his AI assistant — ask me anything about his work, skills, or how to get in touch!"

        # Skills
        if any(w in msg for w in ["skill", "tech", "stack", "know", "language"]):
            return "Shreyash specializes in **Next.js, Three.js, TypeScript, Python, and AI/ML**. He's also experienced with Node.js, PostgreSQL, Docker, and WebAssembly. Check out the Skills section for the full breakdown! ⚡"

        # Projects
        if any(w in msg for w in ["project", "work", "portfolio", "built", "made"]):
            return "His flagship project is **IHateLovePDF** — a 100% client-side PDF toolkit at ihatelovepdf.com. He's also built immersive 3D portfolios, AI developer tools, and more. Scroll to the Projects section to explore! 🚀"

        # Contact / Hire
        if any(w in msg for w in ["contact", "hire", "email", "reach", "work with", "freelance"]):
            return "Shreyash is currently accepting new projects! 🎯 Use the contact form below to share your idea, and he'll get back to you with a custom proposal. Or email directly at shreyash@example.com."

        # Price / Cost
        if any(w in msg for w in ["price", "cost", "rate", "budget", "charge", "how much"]):
            return "Pricing depends on the project scope and timeline. Fill out the contact form with your project details, and Shreyash will send you a custom quote! 💰"

        # Availability
        if any(w in msg for w in ["available", "free", "busy", "schedule", "when"]):
            return "Shreyash is currently **available for new projects**! He typically responds within 24 hours. Drop a message in the contact form to get started. 📅"

        # IHateLovePDF
        if any(w in msg for w in ["ihatelovepdf", "pdf", "compress", "merge"]):
            return "**IHateLovePDF** is Shreyash's flagship project — a privacy-first PDF toolkit that runs 100% in your browser. No server uploads, unlimited file size, and blazing fast (<100ms). Try it at ihatelovepdf.com! 📄"

        # Experience
        if any(w in msg for w in ["experience", "years", "background", "career"]):
            return "Shreyash has **3+ years of experience** building production applications. He's shipped 20+ projects, worked with 15+ happy clients, and is passionate about pushing the boundaries of what's possible on the web. 🌟"

        # About
        if any(w in msg for w in ["about", "who", "tell me"]):
            return "Shreyash is a **Full-Stack Developer & Creative Coder** who builds immersive digital experiences. He bridges design and engineering — from sleek web apps to physics-driven 3D interfaces. Scroll to the About section for the full story! ✨"

        # Fallback
        return "That's a great question! I'd recommend checking out the relevant section on the portfolio, or feel free to reach out directly through the contact form. Shreyash would love to chat! 🤝"
