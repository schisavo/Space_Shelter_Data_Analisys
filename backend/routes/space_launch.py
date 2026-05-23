from fastapi import APIRouter
from services.space_launch.clean import clean_dataset
from services.space_launch.pipeline import load_dataset
from services.space_launch.predict import predict_launch
from services.space_launch.train import train_model
from services.space_launch.store import DATA_SPACE
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


@router.get("/model/train")
def train():
    df = DATA_SPACE.get("clean")
    return train_model(df)


@router.post("/model/predict")
def predict(data: dict):
    return predict_launch(data)

# http://127.0.0.1:8000/space/model/predict
"""
{
  "agencia_tipo": "Government",
  "agencia_nombre": "NASA",
  "cohete_nombre": "Falcon 9",
  "cohete_familia": "Falcon",
  "mision_tipo": "Orbital",
  "orbita_abrev": "LEO",
  "pad_pais": "US",
  "anio": 2020,
  "mes": 5,
  "pad_latitud": 28.5,
  "pad_longitud": -80.6
}
"""