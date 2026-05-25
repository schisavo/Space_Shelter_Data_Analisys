import { useState } from "react";
import { spaceApi } from "../api/space";

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function SpaceModelTrainingDialog({
    open,
    onClose
}: Props) {

    const [training, setTraining] = useState(false);
    const [response, setResponse] = useState<any>(null);

    const [params, setParams] = useState({
        n_estimators: 300,
        max_depth: 15,
        test_size: 0.3,
        random_state: 42,
        class_weight: "balanced"
    });

    if (!open) return null;

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
            {/* CARD */}
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-275 max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl relative"
            >

                {/* CLOSE */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold z-20"
                >
                    ✕
                </button>

                {/* HEADER */}
                <div className="p-10 border-b">

                    <h1 className="text-4xl font-bold mb-2">
                        🚀 Space Launch Model Training Center
                    </h1>

                    <p className="text-gray-600">
                        Entrenamiento del modelo de predicción de éxito de lanzamientos espaciales
                    </p>

                </div>

                {/* CONTENT */}
                <div className="p-10 space-y-10">

                    {/* =====================================================
                        PARAMETERS
                    ===================================================== */}
                    <section>

                        <h2 className="text-2xl font-bold mb-5">
                            ⚙️ Parámetros del modelo
                        </h2>

                        <div className="grid grid-cols-2 gap-5">

                            {Object.entries(params).map(([key, value]) => (
                                <div key={key}>
                                    <label className="font-semibold text-sm">
                                        {key}
                                    </label>

                                    <input
                                        type={typeof value === "number" ? "number" : "text"}
                                        value={value as any}
                                        onChange={(e) =>
                                            setParams({
                                                ...params,
                                                [key]:
                                                    typeof value === "number"
                                                        ? Number(e.target.value)
                                                        : e.target.value
                                            })
                                        }
                                        className="w-full mt-2 border rounded-xl p-3"
                                    />
                                </div>
                            ))}

                        </div>

                        {/* TRAIN BUTTON */}
                        <button
                            onClick={async () => {
                                setTraining(true);

                                try {
                                    const res = await spaceApi.train(params as any);
                                    setResponse(res);
                                } catch (err) {
                                    console.error(err);
                                } finally {
                                    setTraining(false);
                                }
                            }}
                            className="mt-6 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold"
                        >
                            🚀 Reentrenar modelo SPACE
                        </button>

                    </section>

                    {/* =====================================================
                        EXAMPLES
                    ===================================================== */}
                    <section>

                        <h2 className="text-2xl font-bold mb-5">
                            🧪 Ejemplos de entrenamiento
                        </h2>

                        <div className="grid grid-cols-2 gap-6">

                            {/* GOOD */}
                            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">

                                <h3 className="font-bold text-green-700 mb-4">
                                    ✅ Configuración buena
                                </h3>

                                <pre className="text-xs bg-white p-4 rounded-xl overflow-auto">
{`{
  "n_estimators": 300,
  "max_depth": 15,
  "test_size": 0.3,
  "random_state": 42,
  "class_weight": "balanced"
}`}
                                </pre>

                                <p className="mt-4 text-green-700 font-semibold">
                                    ✔ Modelo estable para predicción de éxito orbital
                                </p>

                            </div>

                            {/* BAD */}
                            <div className="bg-red-50 border border-red-200 rounded-2xl p-5">

                                <h3 className="font-bold text-red-700 mb-4">
                                    ❌ Configuración mala
                                </h3>

                                <pre className="text-xs bg-white p-4 rounded-xl overflow-auto">
{`{
  "n_estimators": 1,
  "max_depth": 1,
  "test_size": 0.9,
  "random_state": 0,
  "class_weight": null
}`}
                                </pre>

                                <p className="mt-4 text-red-700 font-semibold">
                                    ❌ Modelo inestable y sin capacidad de generalización
                                </p>

                            </div>

                        </div>

                    </section>

                    {/* =====================================================
                        LOADING
                    ===================================================== */}
                    {training && (
                        <section className="text-center py-10">
                            <h2 className="text-3xl font-bold animate-pulse">
                                🚀 Entrenando modelo espacial...
                            </h2>
                        </section>
                    )}

                    {/* =====================================================
                        RESPONSE
                    ===================================================== */}
                    {!training && response && (
                        <section className="space-y-8">

                            {/* ACCURACY */}
                            <div className="bg-linear-to-r from-purple-600 to-blue-600 text-white p-8 rounded-3xl">

                                <h2 className="text-3xl font-bold mb-3">
                                    🎯 Accuracy
                                </h2>

                                <p className="text-6xl font-black">
                                    {(response.accuracy * 100).toFixed(2)}%
                                </p>

                            </div>

                            {/* PARAMETERS */}
                            <div>

                                <h2 className="text-2xl font-bold mb-5">
                                    ⚙️ Parámetros utilizados
                                </h2>

                                <div className="grid grid-cols-2 gap-4">

                                    {Object.entries(response.parameters || {}).map(([key, value]) => (
                                        <div key={key} className="bg-gray-100 rounded-2xl p-4">
                                            <p className="text-sm text-gray-500">{key}</p>
                                            <h3 className="font-bold text-xl">{String(value)}</h3>
                                        </div>
                                    ))}

                                </div>

                            </div>

                            {/* CONFUSION MATRIX */}
                            <div>

                                <h2 className="text-2xl font-bold mb-5">
                                    🧠 Confusion Matrix
                                </h2>

                                <div className="grid grid-cols-2 gap-4">

                                    {response.confusion_matrix?.map((row: number[], i: number) =>
                                        row.map((value, j) => (
                                            <div
                                                key={`${i}-${j}`}
                                                className="bg-blue-100 rounded-2xl p-8 text-center"
                                            >
                                                <p className="text-sm text-gray-600">
                                                    [{i}][{j}]
                                                </p>
                                                <h2 className="text-4xl font-black text-blue-700">
                                                    {value}
                                                </h2>
                                            </div>
                                        ))
                                    )}

                                </div>

                            </div>

                            {/* FEATURES */}
                            <div>

                                <h2 className="text-2xl font-bold mb-5">
                                    📊 Features utilizadas
                                </h2>

                                <div className="flex flex-wrap gap-3">

                                    {(response.features || []).map((f: string) => (
                                        <div
                                            key={f}
                                            className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm"
                                        >
                                            {f}
                                        </div>
                                    ))}

                                </div>

                            </div>

                            {/* REPORT */}
                            <div>

                                <h2 className="text-2xl font-bold mb-5">
                                    📈 Classification Report
                                </h2>

                                <pre className="bg-black text-green-400 p-6 rounded-2xl text-xs overflow-auto">
                                    {JSON.stringify(response.report, null, 2)}
                                </pre>

                            </div>

                        </section>
                    )}

                </div>
            </div>
        </div>
    );
}