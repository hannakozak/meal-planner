# Meal Planner

A full-stack meal planning application built with Next.js, TypeScript, Prisma and PostgreSQL.

## Overview

Meal Planner is a full-stack web application designed to simplify everyday meal planning by bringing recipes, ingredients and meal organisation into one place.

Planning meals can involve several disconnected tasks: deciding what to cook, finding recipes, keeping track of ingredients and preparing shopping lists. The goal of this application is to provide a single platform where users can build and manage their personal recipe collection and organise their meals around it.

The application also integrates Google Gemini to generate recipe ideas based on ingredients provided by the user, helping users make better use of ingredients they already have.

## Live Demo

[Live Demo](https://meal-planner-mu-two.vercel.app/)

## Features

- User authentication
- Create, edit and delete recipes
- AI-powered recipe generation using Google Gemini
- Add ingredients with quantities and units
- Add and manage cooking instructions
- Optional recipe image upload
- Cloudinary image storage
- Responsive user interface
- Relational data model using PostgreSQL and Prisma

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React

### Backend

- Next.js Server Actions
- Prisma ORM
- PostgreSQL
- Auth.js

### External Services

- Google Gemini API for AI recipe generation
- Cloudinary for recipe image storage

### Development Tools

- Git
- GitHub
- ESLint
- Prettier

## AI Recipe Generation

The application integrates the Google Gemini API to generate recipes based on ingredients provided by the user.

The generated response is requested in JSON format, parsed by the application and persisted in PostgreSQL through Prisma.

This means AI-generated recipes become part of the user's recipe collection and can be managed in the same way as manually created recipes.

## Recipe Image Upload

Users can optionally upload an image when creating a recipe.

Images are uploaded directly to Cloudinary, while the returned secure URL is stored in PostgreSQL through Prisma.

The database stores the image URL rather than the image file itself.

## Technical Highlights

### Server Actions

Recipe creation, editing and deletion are handled using Next.js Server Actions.

This allows database mutations to remain on the server without creating unnecessary API endpoints for internal application operations.

### AI Integration

The Google Gemini API is integrated into the recipe creation workflow.

AI responses are requested in a structured JSON format and parsed before being persisted through Prisma.

This allows the application to treat AI-generated recipes as normal application data rather than temporary generated content.

### External Image Storage

Recipe images are stored using Cloudinary rather than directly in PostgreSQL.

Only the image URL is stored in the `Recipe.imageUrl` field.

### Reusable Components

The application uses reusable React components for common functionality such as:

- Recipe forms
- Ingredient fields
- Instruction fields
- Recipe editing
- Recipe deletion
- Image uploads
- Primary actions

This helps reduce duplicated UI logic and makes the application easier to extend.

## Authentication and Security

Authentication is implemented using Auth.js.

User-specific recipe data is associated with the authenticated user's account, and protected functionality requires authentication.

Sensitive configuration such as database credentials and API keys is stored using environment variables and is not committed to the repository.

The application does not expose API secrets to the client.

## Getting Started

### Prerequisites

Before running the application locally, make sure you have:

- Node.js
- PostgreSQL database
- Google Gemini API key
- Cloudinary account

### Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
cd meal-planner
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the project root:

```env
DATABASE_URL="your_database_url"

AUTH_SECRET="your_auth_secret"

GEMINI_API_KEY="your_gemini_api_key"

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"

NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="your_cloudinary_upload_preset"
```

Generate the Prisma client:

```bash
npx prisma generate
```

Run the database migrations:

```bash
npx prisma migrate dev
```

Start the development server:

```bash
npm run dev
```

Open the application at:

```text
http://localhost:3000
```

## What I Learned

Building this project has allowed me to practise and improve my skills in:

- Full-stack development with Next.js
- React and TypeScript
- Next.js Server Actions
- Authentication
- PostgreSQL database design
- Prisma ORM
- Relational data modelling
- CRUD operations
- Designing many-to-many relationships
- Integrating an LLM API into a real application
- Working with structured AI responses
- Persisting AI-generated data in a relational database
- Handling API errors and temporary failures
- Implementing client-side image uploads
- Working with Cloudinary
- Building reusable React components
- Organising a growing application by features
- Managing environment variables
- Using Git and GitHub for version control

## Roadmap

The following features are planned for future development:

- Weekly meal planner
- Assign recipes to specific days
- Automatic shopping list generation from planned meals
- Recipe search and filtering
- Recipe categories
- Recipe scaling based on the number of servings
- Nutritional information
- Improved mobile experience
- More advanced personalised recipe recommendations
