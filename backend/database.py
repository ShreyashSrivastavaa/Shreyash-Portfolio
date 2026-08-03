# ═══════════════════════════════════════════════════════════
# Database Layer — MongoDB / In-Memory Fallback
# Shreyash Portfolio Legendary Edition
# ═══════════════════════════════════════════════════════════

import os
import json
from datetime import datetime, timezone
from typing import Dict, List, Any, Optional


class Database:
    """
    Abstracted database layer.
    Uses MongoDB if MONGO_URI is set, otherwise falls back to in-memory storage.
    """

    def __init__(self):
        self.mongo_uri = os.getenv("MONGO_URI", "")
        self.db = None
        self.client = None
        self._memory: Dict[str, List[dict]] = {
            "contacts": [],
            "analytics": [],
            "testimonials": [],
        }
        self._use_mongo = False

    async def connect(self):
        if self.mongo_uri:
            try:
                from motor.motor_asyncio import AsyncIOMotorClient
                self.client = AsyncIOMotorClient(self.mongo_uri)
                self.db = self.client.get_database("portfolio")
                # Test connection
                await self.client.admin.command("ping")
                self._use_mongo = True
                print("✅ Connected to MongoDB Atlas")
            except Exception as e:
                print(f"⚠️  MongoDB connection failed ({e}), using in-memory storage")
                self._use_mongo = False
        else:
            print("ℹ️  No MONGO_URI set — using in-memory storage")

    async def disconnect(self):
        if self.client:
            self.client.close()
            print("🔌 MongoDB disconnected")

    # ——— Contact Messages ———

    async def save_contact(self, record: dict):
        if self._use_mongo:
            await self.db.contacts.insert_one(record)
        else:
            self._memory["contacts"].append(record)
        print(f"📬 Contact saved from {record.get('name', 'unknown')}")

    async def get_contacts(self, limit: int = 50) -> List[dict]:
        if self._use_mongo:
            cursor = self.db.contacts.find({}, {"_id": 0}).sort("created_at", -1).limit(limit)
            return await cursor.to_list(length=limit)
        return self._memory["contacts"][-limit:]

    # ——— Analytics Events ———

    async def save_analytics(self, record: dict):
        if self._use_mongo:
            await self.db.analytics.insert_one(record)
        else:
            self._memory["analytics"].append(record)
            # Keep in-memory cap at 10K events
            if len(self._memory["analytics"]) > 10000:
                self._memory["analytics"] = self._memory["analytics"][-5000:]

    async def get_analytics_count(self, event_type: Optional[str] = None) -> int:
        if self._use_mongo:
            query = {"event_type": event_type} if event_type else {}
            return await self.db.analytics.count_documents(query)
        if event_type:
            return sum(1 for e in self._memory["analytics"] if e.get("event_type") == event_type)
        return len(self._memory["analytics"])

    # ——— Testimonials ———

    async def get_testimonials(self) -> List[dict]:
        if self._use_mongo:
            cursor = self.db.testimonials.find({}, {"_id": 0})
            return await cursor.to_list(length=100)
        return self._memory["testimonials"]

    async def add_testimonial(self, record: dict):
        if self._use_mongo:
            await self.db.testimonials.insert_one(record)
        else:
            self._memory["testimonials"].append(record)

    # ——— Aggregate Stats ———

    async def get_stats(self) -> dict:
        total_events = await self.get_analytics_count()
        total_clicks = await self.get_analytics_count("click")
        total_scrolls = await self.get_analytics_count("scroll")
        total_views = await self.get_analytics_count("view")
        total_contacts = len(self._memory["contacts"]) if not self._use_mongo else await self.db.contacts.count_documents({})

        return {
            "total_events": total_events,
            "total_clicks": total_clicks,
            "total_scrolls": total_scrolls,
            "total_page_views": total_views,
            "total_contacts": total_contacts,
            "projects_shipped": 20,
            "happy_clients": 15,
            "years_experience": 3,
            "lines_of_code": "∞",
        }
