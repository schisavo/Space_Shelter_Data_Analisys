def flatten_columns(df):
    df = df.copy()

    # convertir dict → string usable
    if "agencia_tipo" in df.columns:
        df["agencia_tipo"] = df["agencia_tipo"].apply(
            lambda x: x["name"] if isinstance(x, dict) else x
        )

    return df

def normalize_nulls(df):
    df = df.copy()

    df["cohete_familia"] = df["cohete_familia"].fillna("Unknown")
    df["pad_pais"] = df["pad_pais"].fillna("Unknown")

    return df

def create_target(df):
    df = df.copy()

    df["exito"] = df["estado_abrev"].map({
        "Success": 1,
        "Go": 1,
        "Failure": 0,
        "Partial Failure": 0,
        "Lost": 0
    })

    df = df.dropna(subset=["exito"])

    return df






def clean_dataset(df):
    df = df.copy()

    df = flatten_columns(df)
    df = normalize_nulls(df)
    df = create_target(df)

    # eliminar columnas basura si existen
    df = df[df["exito"].notna()].copy()

    df = df.drop(columns=["estado_abrev"], errors="ignore")

    df = df.dropna(subset=[
        "agencia_nombre",
        "cohete_nombre",
        "anio",
        "mes"
    ])

    return df