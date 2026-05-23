from fastapi import APIRouter
import pandas as pd

from services.animal_outcome.train import train_model
from services.animal_outcome.predict import predict_launch
from services.space_launch.store import DATA_ANIMALS

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

@router.get("/model/train")
def train():
    df = DATA_ANIMALS.get("raw")
    return train_model(df)

@router.post("/model/predict")
def predict(data: dict):
    return predict_launch(data)