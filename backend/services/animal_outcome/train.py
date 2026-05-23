from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

MODEL = {}


def train_model(df):

    from services.animal_outcome.pipeline import load_and_prepare

    # =====================================================
    # PREPARAR DATASET
    # =====================================================

    X, y = load_and_prepare(df)

    # =====================================================
    # SPLIT
    # =====================================================

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42
    )

    # =====================================================
    # MODEL
    # =====================================================

    model = RandomForestClassifier(
        n_estimators=200,
        random_state=42,
        class_weight="balanced",
        max_depth=10
    )

    model.fit(X_train, y_train)

    # =====================================================
    # PREDICT
    # =====================================================

    preds = model.predict(X_test)

    acc = accuracy_score(y_test, preds)

    report = classification_report(
        y_test,
        preds,
        output_dict=True
    )

    matrix = confusion_matrix(y_test, preds)

    # =====================================================
    # SAVE MODEL
    # =====================================================

    MODEL["rf"] = model
    MODEL["columns"] = X.columns

    # =====================================================
    # DEBUG
    # =====================================================

    print("\n==============================")
    print("TARGET DISTRIBUTION")
    print(y.value_counts(normalize=True))

    print("\n==============================")
    print("CONFUSION MATRIX")
    print(matrix)

    print("\n==============================")
    print("CLASSIFICATION REPORT")
    print(classification_report(y_test, preds))

    # =====================================================
    # RESPONSE
    # =====================================================

    return {
        "accuracy": round(acc, 4),
        "features": list(X.columns),
        "confusion_matrix": matrix.tolist(),
        "report": report
    }


def get_model():
    return MODEL