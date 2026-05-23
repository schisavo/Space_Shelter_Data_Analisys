import { useState } from "react";
import { spaceApi } from "../api/space";

export default function SpaceForm({ onResult }: any) {

  const [form, setForm] = useState({
    agencia_tipo: "Government",
    agencia_nombre: "Soviet Space Program",
    cohete_nombre: "Sputnik",
    cohete_familia: "Sputnik",
    orbita_abrev: "LEO",
    pad_pais: "RU",
    anio: 1957,
    mes: 10,
    pad_latitud: 45.9,
    pad_longitud: 63.3,
  });

  const options = {
    agencia_tipo: ["Government", "Commercial", "Military"],
    agencia_nombre: [
      "Soviet Space Program",
      "NASA",
      "US Navy",
      "United States Air Force",
      "Army Ballistic Missile Agency"
    ],
    cohete_nombre: [
      "Sputnik",
      "Vanguard",
      "Juno-I",
      "Thor Able I",
      "Atlas B",
      "Thor Agena A"
    ],
    cohete_familia: [
      "Sputnik",
      "Vanguard",
      "Juno",
      "Thor",
      "Atlas"
    ],
    orbita_abrev: [
      "LEO",
      "MEO",
      "GEO",
      "PO",
      "LO",
      "Sub"
    ],
    pad_pais: ["US", "RU", "FR", "CN"]
  };

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const res = await spaceApi.predict(form);
    onResult(res);
  };

  const Select = ({ label, field, values }: any) => (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <select
        value={(form as any)[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        className="p-2 rounded-lg border border-gray-300 bg-white"
      >
        {values.map((v: string) => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="w-full">

      <h1 className="text-5xl text-center font-bold mb-6">
        🚀 SPACE LAUNCH
      </h1>

      <p className="text-gray-500 text-sm text-center mb-6">
        Modelo entrenado con Space Launch Dataset histórico
      </p>

      {/* SELECTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <Select label="Tipo Agencia" field="agencia_tipo" values={options.agencia_tipo} />
        <Select label="Agencia" field="agencia_nombre" values={options.agencia_nombre} />
        <Select label="Cohete" field="cohete_nombre" values={options.cohete_nombre} />
        <Select label="Familia Cohete" field="cohete_familia" values={options.cohete_familia} />
        <Select label="Órbita" field="orbita_abrev" values={options.orbita_abrev} />
        <Select label="País Pad" field="pad_pais" values={options.pad_pais} />

        {/* NUMÉRICOS */}
        <div className="flex flex-col">
          <label>Año</label>
          <input
            type="number"
            value={form.anio}
            onChange={(e) => handleChange("anio", Number(e.target.value))}
            className="p-2 border rounded-lg"
          />
        </div>

        <div className="flex flex-col">
          <label>Mes</label>
          <input
            type="number"
            value={form.mes}
            onChange={(e) => handleChange("mes", Number(e.target.value))}
            className="p-2 border rounded-lg"
          />
        </div>

        <div className="flex flex-col">
          <label>Latitud</label>
          <input
            type="number"
            value={form.pad_latitud}
            onChange={(e) => handleChange("pad_latitud", Number(e.target.value))}
            className="p-2 border rounded-lg"
          />
        </div>

        <div className="flex flex-col">
          <label>Longitud</label>
          <input
            type="number"
            value={form.pad_longitud}
            onChange={(e) => handleChange("pad_longitud", Number(e.target.value))}
            className="p-2 border rounded-lg"
          />
        </div>

      </div>

      {/* BOTÓN */}
      <button
        onClick={handleSubmit}
        className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-semibold"
      >
        Predict
      </button>

    </div>
  );
}