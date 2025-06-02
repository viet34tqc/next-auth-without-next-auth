# Next Auth Without Next Auth

A blog platform built with Next.js that implements custom authentication without using the Next Auth library. This project demonstrates how to build a secure authentication system from scratch in a Next.js application.

## Features

- **Custom Authentication System**

  - Email/password authentication
  - GitHub OAuth integration
  - Session management with cookies
  - Protected routes

- **Blog Platform**

  - Create, read, update, and delete posts
  - Post status management (Draft, Published, Pending)
  - Featured posts functionality
  - Dashboard for managing your own posts

- **User Experience**
  - Homepage displays all posts for everyone
  - Dashboard shows only the logged-in user's posts
  - Post detail pages with edit/delete options for post owners
  - Responsive design with Shadcn UI components

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **UI Components**: Shadcn UI
- **Backend**: Next.js API Routes, Server Actions
- **Database**: Prisma with SQLite (easily adaptable to other databases)
- **Authentication**: Custom implementation with cookies and sessions
- **OAuth**: GitHub integration using Arctic

## Project Structure

```plaintext
src/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Authentication routes (sign-in, sign-up)
│   ├── (authenticated)/    # Protected routes (dashboard)
│   ├── posts/              # Post-related routes and components
│   └── page.tsx            # Homepage
├── components/             # Reusable UI components
├── lib/                    # Utility functions and libraries
│   ├── auth/               # Authentication utilities
│   └── prisma.ts           # Prisma client
└── path.ts                 # Application routes
```

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/next-auth-without-next-auth.git
   cd next-auth-without-next-auth
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:

   ```env
   DATABASE_URL="file:./dev.db"
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   ```

4. Set up the database:

   ```bash
   pnpm prisma migrate dev
   ```

5. Run the development server:

   ```bash
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Authentication Flow

This project implements a custom authentication system:

1. **Registration**: Users can sign up with email/password or GitHub OAuth
2. **Login**: Users can sign in with their credentials
3. **Session Management**: Sessions are stored in the database and referenced by a secure cookie
4. **Protected Routes**: Some routes require authentication
5. **Authorization**: Post editing/deletion is restricted to post owners

## Database Schema

The database has three main models:

- **User**: Stores user information
- **Post**: Stores blog posts with a reference to the author
- **Session**: Stores active user sessions

---

## Running with Docker

### Environment Variables

Before building the Docker image, ensure you have a `.env` file in the project root with the following variables:

```env
DATABASE_URL="file:./dev.db"
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

The template `.env.example` file can be used as a reference.

### Build and Run

1. Build and start the application using Docker Compose:

   ```bash
   docker compose up --build
   ```

   This will build the image and start the `typescript-app` service.
