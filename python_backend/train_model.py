import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os

def train_model():
    """Train the fake news detection model"""
    
    # Load dataset
    df = pd.read_csv('python_backend/data/news_dataset.csv')
    
    print("Training fake news detection model...")
    print(f"Dataset size: {len(df)} samples")
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        df['text'], 
        df['label'], 
        test_size=0.2, 
        random_state=42,
        stratify=df['label']
    )
    
    # Create TF-IDF vectorizer
    vectorizer = TfidfVectorizer(
        max_features=1000,
        stop_words='english',
        ngram_range=(1, 2)
    )
    
    # Fit and transform training data
    X_train_tfidf = vectorizer.fit_transform(X_train)
    X_test_tfidf = vectorizer.transform(X_test)
    
    # Train Naive Bayes classifier
    model = MultinomialNB(alpha=0.1)
    model.fit(X_train_tfidf, y_train)
    
    # Evaluate model
    y_pred = model.predict(X_test_tfidf)
    accuracy = accuracy_score(y_test, y_pred)
    
    print(f"\nModel Training Complete!")
    print(f"Accuracy: {accuracy * 100:.2f}%")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))
    
    # Save model and vectorizer
    os.makedirs('python_backend/models', exist_ok=True)
    joblib.dump(model, 'python_backend/models/fake_news_model.pkl')
    joblib.dump(vectorizer, 'python_backend/models/tfidf_vectorizer.pkl')
    
    print("\nModel and vectorizer saved successfully!")
    
    return model, vectorizer

if __name__ == "__main__":
    train_model()
