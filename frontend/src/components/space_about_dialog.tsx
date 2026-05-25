import heroSpaceImg from "../assets/heroSpaceImg.webp"
interface Props {
    open: boolean;
    onClose: () => void;
}

export default function SpaceAboutDatasetDialog({
    open,
    onClose
}: Props) {

    if (!open) return null;

    return (

        <div
            onClick={onClose} 
            className="
            fixed inset-0 bg-black/50 backdrop-blur-sm
            flex items-center justify-center z-50
        ">

            {/* MAIN CARD */}
            <div
                onClick={(e) => e.stopPropagation()} 
                className="
                w-250 max-h-[90vh] overflow-y-auto
                bg-white rounded-3xl shadow-2xl relative
            ">

                {/* HERO */}
                <div
                    className="
                        h-70 bg-cover bg-center relative
                    "
                    style={{
                        backgroundImage: `url(${heroSpaceImg})`
                    }}
                >

                    <div className="absolute inset-0 bg-black/50" />

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

                    <div className="absolute bottom-8 left-8 text-white z-10">

                        <h1 className="text-5xl font-bold mb-3">
                            🚀 Space Launch Dataset
                        </h1>

                        <p className="text-lg text-gray-200 max-w-2xl">
                            Dataset de lanzamientos espaciales históricos
                            utilizado para análisis predictivo de éxito o fallo
                            de misiones espaciales.
                        </p>

                    </div>
                </div>

                {/* CONTENT */}
                <div className="p-10 space-y-10">

                    {/* OVERVIEW */}
                    <section>

                        <h2 className="text-3xl font-bold mb-4">
                            📚 Dataset Overview
                        </h2>

                        <p className="text-gray-600 leading-relaxed text-lg">
                            Este dataset contiene información histórica de lanzamientos espaciales
                            provenientes de agencias como NASA, Roscosmos, SpaceX y otras organizaciones
                            internacionales.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mt-6">

                            <div className="bg-gray-100 p-5 rounded-2xl">
                                🚀 Nombre del cohete
                            </div>

                            <div className="bg-gray-100 p-5 rounded-2xl">
                                🏢 Agencia espacial
                            </div>

                            <div className="bg-gray-100 p-5 rounded-2xl">
                                🌍 Sitio de lanzamiento
                            </div>

                            <div className="bg-gray-100 p-5 rounded-2xl">
                                🎯 Órbita objetivo
                            </div>

                        </div>

                    </section>

                    {/* MACHINE LEARNING */}
                    <section>

                        <h2 className="text-3xl font-bold mb-4">
                            🤖 Machine Learning Goal
                        </h2>

                        <div className="bg-purple-100 rounded-3xl p-6">

                            <p className="text-lg text-purple-900 leading-relaxed">
                                El objetivo del modelo es predecir si un lanzamiento espacial
                                será exitoso o fallido basado en sus características.
                            </p>

                            <div className="flex gap-4 mt-5">

                                <div className="bg-green-500 text-white px-5 py-3 rounded-xl font-bold">
                                    ✅ Success
                                </div>

                                <div className="bg-red-500 text-white px-5 py-3 rounded-xl font-bold">
                                    ❌ Failure
                                </div>

                            </div>

                        </div>

                    </section>

                    {/* FEATURES */}
                    <section>

                        <h2 className="text-3xl font-bold mb-5">
                            🧠 Features Used
                        </h2>

                        <div className="grid grid-cols-3 gap-4">

                            {[
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
                            ].map((feature) => (

                                <div
                                    key={feature}
                                    className="
                                        bg-blue-50 border border-blue-200
                                        p-4 rounded-2xl text-center
                                        font-semibold text-blue-800
                                    "
                                >
                                    {feature}
                                </div>

                            ))}

                        </div>

                    </section>

                    {/* PIPELINE */}
                    <section>

                        <h2 className="text-3xl font-bold mb-5">
                            ⚙️ Training Pipeline
                        </h2>

                        <div className="space-y-4">

                            {[
                                "Data Cleaning",
                                "Missing Value Handling",
                                "Categorical Encoding",
                                "Feature Engineering",
                                "Train/Test Split",
                                "Random Forest Training",
                                "Evaluation Metrics"
                            ].map((step, index) => (

                                <div
                                    key={step}
                                    className="
                                        flex items-center gap-4
                                        bg-gray-100 rounded-2xl p-5
                                    "
                                >

                                    <div className="
                                        w-10 h-10 rounded-full
                                        bg-purple-600 text-white
                                        flex items-center justify-center font-bold
                                    ">
                                        {index + 1}
                                    </div>

                                    <h3 className="text-lg font-semibold">
                                        {step}
                                    </h3>

                                </div>

                            ))}

                        </div>

                    </section>

                    {/* FOOTER */}
                    <section
                        className="
                            bg-linear-to-r from-purple-600 to-blue-600
                            rounded-3xl p-8 text-white
                        "
                    >

                        <h2 className="text-3xl font-bold mb-4">
                            📈 Dataset Purpose
                        </h2>

                        <p className="text-lg leading-relaxed text-white/90">
                            Este proyecto utiliza Machine Learning para analizar patrones
                            en lanzamientos espaciales y predecir su probabilidad de éxito,
                            integrando FastAPI, React y Scikit-Learn en un pipeline completo.
                        </p>

                    </section>

                </div>

            </div>

        </div>
    );
}