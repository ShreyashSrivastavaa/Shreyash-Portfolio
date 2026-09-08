import { NextResponse } from 'next/server'

const SMART_RESPONSES = {
  greeting: "Hey there! 👋 Welcome to Shreyash's portfolio. Ask me anything about his work, skills, or availability!",
  skills: "Shreyash specializes in Node.js, Express, NestJS, PostgreSQL, Prisma ORM, Redis, RabbitMQ, Docker, Next.js, and TypeScript.",
  projects: "Shreyash has built several active projects:\n1. IHateLovePDF (ihatelovepdf.com): In-browser PDF utility suite with zero server uploads.\n2. HMS: Hospital workflow and clinical record management platform.\n3. ZyMeal (zymeal.vercel.app): Real-time food ordering app with live order tracking.\n4. GitFC (gitfc.vercel.app): EA FC style GitHub developer card generator.\n5. SwipeRide: Ride-sharing backend with geospatial driver matching.",
  work: "Shreyash completed a 6-month Backend SDE Internship at JBH Tech Innovation and is a B.Tech CSE student at ITS Engineering College (AKTU), graduating in 2026.",
  contact: "You can reach Shreyash directly at shreyashsr2004@gmail.com ✉️ or upscaletechsolution@gmail.com, or via LinkedIn & GitHub in the Contact section below!",
  price: "Project pricing depends on scope and complexity. Feel free to send details via the contact form or email shreyashsr2004@gmail.com for a custom quote!",
  availability: "Shreyash is currently open for full-time Backend SDE roles, internships, and freelance projects! 🚀",
  about: "Shreyash Srivastava is a Backend Software Engineer and former SDE Intern at JBH Tech Innovation (6 Months). He is pursuing B.Tech CSE at ITS Engineering College (AKTU), graduating in 2026.",
  pdf: "IHateLovePDF (https://www.ihatelovepdf.com/) is Shreyash's flagship privacy-focused PDF toolkit. All processing is done locally in your browser with zero server uploads! 📄",
  fallback: "Shreyash is a Backend SDE & Full-Stack Engineer skilled in Node.js, Express, NestJS, PostgreSQL, Prisma, Redis, RabbitMQ, and Docker. You can email him at shreyashsr2004@gmail.com or browse his projects below! 🤝",
}

function getSmartReply(message) {
  const msg = (message || '').toLowerCase().trim()

  if (/\b(pdf|ihatelovepdf|compress|merge|convert)\b/.test(msg)) return SMART_RESPONSES.pdf
  if (/\b(project|projects|work|built|made|portfolio|showcase|app|apps|gitfc|swiperide|quickbite)\b/.test(msg)) return SMART_RESPONSES.projects
  if (/\b(skill|skills|tech|stack|know|language|framework|tools|backend|node|postgres|redis|docker)\b/.test(msg)) return SMART_RESPONSES.skills
  if (/\b(contact|hire|email|reach|freelance|touch|mail)\b/.test(msg)) return SMART_RESPONSES.contact
  if (/\b(price|cost|rate|budget|charge|quote)\b/.test(msg)) return SMART_RESPONSES.price
  if (/\b(available|availability|free|busy|schedule|open|hiring|job|role)\b/.test(msg)) return SMART_RESPONSES.availability
  if (/\b(about|who|experience|background|bio|education|college|aktu)\b/.test(msg)) return SMART_RESPONSES.about
  if (/^\b(hi|hello|hey|sup|yo|hola|namaste|greetings)\b/i.test(msg)) return SMART_RESPONSES.greeting

  return SMART_RESPONSES.fallback
}

export async function POST(req) {
  try {
    const { message } = await req.json()
    const reply = getSmartReply(message)
    return NextResponse.json({ reply })
  } catch (error) {
    return NextResponse.json(
      { reply: SMART_RESPONSES.fallback },
      { status: 200 }
    )
  }
}
