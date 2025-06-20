# Real-time Pursuit Routing Backend (NestJS + OSRM + Redis)

A lightweight NestJS service that:
1. Receives live positions for two moving points **A** and **B**
2. Calculates a route from A → B every 5 s using OSRM
3. Publishes the route as GeoJSON on a Redis channel (`route-updates`)
4. Broadcasts the same data to WebSocket clients

---

## Table of Contents
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Running](#running)
- [API Reference](#api-reference)
- [WebSocket Events](#websocket-events)
- [Folder Structure](#folder-structure)
- [Production Notes](#production-notes)

---

## Prerequisites
| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 18 + | Runtime |
| npm / pnpm / yarn | latest | Package manager |
| Docker & Docker Compose | ≥ 20 | OSRM + Redis containers |

---

## Quick Start
```bash
# clone repo & install deps
npm install

# copy env template
cp .env.example .env

# launch OSRM and Redis
docker-compose up -d

# start the Nest app
npm run start:dev
