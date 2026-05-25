import pandas as pd
from services.store import MODEL_SPACE, ENCODERS, FEATURES

def predict_launch(data: dict):

    model = MODEL_SPACE.get("rf")
    if model is None:
        return {"error": "Modelo no entrenado"}

    df = pd.DataFrame([data])

    df = df.reindex(columns=FEATURES, fill_value=0)

    categorical = ENCODERS.keys()

    for col in categorical:

        mapping = ENCODERS[col]

        if col in df.columns:

            df[col] = df[col].astype(str)

            df[col] = df[col].apply(
                lambda x: mapping.get(x, -1)  # -1 para unseen values
            )

    pred = model.predict(df)[0]

    return {
        "prediction": int(pred),
        "result": "Success" if pred == 1 else "Failure"
    }