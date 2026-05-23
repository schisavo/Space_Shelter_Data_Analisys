interface Props {
    open: boolean;
    onClose: () => void;
}

export default function SpaceAboutDatasetPredictionDialog({ open, onClose }: Props) {

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

            {/* CARD */}
            <div className="w-260 max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl relative">

                {/* CLOSE */}
                <button
                    onClick={onClose}
                    className="
                        absolute top-4 right-4
                        w-10 h-10 rounded-full
                        bg-red-500 hover:bg-red-600
                        text-white font-bold z-20
                    "
                >
                    ✕
                </button>

                {/* HEADER */}
                <div className="p-10 border-b">

                    <h1 className="text-4xl font-bold mb-2">
                        🚀 Space Launch Intelligence
                    </h1>

                    <p className="text-gray-600">
                        Cómo los factores de una misión afectan la probabilidad de éxito de un lanzamiento
                    </p>

                </div>

                {/* CONTENT */}
                <div className="p-10 space-y-10">

                    {/* =====================================================
                        CORE EXAMPLES
                    ===================================================== */}
                    <section>

                        <h2 className="text-2xl font-bold mb-5">
                            🧪 Casos de predicción
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* CASE 1 */}
                            <div className="bg-green-50 border border-green-200 p-5 rounded-2xl">

                                <h3 className="font-bold text-green-700 mb-3">
                                    🚀 Caso alto potencial de éxito
                                </h3>

                                <pre className="text-xs bg-white p-3 rounded-xl overflow-auto">
{`{
  "agencia_tipo": "Government",
  "agencia_nombre": "NASA",
  "cohete_nombre": "Falcon 9",
  "cohete_familia": "Falcon",
  "orbita_abrev": "LEO",
  "pad_pais": "US",
  "anio": 2020,
  "mes": 5,
  "pad_latitud": 28.5,
  "pad_longitud": -80.6
}`}
                                </pre>

                                <p className="mt-3 font-bold text-green-700">
                                    🟢 Resultado: Alta probabilidad de éxito (~60–70%)
                                </p>

                            </div>

                            {/* CASE 2 */}
                            <div className="bg-red-50 border border-red-200 p-5 rounded-2xl">

                                <h3 className="font-bold text-red-700 mb-3">
                                    💥 Caso histórico de fallo
                                </h3>

                                <pre className="text-xs bg-white p-3 rounded-xl overflow-auto">
{`{
  "agencia_tipo": "Government",
  "agencia_nombre": "US Navy",
  "cohete_nombre": "Vanguard",
  "cohete_familia": "Vanguard",
  "orbita_abrev": "LEO",
  "pad_pais": "US",
  "anio": 1958,
  "mes": 9,
  "pad_latitud": 28.4,
  "pad_longitud": -80.5
}`}
                                </pre>

                                <p className="mt-3 font-bold text-red-700">
                                    🔴 Resultado: Alta probabilidad de fallo (~70–90%)
                                </p>

                            </div>

                        </div>

                    </section>

                    {/* =====================================================
                        FEATURE IMPACT
                    ===================================================== */}
                    <section>

                        <h2 className="text-2xl font-bold mb-5">
                            📊 Cómo influyen las variables
                        </h2>

                        <div className="space-y-4 text-gray-700">

                            <p>
                                🧠 El factor más influyente es:
                                <b> cohete_nombre + agencia_nombre</b>
                            </p>

                            <div className="grid grid-cols-2 gap-3 text-sm">

                                <div className="bg-green-100 p-3 rounded-xl">
                                    🚀 Falcon 9 → alta tasa de éxito
                                </div>

                                <div className="bg-green-100 p-3 rounded-xl">
                                    🚀 Atlas / Soyuz → confiabilidad media-alta
                                </div>

                                <div className="bg-yellow-100 p-3 rounded-xl">
                                    ⚠️ Órbitas LEO / MEO → impacto moderado
                                </div>

                                <div className="bg-red-100 p-3 rounded-xl">
                                    💥 Cohetes antiguos (1950s) → alta tasa de fallo
                                </div>

                            </div>

                        </div>

                    </section>

                    {/* =====================================================
                        CONTROLLED TEST SCENARIOS
                    ===================================================== */}
                    <section>

                        <h2 className="text-2xl font-bold mb-5">
                            ⚗️ Escenarios controlados
                        </h2>

                        <div className="space-y-3 text-sm">

                            <div className="p-4 bg-gray-100 rounded-xl">
                                🚀 NASA + Falcon 9 → alta probabilidad de éxito (~65%)
                            </div>

                            <div className="p-4 bg-gray-100 rounded-xl">
                                🚀 US Navy + Vanguard → alta probabilidad de fallo (~80%)
                            </div>

                            <div className="p-4 bg-gray-100 rounded-xl">
                                🚀 Soviet Program + Sputnik → éxito moderado (~55–60%)
                            </div>

                            <div className="p-4 bg-gray-100 rounded-xl">
                                🚀 Government + LEO + moderno → tendencia positiva
                            </div>

                        </div>

                    </section>

                    {/* =====================================================
                        INSIGHT SECTION
                    ===================================================== */}
                    <section className="bg-linear-to-r from-purple-600 to-blue-600 text-white p-8 rounded-3xl">

                        <h2 className="text-2xl font-bold mb-4">
                            🔬 Insight clave del modelo
                        </h2>

                        <ul className="space-y-2 text-white/90">

                            <li>✔ El cohete es el factor más determinante</li>
                            <li>✔ Las agencias modernas tienen mayor tasa de éxito</li>
                            <li>✔ Misiones antiguas (1957–1965) tienen más fallos</li>
                            <li>✔ La órbita afecta pero no domina el modelo</li>
                            <li>✔ Ubicación del launch pad aporta señal secundaria</li>

                        </ul>

                    </section>

                </div>

            </div>

        </div>
    );
}