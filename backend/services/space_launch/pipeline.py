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
        fecha_raw = launch.get('net', None)
        anio, mes = None, None

        if fecha_raw:
            fecha = pd.to_datetime(fecha_raw, utc=True)
            anio = fecha.year
            mes  = fecha.month

        registros.append({
            'id':             launch.get('id', None),
            'nombre':         launch.get('name', None),
            'estado_nombre':  launch.get('status', {}).get('name', None),
            'estado_abrev':   launch.get('status', {}).get('abbrev', None),
            'cohete_nombre':  launch.get('rocket', {}).get('configuration', {}).get('name', None) if launch.get('rocket') else None,
            'cohete_familia': launch.get('rocket', {}).get('configuration', {}).get('family', None) if launch.get('rocket') else None,
            'agencia_nombre': launch.get('launch_service_provider', {}).get('name', None),
            'agencia_tipo':   launch.get('launch_service_provider', {}).get('type', None),
            'orbita_abrev':   launch.get('mission', {}).get('orbit', {}).get('abbrev', None)
                if launch.get('mission') and launch['mission'].get('orbit') else None,
            'mision_tipo':    launch.get('mission', {}).get('type', None) if launch.get('mission') else None,
            'pad_pais':       launch.get('pad', {}).get('location', {}).get('country_code', None)
                if launch.get('pad') and launch['pad'].get('location') else None,
            'pad_latitud':    float(launch['pad']['latitude']) if launch.get('pad') and launch['pad'].get('latitude') else None,
            'pad_longitud':   float(launch['pad']['longitude']) if launch.get('pad') and launch['pad'].get('longitude') else None,
            'anio':           anio,
            'mes':            mes,
            'estado_abrev':   launch.get('status', {}).get('abbrev', None)
        })

    df_raw = pd.DataFrame(registros)

    return df_raw