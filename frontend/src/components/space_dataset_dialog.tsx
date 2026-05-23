import { useEffect, useState } from "react";
import { spaceApi } from "../api/space";

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function SpaceDatasetDialog({
    open,
    onClose
}: Props) {

    const [datasetInfo, setDatasetInfo] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    /*
    =====================================================
        LOAD DATASET INFO
    =====================================================
    */
    useEffect(() => {
        if (!open) return;

        const loadDataset = async () => {
            setLoading(true);

            try {
                const res = await spaceApi.info();
                setDatasetInfo(res);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadDataset();
    }, [open]);

    /*
    =====================================================
        HIDE
    =====================================================
    */
    if (!open) return null;

    /*
    =====================================================
        UI
    =====================================================
    */
    return (
        <div className="
            fixed inset-0 bg-black/50 backdrop-blur-sm
            flex items-center justify-center z-50
        ">

            {/* CARD */}
            <div className="
                w-225 max-h-[90vh] overflow-y-auto
                bg-white rounded-3xl shadow-2xl p-8 relative
            ">

                {/* CLOSE */}
                <button
                    onClick={onClose}
                    className="
                        absolute top-4 right-4
                        w-10 h-10 rounded-full
                        bg-red-500 hover:bg-red-600
                        text-white font-bold
                    "
                >
                    ✕
                </button>

                {/* HEADER */}
                <div className="mb-8">

                    <h1 className="text-4xl font-bold mb-2">
                        🚀 Space Launch Dataset
                    </h1>

                    <p className="text-gray-500">
                        Información general de lanzamientos espaciales históricos
                    </p>

                </div>

                {/* LOADING */}
                {loading && (
                    <div className="py-20 text-center">
                        <h2 className="text-2xl font-bold animate-pulse">
                            ⏳ Loading Space Dataset...
                        </h2>
                    </div>
                )}

                {/* CONTENT */}
                {!loading && datasetInfo && (
                    <div className="space-y-8">

                        {/* STATS */}
                        <div className="grid grid-cols-2 gap-4">

                            <div className="bg-gray-100 rounded-2xl p-5">
                                <p className="text-gray-500 text-sm">Filas</p>
                                <h2 className="text-3xl font-bold">
                                    {datasetInfo.shape[0]}
                                </h2>
                            </div>

                            <div className="bg-gray-100 rounded-2xl p-5">
                                <p className="text-gray-500 text-sm">Columnas</p>
                                <h2 className="text-3xl font-bold">
                                    {datasetInfo.shape[1]}
                                </h2>
                            </div>

                        </div>

                        {/* COLUMNS */}
                        <div>

                            <h2 className="text-2xl font-bold mb-4">
                                📋 Features del modelo
                            </h2>

                            <div className="flex flex-wrap gap-3">

                                {datasetInfo.columns.map((col: string) => (
                                    <div
                                        key={col}
                                        className="
                                            px-4 py-2 rounded-full
                                            bg-blue-100 text-blue-800
                                            text-sm font-medium
                                        "
                                    >
                                        {col}
                                    </div>
                                ))}

                            </div>

                        </div>

                        {/* SAMPLE */}
                        <div>

                            <h2 className="text-2xl font-bold mb-4">
                                🧪 Sample de lanzamientos
                            </h2>

                            <div className="space-y-4">

                                {datasetInfo.sample.map((item: any, index: number) => (
                                    <div
                                        key={index}
                                        className="border rounded-2xl p-5 bg-gray-50"
                                    >

                                        <div className="grid grid-cols-2 gap-3 text-sm">

                                            {Object.entries(item).map(([key, value]) => (
                                                <div key={key} className="flex flex-col">

                                                    <span className="font-semibold text-gray-700">
                                                        {key}
                                                    </span>

                                                    <span className="text-gray-500">
                                                        {String(value)}
                                                    </span>

                                                </div>
                                            ))}

                                        </div>

                                    </div>
                                ))}

                            </div>

                        </div>

                        {/* INSIGHT FOOTER */}
                        <div className="bg-linear-to-r from-purple-600 to-blue-600 text-white p-6 rounded-3xl">

                            <h2 className="text-2xl font-bold mb-2">
                                🔬 Insight del dataset
                            </h2>

                            <ul className="text-white/90 space-y-1 text-sm">

                                <li>✔ Datos históricos de lanzamientos espaciales</li>
                                <li>✔ Variable objetivo: éxito / fallo de misión</li>
                                <li>✔ Variables más influyentes: cohete y agencia</li>
                                <li>✔ Encoding categórico aplicado para Random Forest</li>
                                <li>✔ Dataset balanceado entre éxitos y fallos históricos</li>

                            </ul>

                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}