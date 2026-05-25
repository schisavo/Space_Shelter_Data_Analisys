from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from services.store import MODEL_SPACE, ENCODERS, FEATURES
from sklearn.metrics import confusion_matrix, classification_report


def create_mapping(series):
    return {val: idx for idx, val in enumerate(series.unique())}


def train_model(
    df,
    n_estimators=200,
    max_depth=None,
    test_size=0.2,
    random_state=42
):

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

    # =====================================================
    # LIMPIEZA
    # =====================================================

    df = df.dropna()

    # =====================================================
    # ENCODING
    # =====================================================

    for col in categorical:

        df[col] = df[col].astype(str)

        mapping = {
            val: idx
            for idx, val in enumerate(df[col].unique())
        }

        encoders[col] = mapping

        df[col] = df[col].map(mapping)

    # =====================================================
    # FEATURES / TARGET
    # =====================================================

    X = df[features]
    y = df["exito"]

    # =====================================================
    # TRAIN TEST SPLIT
    # =====================================================

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=test_size,
        random_state=random_state
    )

    # =====================================================
    # MODEL
    # =====================================================

    model = RandomForestClassifier(
        n_estimators=n_estimators,
        max_depth=max_depth,
        random_state=random_state
    )

    model.fit(X_train, y_train)

    # =====================================================
    # SCORE
    # =====================================================

    accuracy = model.score(X_test, y_test)

    y_pred = model.predict(X_test)

    conf_matrix = confusion_matrix(y_test, y_pred)

    report = classification_report(
        y_test,
        y_pred,
        output_dict=True
    )

    # =====================================================
    # SAVE
    # =====================================================

    MODEL_SPACE["rf"] = model

    ENCODERS.clear()
    ENCODERS.update(encoders)

    FEATURES.clear()
    FEATURES.extend(features)

    MODEL_SPACE["info"] = {
        "model": "RandomForestClassifier",
        "n_estimators": n_estimators,
        "max_depth": max_depth,
        "test_size": test_size,
        "random_state": random_state,
        "accuracy": round(accuracy, 4),
        "features": features
    }

    # =====================================================
    # RESPONSE
    # =====================================================

    return {
        "message": "Modelo entrenado correctamente",

        "accuracy": round(accuracy, 4),

        "parameters": {
            "n_estimators": n_estimators,
            "max_depth": max_depth,
            "test_size": test_size,
            "random_state": random_state
        },

        "features": features,

        # =====================================================
        # FRONTEND VISUAL DATA
        # =====================================================

        "confusion_matrix": conf_matrix.tolist(),

        "report": report,

        "class_distribution": {
            "train_size": len(X_train),
            "test_size": len(X_test),
            "total_samples": len(df)
        }
    }