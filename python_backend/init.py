"""
Initialize the Python backend by creating dataset and training model
"""
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(__file__))

from dataset import create_dataset
from train_model import train_model

def initialize():
    print("=" * 60)
    print("FAKE NEWS DETECTION SYSTEM - INITIALIZATION")
    print("=" * 60)
    
    # Step 1: Create dataset
    print("\nStep 1: Creating dataset...")
    df = create_dataset()
    
    # Step 2: Train model
    print("\nStep 2: Training model...")
    model, vectorizer = train_model()
    
    print("\n" + "=" * 60)
    print("INITIALIZATION COMPLETE!")
    print("=" * 60)
    print("\nThe backend is now ready to serve predictions.")
    
if __name__ == "__main__":
    initialize()
