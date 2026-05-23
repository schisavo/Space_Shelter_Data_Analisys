import pandas as pd

POSITIVOS = ["Adoption", "Return to Owner", "Rto-Adopt"]

def load_and_prepare(df: pd.DataFrame):

    df = df.copy()

    # target
    df = df.dropna(subset=["outcome_type"])
    df["target"] = df["outcome_type"].apply(
        lambda x: 1 if x in POSITIVOS else 0
    )

    features = [
        "age_upon_outcome",
        "animal_type",
        "sex_upon_outcome",
        "breed",
        "color"
    ]

    df = df.dropna(subset=features)

    # edad en meses
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

    df["edad_meses"] = df["age_upon_outcome"].apply(convertir_edad)

    # simplificación
    df["breed"] = df["breed"].apply(lambda x: x.split("/")[0])
    df["color"] = df["color"].apply(lambda x: x.split("/")[0])

    # sexo procesado
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

        return pd.Series([sexo, estado])

    df[["sexo", "estado"]] = df["sex_upon_outcome"].apply(procesar_sexo)

    # one-hot encoding (como tu Colab)
    df = pd.get_dummies(
        df,
        columns=["animal_type", "sexo", "estado", "breed", "color"],
        drop_first=True
    )

    X = df.drop(columns=[
        "target",
        "outcome_type",
        "age_upon_outcome",
        "sex_upon_outcome",
        "animal_id",
        "date_of_birth",
        "datetime",
        "monthyear",
        "name",
        "outcome_subtype"
    ], errors="ignore")

    y = df["target"]

    return X, y