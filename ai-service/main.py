from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
from PIL import Image
import io
import os
# import tensorflow as tf

app = FastAPI(title="Plant Disease AI Detector API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock model configuration for development
# In production, replace with: model = tf.keras.models.load_model("path/to/model.h5")
# MOCK_MODE = True

class PredictionResponse(BaseModel):
    plant: str
    disease: str
    confidence: float
    category: str
    description: str
    treatment: list[str]
    prevention: list[str]

# Predefined mock responses based on prompt
mock_data = {
    "Tomato_Early_Blight": {
        "plant": "Tomato",
        "disease": "Early Blight",
        "category": "Fungus",
        "description": "Muncul bercak coklat melingkar pada daun.",
        "treatment": [
            "Pangkas daun terinfeksi",
            "Gunakan fungisida sesuai dosis",
            "Hindari kelembaban berlebih"
        ],
        "prevention": [
            "Rotasi tanaman",
            "Sanitasi lahan",
            "Gunakan bibit sehat"
        ]
    }
}

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Plant Disease AI API is running"}

@app.post("/api/predict", response_model=PredictionResponse)
async def predict_disease(image: UploadFile = File(...)):
    # Read image
    contents = await image.read()
    img = Image.open(io.BytesIO(contents)).convert("RGB")
    img = img.resize((224, 224))
    
    # Preprocess image
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    # In a real scenario, model.predict(img_array) would be called here.
    # For now, return mock data
    
    # Mock confidence
    confidence = 96.72
    
    data = mock_data["Tomato_Early_Blight"]
    
    return PredictionResponse(
        plant=data["plant"],
        disease=data["disease"],
        confidence=confidence,
        category=data["category"],
        description=data["description"],
        treatment=data["treatment"],
        prevention=data["prevention"]
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
