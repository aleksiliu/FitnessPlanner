# Fitness Planner

Fitness Planner is a personalized workout generator built with Astro, React, and TypeScript. It uses AI (Google Gemini) to create custom fitness plans based on user input.

## Features

- Personalized fitness plan generation
- User authentication with Clerk
- Responsive design with Tailwind CSS
- TypeScript for type safety
- Server-side rendering with Astro

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/aleksiliu/FitnessPlanner.git
   cd fitness-planner
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```
   PUBLIC_GOOGLEAPI_KEY=your_api_key_here
   PUBLIC_CLERK_PUBLISHABLE_KEY=your_api_key_here
   ```

4. Start the development server:

   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:4321`

## Technologies Used

- [Astro](https://astro.build/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Clerk](https://clerk.dev/)
