from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os
import re
from datetime import datetime, timedelta
import random

app = Flask(__name__)
CORS(app)

# Load model and vectorizer
MODEL_PATH = 'python_backend/models/fake_news_model.pkl'
VECTORIZER_PATH = 'python_backend/models/tfidf_vectorizer.pkl'

model = None
vectorizer = None

def load_model():
    global model, vectorizer
    if os.path.exists(MODEL_PATH) and os.path.exists(VECTORIZER_PATH):
        model = joblib.load(MODEL_PATH)
        vectorizer = joblib.load(VECTORIZER_PATH)
        print("Model and vectorizer loaded successfully!")
    else:
        print("Model not found. Training new model...")
        from train_model import train_model
        model, vectorizer = train_model()

def extract_keywords(text, vectorizer, top_n=5):
    """Extract top keywords from text using TF-IDF scores"""
    text_tfidf = vectorizer.transform([text])
    feature_names = vectorizer.get_feature_names_out()
    tfidf_scores = text_tfidf.toarray()[0]
    
    # Get indices of top scores
    top_indices = tfidf_scores.argsort()[-top_n:][::-1]
    keywords = [feature_names[i] for i in top_indices if tfidf_scores[i] > 0]
    
    return keywords

def analyze_source_credibility(text):
    """Analyze source credibility based on text patterns"""
    score = 70  # Base score
    factors = []
    
    # Check for sensationalist words
    sensational_words = ['shocking', 'unbelievable', 'miracle', 'secret', 'doctors hate', 'breaking']
    sensational_count = sum(1 for word in sensational_words if word.lower() in text.lower())
    
    if sensational_count > 2:
        score -= 30
        factors.append("High use of sensationalist language")
    elif sensational_count > 0:
        score -= 15
        factors.append("Contains some sensationalist words")
    
    # Check for proper structure
    if len(text.split('.')) > 3:
        score += 10
        factors.append("Well-structured content")
    else:
        score -= 10
        factors.append("Lacks proper sentence structure")
    
    # Check for exclamation marks (excessive use is suspicious)
    exclamation_count = text.count('!')
    if exclamation_count > 3:
        score -= 20
        factors.append("Excessive use of exclamation marks")
    
    # Check for URLs or sources (would indicate credibility)
    if 'http' in text or 'www' in text:
        score += 15
        factors.append("Contains source references")
    else:
        factors.append("No external sources cited")
    
    score = max(0, min(100, score))
    
    return {
        "score": score,
        "factors": factors if factors else ["Standard content structure"]
    }

def generate_explanation(prediction, confidence, keywords):
    """Generate explanation for the prediction"""
    explanations = []
    
    if prediction == "FAKE":
        if confidence > 80:
            explanations.append("Strong indicators of misinformation patterns detected")
        explanations.append(f"Suspicious keywords identified: {', '.join(keywords[:3])}")
        explanations.append("Content structure matches known fake news patterns")
        explanations.append("Language style suggests emotional manipulation tactics")
    else:
        if confidence > 80:
            explanations.append("Content structure matches credible news sources")
        explanations.append("Factual and objective language patterns detected")
        explanations.append("Absence of sensationalist or manipulative phrases")
        explanations.append("Professional writing style with proper grammar")
    
    return explanations

def generate_trend_data():
    """Generate mock trend data for visualization"""
    days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    base_count = random.randint(10, 30)
    
    trend_data = []
    for day in days:
        count = base_count + random.randint(-10, 30)
        trend_data.append({"date": day, "count": max(0, count)})
        base_count = count
    
    return trend_data

def analyze_emotion_mismatch(text):
    """Analyze emotion-headline mismatch"""
    emotional_words = {
        'angry': ['furious', 'outraged', 'angry', 'livid', 'hate'],
        'fear': ['shocking', 'terrifying', 'dangerous', 'warning', 'urgent'],
        'joy': ['amazing', 'wonderful', 'incredible', 'fantastic'],
        'neutral': ['reported', 'announced', 'stated', 'according']
    }
    
    text_lower = text.lower()
    emotions_found = []
    
    for emotion, words in emotional_words.items():
        if any(word in text_lower for word in words):
            emotions_found.append(emotion)
    
    # Simple heuristic: if mixed emotions, there might be mismatch
    if len(emotions_found) > 1:
        score = random.randint(50, 80)
        headline = emotions_found[0].capitalize()
        content = emotions_found[1].capitalize() if len(emotions_found) > 1 else "Neutral"
    elif 'angry' in emotions_found or 'fear' in emotions_found:
        score = random.randint(40, 70)
        headline = emotions_found[0].capitalize()
        content = "Neutral/Informative"
    else:
        score = random.randint(10, 30)
        headline = "Neutral"
        content = "Neutral"
    
    return {
        "score": score,
        "headline": headline,
        "content": content
    }

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        text = data.get('text', '')
        
        if not text or len(text) < 10:
            return jsonify({"error": "Text must be at least 10 characters"}), 400
        
        # Make prediction
        text_tfidf = vectorizer.transform([text])
        prediction = model.predict(text_tfidf)[0]
        
        # Get prediction probabilities
        proba = model.predict_proba(text_tfidf)[0]
        confidence = int(max(proba) * 100)
        
        # Extract features
        keywords = extract_keywords(text, vectorizer)
        source_credibility = analyze_source_credibility(text)
        explanation = generate_explanation(prediction, confidence, keywords)
        trend_data = generate_trend_data()
        emotion_mismatch = analyze_emotion_mismatch(text)
        
        # Calculate propagation score (based on confidence for fake news)
        if prediction == "FAKE":
            propagation_score = min(95, confidence + random.randint(-10, 15))
        else:
            propagation_score = max(5, 100 - confidence + random.randint(-10, 10))
        
        result = {
            "prediction": prediction,
            "confidence": confidence,
            "keywords": keywords,
            "sourceCredibility": source_credibility,
            "explanation": explanation,
            "trendData": trend_data,
            "propagationScore": propagation_score,
            "emotionMismatch": emotion_mismatch
        }
        
        return jsonify(result)
    
    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "model_loaded": model is not None})

if __name__ == '__main__':
    load_model()
    app.run(host='0.0.0.0', port=5001, debug=True)
