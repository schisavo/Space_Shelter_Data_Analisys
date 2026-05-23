from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from services.space_launch.store import MODEL, ENCODERS, FEATURES


def create_mapping(series):
    return {val: idx for idx, val in enumerate(series.unique())}

def train_model(df):

    features = [
        "agencia_tipo",
        "agencia_nombre",
        "cohete_nombre",
        "cohete_familia",
        "orbita_abrev",
        "pad_pais",
        "anio",
        "mes",
        "pad_latitud",
        "pad_longitud"
    ]

    categorical = [
        "agencia_tipo",
        "agencia_nombre",
        "cohete_nombre",
        "cohete_familia",
        "orbita_abrev",
        "pad_pais"
    ]

    encoders = {}

    df = df.copy()

    # limpieza básica (IMPORTANTE)
    df = df.dropna()

    for col in categorical:
        df[col] = df[col].astype(str)

        mapping = {val: idx for idx, val in enumerate(df[col].unique())}
        encoders[col] = mapping

        df[col] = df[col].map(mapping)

    X = df[features]
    y = df["exito"]

    model = RandomForestClassifier(n_estimators=200, random_state=42)
    model.fit(X, y)

    MODEL["rf"] = model
    ENCODERS.clear()
    ENCODERS.update(encoders)

    FEATURES.clear()
    FEATURES.extend(features)

    return {
        "accuracy": model.score(X, y),
        "features": features
    }