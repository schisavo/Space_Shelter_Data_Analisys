interface Props {
    open: boolean;
    onClose: () => void;
}

export default function ShelterAboutDatasetPredictionDialog({ open, onClose }: Props) {

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            {/* CARD */}
            <div className="w-260 max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl relative">

                {/* CLOSE */}
                <button
                        onClick={onClose}
                        className="
                            absolute
                            top-4
                            right-4
                            w-10
                            h-10
                            rounded-full
                            bg-red-500
                            hover:bg-red-600
                            text-white
                            font-bold
                            z-20
                        "
                    >
                        ✕
                </button>

                {/* HEADER */}
                <div className="p-10 border-b">

                    <h1 className="text-4xl font-bold mb-2">
                        🐶 Shelter Outcome Intelligence
                    </h1>

                    <p className="text-gray-600">
                        Cómo los factores del animal afectan la probabilidad de adopción
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
                                    🐶 Caso súper adoptable
                                </h3>

                                <pre className="text-xs bg-white p-3 rounded-xl overflow-auto">
{`{
  "age_upon_outcome": "2 months",
  "animal_type": "Dog",
  "sex_upon_outcome": "Neutered Male",
  "breed": "Labrador Retriever",
  "color": "White"
}`}
                                </pre>

                                <p className="mt-3 font-bold text-green-700">
                                    🐾 Resultado: Alta probabilidad de adopción (~66%)
                                </p>
                            </div>

                            {/* CASE 2 */}
                            <div className="bg-red-50 border border-red-200 p-5 rounded-2xl">
                                <h3 className="font-bold text-red-700 mb-3">
                                    🦇 Caso extremo
                                </h3>

                                <pre className="text-xs bg-white p-3 rounded-xl overflow-auto">
{`{
  "age_upon_outcome": "10 years",
  "animal_type": "Other",
  "sex_upon_outcome": "Unknown",
  "breed": "Bat Mix",
  "color": "Brown"
}`}
                                </pre>

                                <p className="mt-3 font-bold text-red-700">
                                    ❌ Resultado: Baja probabilidad de adopción (~43%)
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
                                <b> sex_upon_outcome</b>
                            </p>
                            <div className="grid grid-cols-2 gap-3 text-sm">

                                <div className="bg-green-100 p-3 rounded-xl">
                                    🟢 Neutered Male → alta adopción
                                </div>

                                <div className="bg-green-100 p-3 rounded-xl">
                                    🟢 Spayed Female → alta adopción
                                </div>

                                <div className="bg-yellow-100 p-3 rounded-xl">
                                    🟡 Intact Male → media/baja adopción
                                </div>

                                <div className="bg-yellow-100 p-3 rounded-xl">
                                    🟡 Intact Female → media/baja adopción
                                </div>

                                <div className="bg-red-100 p-3 rounded-xl">
                                    🔴 Unknown → baja confianza
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
                                🐶 Dog + Intact Male → 50% adopción
                            </div>

                            <div className="p-4 bg-gray-100 rounded-xl">
                                🐶 Dog + Intact Female → 50% adopción
                            </div>

                            <div className="p-4 bg-gray-100 rounded-xl">
                                🐶 Dog + Neutered Male → 66% adopción
                            </div>

                            <div className="p-4 bg-gray-100 rounded-xl">
                                🐶 Dog + Spayed Female → 65% adopción
                            </div>

                            <div className="p-4 bg-gray-100 rounded-xl">
                                🐶 Dog + Unknown → 43% adopción
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
                            <li>✔ El estado del animal es el factor dominante</li>
                            <li>✔ Dog y Cat elevan la probabilidad</li>
                            <li>✔ Other reduce significativamente el score</li>
                            <li>✔ Raza y color tienen impacto bajo</li>
                            <li>✔ Edad tiene relación no lineal</li>
                        </ul>

                    </section>

                </div>

            </div>

        </div>
    );
}