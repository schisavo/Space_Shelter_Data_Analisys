import pandas as pd
from services.animal_outcome.train import get_model


def convertir_edad(edad):
    valor = int(edad.split()[0])

    if "year" in edad:
        return valor * 12
    elif "month" in edad:
        return valor
    elif "week" in edad:
        return valor / 4
    elif "day" in edad:
        return valor / 30

    return 0


def procesar_sexo(valor):

    if "Male" in valor:
        sexo = "Male"

    elif "Female" in valor:
        sexo = "Female"

    else:
        sexo = "Unknown"

    if "Neutered" in valor or "Spayed" in valor:
        estado = "Fixed"

    elif "Intact" in valor:
        estado = "Intact"

    else:
        estado = "Unknown"

    return sexo, estado


def predict_launch(data: dict):

    model_data = get_model()

    model = model_data.get("rf")
    columns = model_data.get("columns")

    if model is None:
        return {"error": "Modelo no entrenado"}

    # =====================================================
    # INPUT DF
    # =====================================================

    df = pd.DataFrame([data])

    # =====================================================
    # MISMO PREPROCESSING DEL TRAIN
    # =====================================================

    # edad
    df["edad_meses"] = df["age_upon_outcome"].apply(convertir_edad)

    # breed simplificado
    df["breed"] = df["breed"].apply(
        lambda x: x.split('/')[0]
    )

    # color simplificado
    df["color"] = df["color"].apply(
        lambda x: x.split('/')[0]
    )

    # sexo / estado
    df[["sexo", "estado"]] = df["sex_upon_outcome"].apply(
        lambda x: pd.Series(procesar_sexo(x))
    )

    # =====================================================
    # GET DUMMIES
    # =====================================================

    df = pd.get_dummies(
        df,
        columns=[
            "animal_type",
            "sexo",
            "estado",
            "breed",
            "color"
        ]
    )

    # =====================================================
    # ALINEAR COLUMNAS
    # =====================================================

    df = df.reindex(columns=columns, fill_value=0)

    # =====================================================
    # PREDICCIÓN
    # =====================================================

    pred = model.predict(df)[0]

    prob = model.predict_proba(df)[0][1]

    return {
        "prediction": int(pred),
        "probability": round(float(prob), 3),
        "result": "Adoption-like" if pred == 1 else "No Adoption"
    }