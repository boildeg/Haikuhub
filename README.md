# HaikuHub Next.js Application

A modern web application built with Next.js, featuring CRUD operations, authentication, and image upload capabilities.

## Features

- 🔐 User Authentication with JWT and bcrypt
- 📁 File uploads using Cloudinary with AI-powered image transformations (auto-resizing, smart cropping, and enhancement)
- 💾 MongoDB database integration
- 🎨 Modern UI with Tailwind CSS and DaisyUI
- ⚡ Server-side rendering with Next.js

## Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB database
- Cloudinary account

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd crud-next
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_URL=your_cloudinary_url
```

## Development

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Build and Production

To build the application:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Tech Stack

- **Frontend**: React, Next.js
- **Styling**: Tailwind CSS, DaisyUI
- **Database**: MongoDB
- **Authentication**: JWT, bcrypt
- **File Storage**: Cloudinary
- **Build Tools**: PostCSS, Autoprefixer

## License

ISC License
