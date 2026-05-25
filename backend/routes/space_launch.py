from fastapi import APIRouter
from services.space_launch.clean import clean_dataset
from services.space_launch.pipeline import load_dataset
from services.space_launch.predict import predict_launch
from services.space_launch.train import train_model
from services.store import DATA_SPACE, MODEL_SPACE
from fastapi import APIRouter, HTTPException
from schemas.space.train_schema import TrainConfig
import numpy as np


router = APIRouter()

def safe_json(df):
    return df.replace({np.nan: None}).to_dict(orient="records")


@router.get("/dataset/info")
def info():
    df = DATA_SPACE.get("raw")
    return {
        "shape": df.shape,
        "columns": list(df.columns),
        "sample": safe_json(df.head(3))
    }


@router.get("/dataset/clean")
def clean():
    df = DATA_SPACE.get("raw")
    df_clean = clean_dataset(df)
    DATA_SPACE["clean"] = df_clean
    return {"rows": len(df_clean)}

# =====================================================
# MODEL
# =====================================================

@router.post("/model/train")
def train(config: TrainConfig):
    df = DATA_SPACE.get("clean")

    if df is None:
        raise HTTPException(
            status_code=400,
            detail="Dataset not loaded"
        )

    return train_model(
        df,
        n_estimators=config.n_estimators,
        max_depth=config.max_depth,
        test_size=config.test_size,
        random_state=config.random_state
    )

@router.get("/model/info")
def model_info():
    if "info" not in MODEL_SPACE:
        raise HTTPException(
            status_code=400,
            detail="Model not trained"
        )
    return MODEL_SPACE["info"]

@router.post("/model/predict")
def predict(data: dict):
    if "rf" not in MODEL_SPACE:
        raise HTTPException(
            status_code=400,
            detail="Model not trained"
        )
    return predict_launch(data)