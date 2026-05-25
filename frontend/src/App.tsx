import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './App.css'
import SpaceForm from './components/space_form'
import AnimalForm from './components/shelter_form'
import SpaceTools from './components/space_tools'
import ShelterTools from './components/shelter_tools'
import { initializeApp } from "./services/bootstrap";

import dogImage from "./assets/dog.webp";
import launchImage from "./assets/launch.webp";

function App() {
  /*
  ========================================================
    STATES
  ========================================================
  */
  // Controla qué vista está activa
  const [isAnimalView, setIsAnimalView] = useState(false)
  // Resultado del modelo
  const [result, setResult] = useState<any>(null)
  /*
  ========================================================
    HELPERS
  ========================================================
  */

  
  useEffect(() => {
      initializeApp();
  }, []);


  // Limpia el resultado al cambiar de módulo
  const switchView = (value: boolean) => {
    setIsAnimalView(value)
    setResult(null)
  }
  /*
  ========================================================
    UI
  ========================================================
  */

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
      
      {!isAnimalView ? (
        <> 
          <SpaceTools />
        </>
      ) : (
        <> 
          <ShelterTools /> 
        </>
      )}
      {/* =====================================================
            CARD PRINCIPAL
      ====================================================== */}
      <div className="relative w-250 h-200 bg-white rounded-2xl shadow-2xl overflow-hidden flex">
        {/* =====================================================
              CONTENIDO INTERNO
        ====================================================== */}
        <div className="flex w-full h-full relative z-10">
          {/* =====================================================
                SPACE SECTION
          ====================================================== */}
          <motion.div
            animate={{
              x: isAnimalView ? '-100%' : '0%',
              opacity: isAnimalView ? 0 : 1,
            }}
            transition={{ duration: 0.6 }}
            className="w-1/2 h-full flex flex-col justify-center items-center px-14"
          >

            {/* ---------------- FORM ---------------- */}
            <div className="w-full">
              <SpaceForm onResult={setResult} />
            </div>

            {/* ---------------- RESULT ---------------- */}
            {result && !isAnimalView && (
              <div className="w-full mt-6 p-6 rounded-3xl border bg-linear-to-br from-gray-50 to-white shadow-lg">

                {/* HEADER */}
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  🚀 Space Launch Prediction
                </h2>

                {/* MAIN RESULT CARD */}
                <div className="flex flex-col gap-4">

                  {/* STATUS BADGE */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-medium">
                      Resultado del lanzamiento
                    </span>

                    <span
                      className={`
                        px-4 py-1 rounded-full text-sm font-bold
                        ${result.result === "Success"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                        }
                      `}
                    >
                      {result.result === "Success" ? "🟢 Éxito" : "🔴 Fallo"}
                    </span>
                  </div>

                  {/* PROBABILITY / RAW PREDICTION */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-medium">
                      Clase predicha
                    </span>

                    <span className="font-semibold text-gray-800">
                      {result.prediction === 1 ? "Success (1)" : "Failure (0)"}
                    </span>
                  </div>

                  {/* INSIGHT BLOCK */}
                  <div className="mt-4 p-4 rounded-2xl bg-blue-50 border border-blue-100">
                    <p className="text-sm text-blue-900 leading-relaxed">
                      {result.result === "Success"
                        ? "El modelo estima condiciones favorables basadas en patrones históricos similares de lanzamientos exitosos."
                        : "El modelo detecta similitudes con lanzamientos fallidos o de alto riesgo en el dataset histórico."
                      }
                    </p>
                  </div>

                </div>
              </div>
            )}
          </motion.div>


          {/* =====================================================
                ANIMAL SECTION
          ====================================================== */}
          <motion.div
            animate={{
              x: isAnimalView ? '0%' : '100%',
              opacity: isAnimalView ? 1 : 0,
            }}
            transition={{ duration: 0.6 }}
            className="
              w-1/2
              h-full
              flex
              flex-col
              justify-center
              items-center
              px-14
              absolute
              right-0
              top-0
            "
          >

            {/* ---------------- FORM ---------------- */}
            <div className="w-full">
              <AnimalForm onResult={setResult} />
            </div>

            {/* ---------------- RESULT ---------------- */}
            {result && isAnimalView && (
              <div className="w-full mt-6 p-5 rounded-2xl border bg-gray-50 shadow-sm">

                <h2 className="text-xl font-bold mb-4">
                  🐾 Resultado Animal
                </h2>

                <div className="space-y-3">

                  {/* LABEL */}
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">
                      Outcome:
                    </span>

                    <span
                      className={`
                        px-3 py-1 rounded-full text-white text-xs font-bold
                        ${result.prediction === 1
                          ? 'bg-green-600'
                          : 'bg-red-500'}
                      `}
                    >
                      {result.label}
                    </span>
                  </div>
                  {/* STATUS */}
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">
                      Modelo:
                    </span>
                    <span>
                      {result.status}
                    </span>
                  </div>

                  {/* CONFIDENCE */}
                  {result.confidence && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-semibold">
                          Confidence
                        </span>
                        <span>
                          {result.confidence}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* =====================================================
              PANEL LATERAL INTERCAMBIO
        ====================================================== */}
        <motion.div
          animate={{
            x: isAnimalView ? '-100%' : '0%'
          }}
          transition={{
            duration: 0.6
          }}
          className="
            absolute
            top-0
            right-0
            w-1/2
            h-full
            flex
            flex-col
            justify-center
            items-center
            text-white
            px-12
            z-20
            bg-cover
            bg-center
          "
          style={{
            backgroundImage: `url(${isAnimalView
              ? dogImage
              : launchImage
            })`,
          }}
        >

          {/* OVERLAY */}
          <div className="bg-black/50 p-8 rounded-2xl text-center backdrop-blur-sm max-w-md">

            {!isAnimalView ? (
              <>
                {/* TITLE */}
                <h1 className="text-4xl font-bold mb-4">
                  🐾 ANIMAL OUTCOMES
                </h1>

                {/* DESCRIPTION */}
                <p className="mb-6 text-gray-200">
                  Predicción de adopciones, retornos y resultados
                  de refugio animal usando Machine Learning.
                </p>

                {/* BUTTON */}
                <button
                  onClick={() => switchView(true)}
                  className="
                    border
                    px-8
                    py-3
                    rounded-full
                    hover:bg-white
                    hover:text-black
                    transition
                    font-semibold
                  "
                >
                  Ver Animals
                </button>
              </>
            ) : (
              <>
                {/* TITLE */}
                <h1 className="text-4xl font-bold mb-4">
                  🚀 SPACE LAUNCH
                </h1>

                {/* DESCRIPTION */}
                <p className="mb-6 text-gray-200">
                  Predicción de éxito en lanzamientos espaciales
                  usando datos históricos y Random Forest.
                </p>

                {/* BUTTON */}
                <button
                  onClick={() => switchView(false)}
                  className="
                    border
                    px-8
                    py-3
                    rounded-full
                    hover:bg-white
                    hover:text-black
                    transition
                    font-semibold
                  "
                >
                  Ver Space
                </button>
              </>
            )}

          </div>

        </motion.div>

      </div>

    </div>
  )
}

export default App