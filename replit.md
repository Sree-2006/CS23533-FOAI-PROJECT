# Fake News Detection System

## Overview

A full-stack machine learning application that detects fake news using Natural Language Processing (NLP) and AI-powered analysis. The system combines a React.js frontend with a Python Flask backend running a Naive Bayes classifier with TF-IDF vectorization. Users can input news content and receive real-time predictions about authenticity, along with detailed analysis including source credibility scores, keyword highlighting, prediction explanations, trend analysis, propagation metrics, and emotion-headline mismatch detection.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React.js with TypeScript for type safety
- Vite as the build tool and dev server
- Wouter for lightweight client-side routing
- TanStack Query for server state management
- shadcn/ui components built on Radix UI primitives
- Tailwind CSS for styling with custom design system

**Design System:**
- Dark mode primary theme with trust-building color palette
- Primary colors: Trust Blue (verification), Success Green (real news), Danger Red (fake news), Accent Purple (insights)
- Typography: Inter font family for UI, JetBrains Mono for technical data
- Component library follows "New York" shadcn style variant
- Responsive layouts with mobile-first approach

**Page Structure:**
- Two-page dashboard: Home page with hero banner and About section, Detection page with analysis interface
- Navigation via shared Navbar component
- Feature boxes for displaying analysis results (6 distinct analysis types)
- Result display component showing prediction with confidence scores

**State Management:**
- React Query for API data fetching and caching
- Local component state for UI interactions (expanded boxes, form inputs)
- Toast notifications for user feedback

### Backend Architecture

**Express.js Proxy Server:**
- Acts as intermediary between React frontend and Flask ML backend
- Proxies `/api/predict` requests to Flask service on port 5001
- Health check endpoint for monitoring Flask availability
- Serves static frontend assets in production

**Python Flask ML Service:**
- Lightweight Flask API on port 5001
- Loads pre-trained ML model and TF-IDF vectorizer from disk
- Provides `/api/predict` endpoint for news classification
- Implements analysis features: keyword extraction, source credibility scoring, trend generation, propagation metrics, emotion analysis

**Machine Learning Pipeline:**
- Naive Bayes (MultinomialNB) classifier with alpha=0.1
- TF-IDF vectorization with max 1000 features, unigrams and bigrams
- Custom dataset creation (30 fake samples, 30 real samples)
- 80/20 train-test split with stratification
- Model persistence using joblib

**Initialization Flow:**
- `python_backend/init.py` orchestrates setup
- `dataset.py` creates balanced fake/real news dataset
- `train_model.py` trains and evaluates model, saves artifacts to `models/` directory
- Startup script runs initialization before starting servers

### Data Storage

**Model Artifacts:**
- Pre-trained model stored in `python_backend/models/fake_news_model.pkl`
- TF-IDF vectorizer stored in `python_backend/models/tfidf_vectorizer.pkl`
- Dataset saved as CSV in `python_backend/data/news_dataset.csv`

**Database Configuration:**
- Drizzle ORM configured with PostgreSQL support (via Neon serverless driver)
- Schema defined in `shared/schema.ts`
- Note: Application currently uses in-memory storage; database integration available but not actively used for ML predictions
- User storage implemented via `MemStorage` class in `server/storage.ts`

### External Dependencies

**Third-Party Services:**
- Google Fonts (Inter, JetBrains Mono)
- Replit-specific integrations for development environment

**Key NPM Packages:**
- `@neondatabase/serverless`: PostgreSQL serverless driver
- `drizzle-orm` & `drizzle-kit`: Type-safe ORM and migrations
- `@tanstack/react-query`: Server state management
- `recharts`: Data visualization for trend charts
- `react-hook-form` & `@hookform/resolvers`: Form handling
- `zod`: Runtime schema validation
- `class-variance-authority` & `clsx`: Dynamic class name generation
- Radix UI primitives for accessible components

**Python Packages:**
- `flask` & `flask-cors`: Web framework and CORS support
- `scikit-learn`: ML algorithms and preprocessing
- `pandas` & `numpy`: Data manipulation
- `joblib`: Model serialization

**Build Tools:**
- Vite for frontend bundling
- esbuild for server-side bundling
- TypeScript compiler for type checking
- Tailwind CSS with PostCSS for styling

**Development Tools:**
- `@replit/vite-plugin-runtime-error-modal`: Error overlay
- `@replit/vite-plugin-cartographer`: Code mapping
- `@replit/vite-plugin-dev-banner`: Development banner
- `tsx`: TypeScript execution for Node.js