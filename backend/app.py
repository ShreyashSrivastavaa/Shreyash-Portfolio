# ═══════════════════════════════════════════════════════════
# FastAPI Backend — Shreyash Portfolio Legendary Edition
# Real-time WebSocket, AI Chatbot, Analytics, Contact Form
# ═══════════════════════════════════════════════════════════

import os
import json
import asyncio
from datetime import datetime, timezone
from typing import Optional, List, Dict, Any
from contextlib import asynccontextmanager

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr, Field

# ——— Database ———
from database import Database

# ——— AI Service ———
from ai_service import AIService

# ——— Config ———
from dotenv import load_dotenv
load_dotenv()

# ═══════════════════════════════════════════════════════════
# MODELS
# ═══════════════════════════════════════════════════════════

class ContactMessage(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=3, max_length=200)
    message: str = Field(..., min_length=10, max_length=5000)
    budget: Optional[str] = None
    timeline: Optional[str] = None

class ProjectReaction(BaseModel):
    project_id: str
    reaction: str  # emoji reaction

class ChatMessage(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)
    session_id: Optional[str] = None

class AnalyticsEvent(BaseModel):
    event_type: str  # 'scroll', 'click', 'hover', 'view', 'time_spent'
    target: Optional[str] = None
    value: Optional[Any] = None
    timestamp: Optional[str] = None
    session_id: Optional[str] = None

# ═══════════════════════════════════════════════════════════
# WEBSOCKET MANAGER
# ═══════════════════════════════════════════════════════════

class ConnectionManager:
    """Manages all active WebSocket connections for real-time features."""

    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.visitor_count: int = 0
        self.project_reactions: Dict[str, Dict[str, int]] = {}
        self.project_views: Dict[str, int] = {}

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        self.visitor_count += 1
        await self.broadcast({
            "type": "visitor_count",
            "count": self.visitor_count
        })

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
            self.visitor_count = max(0, self.visitor_count - 1)

    async def broadcast(self, message: dict):
        """Send message to ALL connected clients."""
        disconnected = []
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except Exception:
                disconnected.append(connection)
        for conn in disconnected:
            self.disconnect(conn)

    async def send_personal(self, websocket: WebSocket, message: dict):
        try:
            await websocket.send_json(message)
        except Exception:
            pass

    async def handle_reaction(self, project_id: str, reaction: str):
        if project_id not in self.project_reactions:
            self.project_reactions[project_id] = {}
        current = self.project_reactions[project_id].get(reaction, 0)
        self.project_reactions[project_id][reaction] = current + 1

        await self.broadcast({
            "type": "reaction_update",
            "project_id": project_id,
            "reactions": self.project_reactions[project_id]
        })

    async def handle_project_view(self, project_id: str):
        self.project_views[project_id] = self.project_views.get(project_id, 0) + 1
        await self.broadcast({
            "type": "project_views",
            "project_id": project_id,
            "views": self.project_views[project_id]
        })


manager = ConnectionManager()

# ═══════════════════════════════════════════════════════════
# APP LIFECYCLE
# ═══════════════════════════════════════════════════════════

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    db = Database()
    await db.connect()
    app.state.db = db
    app.state.ai = AIService()
    print("🚀 Portfolio Backend started — legendary mode")
    yield
    # Shutdown
    await db.disconnect()
    print("👋 Portfolio Backend shutting down")


# ═══════════════════════════════════════════════════════════
# APP INIT
# ═══════════════════════════════════════════════════════════

app = FastAPI(
    title="Shreyash Portfolio API — Legendary Edition",
    description="Real-time analytics, AI chatbot, WebSocket reactions, and more.",
    version="2.0.0",
    lifespan=lifespan,
)

# CORS — allow frontend origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "https://shreyash-portfolio.vercel.app",
        "https://shreyashsrivastava.dev",
        "*",  # Remove in production
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ═══════════════════════════════════════════════════════════
# REST ENDPOINTS
# ═══════════════════════════════════════════════════════════

@app.get("/")
async def root():
    return {
        "name": "Shreyash Portfolio API",
        "version": "2.0.0",
        "status": "legendary",
        "endpoints": {
            "health": "/health",
            "projects": "/api/projects",
            "contact": "/api/contact",
            "chat": "/api/chat",
            "analytics": "/api/analytics",
            "stats": "/api/stats",
            "websocket": "/ws",
        }
    }


@app.get("/health")
async def health():
    return {"status": "alive", "timestamp": datetime.now(timezone.utc).isoformat()}


# ——— PROJECTS ———

@app.get("/api/projects")
async def get_projects():
    """Return all portfolio projects with metadata and live reaction counts."""
    projects = [
        {
            "id": "ihatelovepdf",
            "title": "IHateLovePDF",
            "description": "100% client-side PDF toolkit — compress, merge, split, convert. Zero server uploads. Privacy guaranteed.",
            "tags": ["Next.js", "Privacy-First", "WASM", "TypeScript"],
            "url": "https://www.ihatelovepdf.com",
            "color": "#06D6A0",
            "metrics": {
                "privacy": "100% Client-Side",
                "speed": "<100ms",
                "size": "Unlimited"
            },
            "views": manager.project_views.get("ihatelovepdf", 0),
            "reactions": manager.project_reactions.get("ihatelovepdf", {}),
        },
        {
            "id": "portfolio-v2",
            "title": "Immersive Portfolio v2",
            "description": "Physics-driven 3D lanyard badge, glassmorphic sections, GSAP scroll animations. The site you're on right now.",
            "tags": ["Three.js", "Next.js", "GSAP", "WebGL"],
            "url": "#",
            "color": "#7C3AED",
            "metrics": {
                "fps": "60 FPS",
                "physics": "3D Physics",
                "design": "Dark Luxury"
            },
            "views": manager.project_views.get("portfolio-v2", 0),
            "reactions": manager.project_reactions.get("portfolio-v2", {}),
        },
        {
            "id": "ai-tools",
            "title": "AI Developer Tools",
            "description": "A suite of AI-powered productivity tools for developers — code review, architecture planning, and refactoring.",
            "tags": ["AI/ML", "Python", "FastAPI", "LLMs"],
            "url": "#",
            "color": "#F5C842",
            "metrics": {
                "engine": "LLM Powered",
                "latency": "Real-time",
                "api": "API-first"
            },
            "views": manager.project_views.get("ai-tools", 0),
            "reactions": manager.project_reactions.get("ai-tools", {}),
        },
    ]
    return {"projects": projects}


# ——— CONTACT FORM ———

@app.post("/api/contact")
async def submit_contact(msg: ContactMessage, request: Request):
    """Save contact message and optionally send email."""
    db: Database = request.app.state.db
    record = {
        "name": msg.name,
        "email": msg.email,
        "subject": msg.subject,
        "message": msg.message,
        "budget": msg.budget,
        "timeline": msg.timeline,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "new",
    }
    await db.save_contact(record)

    # Broadcast real-time notification
    await manager.broadcast({
        "type": "new_contact",
        "name": msg.name,
        "timestamp": record["created_at"],
    })

    return {"success": True, "message": "Message received! I'll get back to you soon. 🚀"}


# ——— AI CHATBOT ———

@app.post("/api/chat")
async def chat(msg: ChatMessage, request: Request):
    """AI-powered chatbot for portfolio questions."""
    ai: AIService = request.app.state.ai
    response = await ai.chat(msg.message, msg.session_id)
    return {"reply": response, "session_id": msg.session_id}


# ——— ANALYTICS ———

@app.post("/api/analytics")
async def track_event(event: AnalyticsEvent, request: Request):
    """Track user interaction events for analytics."""
    db: Database = request.app.state.db
    record = {
        "event_type": event.event_type,
        "target": event.target,
        "value": event.value,
        "timestamp": event.timestamp or datetime.now(timezone.utc).isoformat(),
        "session_id": event.session_id,
        "ip": request.client.host if request.client else None,
        "user_agent": request.headers.get("user-agent", ""),
    }
    await db.save_analytics(record)
    return {"tracked": True}


@app.get("/api/stats")
async def get_stats(request: Request):
    """Return aggregate portfolio statistics."""
    db: Database = request.app.state.db
    stats = await db.get_stats()
    stats["live_visitors"] = manager.visitor_count
    stats["total_reactions"] = sum(
        sum(r.values()) for r in manager.project_reactions.values()
    )
    return stats


# ——— REACTIONS ———

@app.post("/api/react")
async def react_to_project(reaction: ProjectReaction):
    """Add emoji reaction to a project (persisted via WebSocket)."""
    await manager.handle_reaction(reaction.project_id, reaction.reaction)
    return {"success": True}


# ═══════════════════════════════════════════════════════════
# WEBSOCKET ENDPOINT
# ═══════════════════════════════════════════════════════════

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        # Send initial state
        await manager.send_personal(websocket, {
            "type": "init",
            "visitor_count": manager.visitor_count,
            "project_reactions": manager.project_reactions,
            "project_views": manager.project_views,
        })

        while True:
            data = await websocket.receive_json()
            msg_type = data.get("type")

            if msg_type == "reaction":
                await manager.handle_reaction(
                    data.get("project_id", ""),
                    data.get("reaction", "🔥")
                )

            elif msg_type == "project_view":
                await manager.handle_project_view(data.get("project_id", ""))

            elif msg_type == "typing":
                # Broadcast typing indicator
                await manager.broadcast({
                    "type": "typing",
                    "section": data.get("section", "contact"),
                    "is_typing": data.get("is_typing", False),
                })

            elif msg_type == "cursor_position":
                # Multiplayer cursors (optional)
                await manager.broadcast({
                    "type": "cursor_position",
                    "x": data.get("x", 0),
                    "y": data.get("y", 0),
                    "id": id(websocket),
                })

            elif msg_type == "ping":
                await manager.send_personal(websocket, {"type": "pong"})

    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast({
            "type": "visitor_count",
            "count": manager.visitor_count
        })
    except Exception:
        manager.disconnect(websocket)


# ═══════════════════════════════════════════════════════════
# RUN
# ═══════════════════════════════════════════════════════════

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=True,
        log_level="info",
    )
