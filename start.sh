#!/bin/bash

# Initialize Python backend (create dataset and train model)
echo "Initializing Python backend..."
python python_backend/init.py

# Start Flask backend in background
echo "Starting Flask backend on port 5001..."
python python_backend/app.py &
FLASK_PID=$!

# Wait for Flask to start
sleep 3

# Start Express/Vite server
echo "Starting Express/Vite server on port 5000..."
npm run dev &
EXPRESS_PID=$!

# Function to cleanup on exit
cleanup() {
    echo "Shutting down servers..."
    kill $FLASK_PID 2>/dev/null
    kill $EXPRESS_PID 2>/dev/null
    exit
}

trap cleanup SIGINT SIGTERM

# Wait for both processes
wait
