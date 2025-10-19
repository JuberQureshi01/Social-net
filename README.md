# SocialNet a Twitter Clone

A full-stack, feature-rich clone of Twitter built with a modern technology stack including Next.js, Node.js, GraphQL, and PostgreSQL. This project showcases a scalable architecture, real-time interactivity with optimistic UI updates, and a clean, responsive user interface.

---

## Features

- **Authentication**: Secure user sign-up and login using Google OAuth.
- **Tweet Functionality**: Create, view, like, and comment on tweets.
- **Image Uploads**: Users can upload images with their tweets, powered by Cloudinary.
- **Interactive Feed**: An infinite scrolling feed that loads tweets on demand for a fast user experience.
- **User Profiles**: View user profiles with their tweets and follower/following counts.
- **Social Graph**: Follow and unfollow other users.
- **Real-time Updates**: Optimistic UI updates for instantaneous feedback on actions like creating a tweet or liking a post.
- **Responsive Design**: A mobile-first design that looks great on all devices.

---

## Tech Stack

### Frontend
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query (for server state, caching, and optimistic UI)
- **API Communication**: GraphQL with `graphql-request`
- **Authentication**: Google OAuth (`@react-oauth/google`)

### Backend
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **API**: GraphQL with Apollo Server
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Caching**: Redis
- **Image Storage**: Cloudinary

---

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- PostgreSQL database
- Redis instance
- A Cloudinary account
- A Google Cloud project with OAuth 2.0 credentials

### Backend Setup

1.  **Clone the repository**:
    ```bash
    git clone <your-repository-url>
    cd <your-repository-url>/backend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up environment variables**:

4.  **Run database migrations**:
    ```bash
    npx prisma migrate dev
    ```

5.  **Start the development server**:
    ```bash
    npm run dev
    ```
    The backend will be running at `http://localhost:8000`.

### Frontend Setup

1.  **Navigate to the frontend directory**:
    ```bash
    cd ../frontend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up environment variables**:

4.  **Start the development server**:
    ```bash
    npm run dev
    ```
    The frontend will be running at `http://localhost:3000`.

---

## Available Scripts

### Backend
- `npm run dev`: Starts the development server with hot-reloading.
- `npm run build`: Compiles the TypeScript code to JavaScript.
- `npm start`: Starts the production server.
- `npx prisma migrate dev`: Runs database migrations.
- `npx prisma studio`: Opens the Prisma Studio to view and edit your database.

### Frontend
- `npm run dev`: Starts the development server with hot-reloading and GraphQL codegen watcher.
- `npm run build`: Builds the application for production.
- `npm start`: Starts the production server.
- `npm run codegen`: Runs the GraphQL code generator to create TypeScript types from your schema.

---

## Future Improvements

- **Notifications**: Implement real-time notifications for likes, comments, and follows.
- **Retweets**: Add the ability to retweet and quote tweet.
- **Direct Messages**: Build a real-time chat feature between users.
- **Grok AI**: Integrate a conversational AI feature for users to interact with.
- **Testing**: Add unit and integration tests to ensure code quality and reliability.
