# Viaduct Insights - Internal SaaS Tool

This project is an **internal SaaS tool** for **Viaduct Generation**.  
It supports workflow, SEO insights, client data management, and AI-powered decision-making for marketing and sales teams.

---

## Features
- **Authentication** (Signup, Login, Refresh Tokens with JWT)
- **Role-based access** (SEO, Marketing, Sales, Admin)
- **Scalable MVC Architecture**
- **Integration-ready** for SEO & AI APIs (Moz, Ahrefs, AlsoAsked, etc.)
- **PostgreSQL database**

---

## Tech Stack
- **Backend**: Node.js (Express, MVC)
- **Database**: PostgreSQL
- **Frontend**: React (planned)
- **Deployment**: AWS (or similar cloud hosting)
- **Auth**: JWT (Access + Refresh tokens)

---

## Project Structure
Backend/
  config/
    db.js
  controllers/
    authController.js
  routes/
    authRoutes.js
  utils/
    tokenService.js
server.js
package.json
.env

## Clone Repo
git clone https://github.com/TeraByte07/viaduct-insights.git
cd viaduct-insights/Backend

## Install dependencies
npm install

## Configure environment
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/viaduct_db
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

## Run the server
npm run dev
Then server will start at -- http://localhost:5000

## API Endpoints
POST /api/auth/signup -> Register new user
POST /api/auth/login -> Login user
POST /api/auth/refresh -> refresh token
