import heroAnimalImg from "../assets/heroAnimalimg.webp"
interface Props {
    open: boolean;
    onClose: () => void;
}

export default function ShelterAboutDatasetDialog({
    open,
    onClose
}: Props) {

    if (!open) return null;

    return (

        <div
            className="
                fixed
                inset-0
                bg-black/50
                backdrop-blur-sm
                flex
                items-center
                justify-center
                z-50
            "
        >

            {/* MAIN CARD */}
            <div
                className="
                    w-250
                    max-h-[90vh]
                    overflow-y-auto
                    bg-white
                    rounded-3xl
                    shadow-2xl
                    relative
                "
            >

                {/* HERO */}
                <div
                    className="
                        h-70
                        bg-cover
                        bg-center
                        relative
                    "
                    style={{
                        backgroundImage: `url(${heroAnimalImg})`
                    }}
                >

                    <div className="absolute inset-0 bg-black/50" />

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

                    <div className="absolute bottom-8 left-8 text-white z-10">

                        <h1 className="text-5xl font-bold mb-3">
                            🐾 Austin Animal Center
                        </h1>

                        <p className="text-lg text-gray-200 max-w-2xl">
                            Shelter Outcomes Dataset utilizado para análisis
                            predictivo de adopción, retorno y riesgo animal.
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

                            Este dataset proviene del
                            Austin Animal Center y contiene
                            información histórica sobre animales
                            ingresados a refugios, incluyendo:

                        </p>

                        <div className="grid grid-cols-2 gap-4 mt-6">

                            <div className="bg-gray-100 p-5 rounded-2xl">
                                🐶 Tipo de animal
                            </div>

                            <div className="bg-gray-100 p-5 rounded-2xl">
                                🎨 Color y raza
                            </div>

                            <div className="bg-gray-100 p-5 rounded-2xl">
                                ⚧ Sexo y esterilización
                            </div>

                            <div className="bg-gray-100 p-5 rounded-2xl">
                                🏠 Resultado final
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

                                El objetivo del modelo es predecir
                                si un animal tiene probabilidad de:

                            </p>

                            <div className="flex gap-4 mt-5">

                                <div className="bg-green-500 text-white px-5 py-3 rounded-xl font-bold">
                                    ✅ Adoption-like
                                </div>

                                <div className="bg-red-500 text-white px-5 py-3 rounded-xl font-bold">
                                    ❌ Negative outcome
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
                                "age_upon_outcome",
                                "animal_type",
                                "sex_upon_outcome",
                                "breed",
                                "color"
                            ].map((feature) => (

                                <div
                                    key={feature}
                                    className="
                                        bg-blue-50
                                        border
                                        border-blue-200
                                        p-4
                                        rounded-2xl
                                        text-center
                                        font-semibold
                                        text-blue-800
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
                                "Feature Engineering",
                                "Encoding",
                                "Scaling",
                                "Train/Test Split",
                                "Random Forest Training",
                                "Prediction"
                            ].map((step, index) => (

                                <div
                                    key={step}
                                    className="
                                        flex
                                        items-center
                                        gap-4
                                        bg-gray-100
                                        rounded-2xl
                                        p-5
                                    "
                                >

                                    <div
                                        className="
                                            w-10
                                            h-10
                                            rounded-full
                                            bg-purple-600
                                            text-white
                                            flex
                                            items-center
                                            justify-center
                                            font-bold
                                        "
                                    >
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
                            bg-linear-to-r
                            from-purple-600
                            to-blue-600
                            rounded-3xl
                            p-8
                            text-white
                        "
                    >

                        <h2 className="text-3xl font-bold mb-4">
                            📈 Dataset Purpose
                        </h2>

                        <p className="text-lg leading-relaxed text-white/90">

                            Este proyecto utiliza Machine Learning
                            para explorar patrones relacionados con
                            adopciones animales y demostrar pipelines
                            completos de ciencia de datos usando FastAPI,
                            React y Scikit-Learn.

                        </p>

                    </section>

                </div>

            </div>

        </div>
    );
}