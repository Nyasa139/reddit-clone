
# 🌐 Reddit-Clone MVP

A high-performance, visually stunning, full-stack Reddit clone built with **Next.js 16 (App Router)**, **React 19**, **Prisma**, **NextAuth**, and **Tailwind CSS**. Featuring community creation, posts with upvoting/downvoting dynamics, nested replies/comments, and an interactive real-time notification center.

---

## ✨ Features

- **🔐 Robust Authentication**: Secure user registration and login powered by **NextAuth.js** and hashed passwords via **Bcrypt.js**.
- **👥 Custom Communities (Subreddits)**: Create communities with custom slugs, names, and view community-specific feeds.
- **📝 Dynamic Posting**: Submit text posts with support for optional rich media/image links to any community.
- **🗳️ Real-Time Vote Engine**: Upvote or downvote posts with database-level constraints protecting against duplicate votes.
- **💬 Nested Comment System**: Engaging discussions with support for comment threads and deep nested replies.
- **🔔 Interactive Notification Center**: Real-time notifications for upvotes and comments on posts, managed via a clean, glassmorphic dropdown header menu.
- **🌌 Ultra-Modern Design**: Dark-mode first design utilizing custom glassmorphism components (`glass-panel`), smooth transitions, and premium tailwind styling.

---

## 🛠️ Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) | Hybrid SSR/Static generation, Server Components, and API routing. |
| **Frontend** | [React 19](https://react.dev/) / [TypeScript](https://www.typescriptlang.org/) | Next-generation React features and strict type safety. |
| **Database ORM** | [Prisma](https://www.prisma.io/) | Next-generation Node.js and TypeScript ORM. |
| **Database** | PostgreSQL / SQLite | Robust relational storage mapping posts, users, votes, and comments. |
| **Authentication** | [NextAuth.js](https://next-auth.js.org/) | Secure token-based session management and credential authentication. |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) / [Lucide Icons](https://lucide.dev/) | Premium styled utility layout and beautiful vector graphics. |

---

## 📂 Project Architecture

```txt
reddit-clone/
├── prisma/
│   ├── schema.prisma   # Database schema definitions and relations
│   └── seed.ts         # Seeding script with dummy users, posts, and votes
├── src/
│   ├── app/
│   │   ├── (auth)/     # Authentication pages (login/signup)
│   │   ├── api/        # REST API endpoints (auth, community, notifications, post)
│   │   ├── r/          # Subreddit and post rendering routes
│   │   ├── layout.tsx  # Application shell with Providers and Navbar
│   │   └── page.tsx    # Homepage feed sorting (Hot, New, Top)
│   ├── components/     # Reusable UI components (Navbar, CommentForm, PostVoteClient, etc.)
│   ├── lib/            # Configuration utilities (Prisma client singleton)
│   └── types/          # Custom TypeScript declarations
```

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### 📋 Prerequisites

- **Node.js** (v18.x or higher recommended)
- **npm**, **yarn**, **pnpm**, or **bun**
- A **PostgreSQL** instance (or configure Prisma to use SQLite if running locally without Postgres)

---

### ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/reddit-clone.git
   cd reddit-clone
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and define the following variables:
   ```env
   # Database connection string
   DATABASE_URL="postgresql://username:password@localhost:5432/reddit_clone?schema=public"

   # NextAuth configuration
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-super-secret-key-change-this-in-production"
   ```

4. **Initialize the Database:**
   Apply the Prisma schema to your database:
   ```bash
   npx prisma db push
   ```

5. **Seed Default Data (Optional):**
   Populate the database with test users, subreddits, posts, and comments:
   ```bash
   npx prisma db seed
   ```

---

### 💻 Running the Application

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🎛️ Available Scripts

In the project directory, you can run:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Runs the app in development mode at [http://localhost:3000](http://localhost:3000). |
| `npm run build` | Generates the Prisma Client, pushes schema modifications, and builds the production Next.js app. |
| `npm run start` | Starts the production server after building. |
| `npm run lint` | Runs ESLint analysis to identify code quality issues. |
| `npx prisma studio` | Launches the interactive Prisma database GUI (accessible at `http://localhost:5555`). |

---

## 📜 Database Schema Summary

The relational database schema is structured around the following key models:
- **`User`**: Holds usernames, hashed passwords, and associations to posts, comments, votes, and notifications.
- **`Community`**: Represents subreddits containing unique name, slug, and posts.
- **`Post`**: Core content post containing titles, body text, optional imageUrls, author relationships, score tallies, and comments.
- **`Comment`**: Handles discussions per post, self-relating for recursive/nested reply chains.
- **`Vote`**: Keeps track of `UP` or `DOWN` choices per user and post, configured with a unique compound constraint to prevent double voting.
- **`Notification`**: Real-time alerts referencing activity type (new comment, post upvoted) and read/unread status.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/reddit-clone/issues) if you want to contribute.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---


```
