import { useState } from "react";
import { Brain, Database, Info, LineChart } from "lucide-react";
import ShelterDatasetDialog from "./shelter_dataset_dialog";
import ShelterAboutDatasetDialog from "./shelter_about_dialog";
import ShelterAboutDatasetPredictionDialog from "./shelter_prediction_dialog";
import ShelterModelPredictionDialog from "./shelter_about_dataset_prediction_dialog";

export default function ShelterTools() {
    /*
    =====================================================
        DIALOG STATES
    =====================================================
    */
    const [datasetOpen, setDatasetOpen] = useState(false);
    const [modelOpen, setModelOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);
    const [predictionOpen, setPredictionOpen] = useState(false);
    /*
    =====================================================
        UI
    =====================================================
    */
    return (
        <>

            {/* =====================================================
                    TOOL MENU
            ===================================================== */}
            <div
                className="
                    relative
                    w-20
                    m-4
                    p-1
                    rounded-2xl
                    backdrop-blur-xl
                    bg-white/20
                    shadow-2xl
                    flex
                    flex-col
                    items-center
                    justify-around
                    border
                    border-white/30
                "
            >

                {/* TITLE */}
                <h1 className="flex w-full text-2xl justify-center font-bold text-black mb-4 p-4 border-b-2 border-black">
                    🐶
                </h1>
                

                {/* DATASET BUTTON */}
                <button
                    onClick={() => setAboutOpen(true)}
                    className="
                        w-12
                        h-12
                        rounded-xl
                        text-blue-600
                        hover:bg-blue-600
                        hover:text-white
                        transition-all
                        flex
                        items-center
                        justify-center
                        shadow-md
                        m-2
                    "
                >
                    <Info className="w-10 h-10 m-2" />
                </button>

                {/* MODEL BUTTON */}
                <button
                    onClick={() => setModelOpen(true)}
                    className="
                        w-12
                        h-12
                        rounded-xl
                        text-blue-600
                        hover:bg-blue-600
                        hover:text-white
                        transition-all
                        flex
                        items-center
                        justify-center
                        shadow-md
                        m-2
                    "
                >
                    <Brain className="w-10 h-10 m-2" />
                </button>
                {/* DATASET BUTTON */}
                <button
                    onClick={() => setDatasetOpen(true)}
                    className="
                        w-12
                        h-12
                        rounded-xl
                        text-blue-600
                        hover:bg-blue-600
                        hover:text-white
                        transition-all
                        flex
                        items-center
                        justify-center
                        shadow-md
                        m-2
                    "
                >
                    <Database className="w-10 h-10 m-2" />
                </button>

                <button
                    onClick={() => setPredictionOpen(true)}
                    className="
                        w-12
                        h-12
                        rounded-xl
                        text-blue-600
                        hover:bg-blue-600
                        hover:text-white
                        transition-all
                        flex
                        items-center
                        justify-center
                        shadow-md
                        m-2
                    "
                >
                    <LineChart className="w-10 h-10 m-2" />
                </button>

            </div>


            {/* =====================================================
                    DIALOGS
            ===================================================== */}
            <ShelterDatasetDialog
                open={datasetOpen}
                onClose={() => setDatasetOpen(false)}
            />
            <ShelterModelPredictionDialog
                open={modelOpen}
                onClose={() => setModelOpen(false)}
            />
            
            <ShelterAboutDatasetDialog
                open={aboutOpen}
                onClose={() => setAboutOpen(false)}
            />

            <ShelterAboutDatasetPredictionDialog
                open={predictionOpen}
                onClose={() => setPredictionOpen(false)}
            />
        </>
    );
}