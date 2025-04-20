# Mini Job Board
A simple job board web application built with **Next.js**, **Postgresql (via Prisma)**, and **Tailwind CSS**.

## Features
- Public job listings page
- Admin Authentication (Email/Password)
- Admin Dashboard (Add/Delete jobs)
- Role based access control

## Tech Stack
- **Frontend**: Next.js
- **Backend**: Next.js API routes
- **Database**: Postgresql
- **ORM**: Prisma
- **Authentication**: NextAuth.js (Session-based)
- **Styling**: Tailwind CSS

## Setup

1. Clone the repo
git clone https://github.com/sandilavi/job-board-app.git
cd job-board-app

2. Install dependencies
npm install

3. Create a .env file
DATABASE_URL="postgresql://postgres:(DB_PASSWORD)@localhost:5432/(DB_NAME)?schema=public"

4. Run database migration
npx prisma migrate dev

5. Start the dev server
npm run dev
