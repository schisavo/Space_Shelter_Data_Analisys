const BASE = "http://127.0.0.1:8000/animal";

export const animalApi = {

    /*
    =====================================================
        DATASET
    =====================================================
    */
    info: () =>
        fetch(`${BASE}/dataset/info`).then(r => r.json()),

    clean: () =>
        fetch(`${BASE}/dataset/clean`).then(r => r.json()),

    train: () =>
        fetch(`${BASE}/model/train`).then(r => r.json()),

    /*
    =====================================================
        FULL PIPELINE
    =====================================================
    */
    initialize: async () => {

        console.log("🐾 Cleaning animal dataset...");
        await animalApi.clean();

        console.log("🐾 Training animal model...");
        await animalApi.train();

        console.log("✅ Animal pipeline ready");
    },

    /*
    =====================================================
        PREDICT
    =====================================================
    */
    predict: async (data: any) => {

        const res = await fetch(`${BASE}/model/predict`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).then(r => r.json());

        return {
            raw: res,
            prediction: res.prediction,
            probability: res.probability,

            label: res.prediction === 1
                ? "🐾 Adoptado / éxito probable"
                : "❌ No adoptado / riesgo",

            confidence: `${Math.round(res.probability * 100)}`,
        };
    },
};