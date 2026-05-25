from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.space_launch.pipeline import load_dataset
from services.store import DATA_SPACE, DATA_ANIMALS
from routes.space_launch import router as space_launch_router
from routes.animal_outcomes import router as animals_launch_router
import pandas as pd

app = FastAPI(title="Launch Library API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    print("🚀 Cargando SPACE dataset...")
    df_s = load_dataset()
    DATA_SPACE["raw"] = df_s
    print(df_s.shape)
    
    df_a = pd.read_csv('data/aac_shelter_outcomes.csv')

    DATA_ANIMALS["raw"] = df_a

app.include_router(space_launch_router, prefix="/space")

app.include_router(animals_launch_router, prefix="/animal")