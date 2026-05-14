# 🎬 Advanced Movie Discovery App

A modern, high-performance React application for discovering movies, tracking trending content, and managing personal favorites. Built with a focus on premium UI/UX, responsive design, and seamless integrations.

## ✨ Features

- **Trending Movies Carousel:** Immersive, dynamic carousel powered by Swiper.js for the latest trending movies.
- **Movie Search & Discovery:** Robust search functionality with live fetching.
- **Detailed Movie Information:** Dedicated pages for comprehensive movie details.
- **Favorites & Watchlist:** Context-based state management to save and view favorite movies.
- **Responsive "Mobile-First" Design:** Fully optimized layouts across all devices with a modern hamburger navigation.
- **Dark Cinematic Aesthetic:** Premium styling utilizing Tailwind CSS v4 to give a true cinematic feel.
- **Custom Backend Integration:** Appwrite utilized for tracking search metrics and managing trending logic.

## 🛠️ Tech Stack

- **Frontend Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Routing:** [React Router DOM](https://reactrouter.com/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Carousel/Sliders:** [Swiper](https://swiperjs.com/)
- **Backend/BaaS:** [Appwrite](https://appwrite.io/)
- **Custom Hooks/Utils:** [React-Use](https://github.com/streamich/react-use)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Yarn](https://yarnpkg.com/) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/haivip777/Movie-Project.git
   cd Movie-Project
   ```

2. **Install dependencies**
   ```bash
   yarn install
   # or npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory based on the provided `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Fill in your API keys and project IDs in `.env`:
   ```env
   VITE_API_KEY=your_tmdb_api_key_here
   VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id_here
   VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id_here
   VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id_here
   ```

4. **Start the development server**
   ```bash
   yarn dev
   # or npm run dev
   ```

## 📁 Project Structure

```text
src/
├── assets/          # Static files (images, icons, etc.)
├── components/      # Reusable UI components (Navbar, MovieCard, Footer, FAQ, etc.)
├── context/         # React Context providers (WatchlistContext)
├── pages/           # Page level components (Home, MovieDetails, Favorites)
├── App.jsx          # Main application component & routing
├── appwrite.js      # Appwrite BaaS configuration
├── index.css        # Global styles and Tailwind directives
└── main.jsx         # React application entry point
```

## 📜 Scripts

- `yarn dev` - Starts the Vite development server.
- `yarn build` - Builds the app for production.
- `yarn preview` - Locally preview the production build.
- `yarn lint` - Runs ESLint to check for code quality.
- `yarn deploy` - Deploys the built application to GitHub Pages.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/haivip777/Movie-Project/issues).

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
