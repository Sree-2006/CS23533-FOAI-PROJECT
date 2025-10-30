# Fake and Real News Detection System

A full-stack machine learning application that detects fake news using Natural Language Processing (NLP) and AI-powered analysis.

## 🎯 Features

- **AI-Powered Detection**: Uses Machine Learning (Naive Bayes with TF-IDF) to classify news as FAKE or REAL
- **Comprehensive Analysis**: 
  - News Source Credibility Checker
  - Keyword Highlighting
  - Prediction Explanation Panel
  - Time-Based Fake News Trend Analysis
  - Propagation Burst Visualizer
  - Emotion-Headline Mismatch Highlighter
- **Modern UI**: Built with React.js, featuring a clean 2-page dashboard
- **Real-time Results**: Instant analysis with detailed confidence scores

## 🏗️ Project Structure

```
.
├── client/                  # React.js frontend
│   ├── src/
│   │   ├── pages/          # Home and Detection pages
│   │   ├── components/     # Reusable UI components
│   │   └── lib/            # Utilities
│   └── index.html
│
├── python_backend/         # Flask backend
│   ├── app.py             # Flask API server
│   ├── dataset.py         # Dataset creation
│   ├── train_model.py     # ML model training
│   ├── init.py            # Initialization script
│   ├── data/              # Generated dataset
│   └── models/            # Trained ML models
│
├── server/                 # Express.js proxy server
│   └── routes.ts          # API routes and Flask proxy
│
└── start.sh               # Startup script
```

## 🚀 How to Run

### Prerequisites

- Node.js (v20+)
- Python 3.11+

### Running the Application

1. **Click the Run button** in Replit - this will:
   - Create the fake and real news dataset
   - Train the machine learning model
   - Start the Flask backend (port 5001)
   - Start the Express/Vite frontend server (port 5000)

2. **Access the application** at the provided Replit URL

### Manual Setup (if needed)

```bash
# Install Python dependencies
pip install flask scikit-learn pandas numpy joblib flask-cors

# Install Node.js dependencies
npm install

# Run the startup script
bash start.sh
```

## 📊 Dataset

The system uses a custom-generated dataset with:
- **30 Fake News samples**: Contains sensationalist language, emotional manipulation, and misleading information
- **30 Real News samples**: Factual, well-structured news from credible sources
- **Balanced split**: 50/50 distribution for unbiased training

## 🤖 Machine Learning Model

- **Algorithm**: Multinomial Naive Bayes
- **Feature Extraction**: TF-IDF (Term Frequency-Inverse Document Frequency)
- **Vectorization**: Up to 1000 features with unigrams and bigrams
- **Training/Testing Split**: 80/20
- **Expected Accuracy**: ~85-95%

## 🎨 Frontend Pages

### Page 1 - Home
- Hero section with detection system banner
- About section explaining the system's purpose
- Feature cards showcasing capabilities
- Large "EXPLORE" button to navigate to detection page

### Page 2 - Detection
- Text input area for pasting news content
- "Analyze News" button for prediction
- Results display with FAKE/REAL classification
- Confidence score visualization
- Six interactive feature boxes:
  1. **Source Credibility Checker** - Evaluates trustworthiness
  2. **Keyword Highlighting** - Shows suspicious words
  3. **Prediction Explanation** - Explains the classification
  4. **Trend Analysis** - Visualizes fake news spread over time
  5. **Propagation Visualizer** - Shows sharing intensity
  6. **Emotion Mismatch** - Detects headline vs content mismatches

## 🔧 API Endpoints

### POST `/api/predict`
Analyzes news text and returns prediction with detailed analysis.

**Request:**
```json
{
  "text": "News article content here..."
}
```

**Response:**
```json
{
  "prediction": "FAKE" | "REAL",
  "confidence": 87,
  "keywords": ["shocking", "unbelievable"],
  "sourceCredibility": {
    "score": 23,
    "factors": ["Unknown domain", "No citations"]
  },
  "explanation": ["Reason 1", "Reason 2"],
  "trendData": [{"date": "Mon", "count": 12}],
  "propagationScore": 76,
  "emotionMismatch": {
    "score": 68,
    "headline": "Angry",
    "content": "Neutral"
  }
}
```

### GET `/api/health`
Check backend health status.

## 🛠️ Technology Stack

**Frontend:**
- React.js with TypeScript
- Tailwind CSS for styling
- Wouter for routing
- TanStack Query for data fetching
- Recharts for data visualization
- Shadcn UI components

**Backend:**
- Python Flask REST API
- scikit-learn for ML
- pandas & numpy for data processing
- joblib for model persistence
- Flask-CORS for cross-origin requests

**Integration:**
- Express.js proxy server
- Node.js (v20)

## 📝 Development Notes

- The dataset is automatically generated on first run
- The ML model is trained automatically during initialization
- Models are saved to `python_backend/models/` for reuse
- The Express server proxies frontend requests to Flask backend
- Both servers run concurrently via the startup script

## 🎯 Future Enhancements

- User history to track checked articles
- Model retraining with user feedback
- Batch processing for multiple articles
- External news API integration
- Advanced visualization dashboard
- Multi-language support


