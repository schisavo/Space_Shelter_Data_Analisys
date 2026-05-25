from fastapi import APIRouter
import pandas as pd

from services.animal_outcome.train import train_model
from services.animal_outcome.predict import predict_launch
from services.store import DATA_ANIMALS, MODEL_ANIMALS

router = APIRouter()

import numpy as np

def safe_json(df):
    return df.replace({np.nan: None}).to_dict(orient="records")

@router.get("/dataset/info")
def info():
    df = DATA_ANIMALS.get("raw")

    return {
        "shape": df.shape,
        "columns": list(df.columns),
        "sample": safe_json(df.head(3))
    }

@router.get("/dataset/clean")
def clean():
    df = DATA_ANIMALS.get("raw")
    return {"rows": len(df.dropna())}

# =====================================================
# MODEL
# =====================================================

@router.post("/model/train")
def train(data: dict):
    df = DATA_ANIMALS.get("raw")
    return train_model(
        df=df,
        n_estimators=data.get("n_estimators", 200),
        max_depth=data.get("max_depth", 10),
        test_size=data.get("test_size", 0.2),
        random_state=data.get("random_state", 42),
        class_weight=data.get("class_weight", "balanced")
    )


@router.post("/model/predict")
def predict(data: dict):
    return predict_launch(data)


@router.get("/model/info")
def model_info():

    return MODEL_ANIMALS.get("info", {
        "error": "Modelo no entrenado"
    })