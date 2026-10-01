# Ankit Patel — Portfolio (MERN, dark minimal)

Inspired by the shailesh-acharya style: dark-only, minimal, professional with small handwritten accents.

## Structure

```
client/  Vite + React 19 + TS + Tailwind v4 + react-router
server/  Express + TS + Mongoose (optional MONGO_URI, falls back to dummy blogs)
```

## Run

```powershell
# client (http://localhost:5173)
npm run dev:client

# server (http://localhost:5000)
npm run dev:server
```

Server serves `GET /api/blogs`, `GET /api/blogs/:slug`, `GET /api/health`.
Without `MONGO_URI` it serves the 6 dummy blogs from memory. Set `MONGO_URI` in `server/.env` to persist via MongoDB (auto-seeds once).

## Sections

- Hero (live IST clock, GitHub avatar w/ fallback, stack pills)
- Stats, About, Experience, Expertise
- Blog preview (homepage, 3) + `/blog` list + `/blog/:slug` reading page
- Quote + Connect + Footer — no projects section, per your choice

Fonts: Inter + Space Grotesk + Caveat (accents) + JetBrains Mono.
