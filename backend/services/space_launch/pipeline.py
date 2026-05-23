import pandas as pd
import requests
import time

def load_dataset(max_records=200):
    BASE_URL = "https://ll.thespacedevs.com/2.3.0/launches/"
    params = {'format': 'json', 'limit': 100, 'offset': 0, 'ordering': 'net'}

    all_launches = []

    while params["offset"] < max_records:
        r = requests.get(BASE_URL, params=params, timeout=15)
        if r.status_code != 200:
            break

        data = r.json()
        all_launches.extend(data.get("results", []))

        if not data.get("next"):
            break

        params["offset"] += params["limit"]
        time.sleep(0.5)

    registros = []

    for launch in all_launches:
        fecha = launch.get("net")
        anio, mes = None, None

        if fecha:
            dt = pd.to_datetime(fecha, utc=True)
            anio, mes = dt.year, dt.month

        registros.append({
            "agencia_tipo": launch.get("launch_service_provider", {}).get("type"),
            "agencia_nombre": launch.get("launch_service_provider", {}).get("name"),
            "cohete_nombre": launch.get("rocket", {}).get("configuration", {}).get("name"),
            "cohete_familia": launch.get("rocket", {}).get("configuration", {}).get("family"),
            "orbita_abrev": launch.get("mission", {}).get("orbit", {}).get("abbrev") if launch.get("mission") else None,
            "pad_pais": launch.get("pad", {}).get("location", {}).get("country_code"),
            "pad_latitud": launch.get("pad", {}).get("latitude"),
            "pad_longitud": launch.get("pad", {}).get("longitude"),
            "anio": anio,
            "mes": mes,
            "estado_abrev": launch.get("status", {}).get("abbrev")
        })

    return pd.DataFrame(registros)