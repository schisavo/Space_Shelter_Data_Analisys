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

    /*
    =====================================================
        MODEL TRAIN
    =====================================================
    */
    train: async (params?: {
        n_estimators?: number;
        max_depth?: number;
        test_size?: number;
        random_state?: number;
        class_weight?: string;
    }) => {

        const res = await fetch(`${BASE}/model/train`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                n_estimators: params?.n_estimators ?? 200,
                max_depth: params?.max_depth ?? 10,
                test_size: params?.test_size ?? 0.2,
                random_state: params?.random_state ?? 42,
                class_weight: params?.class_weight ?? "balanced"
            })
        });

        return res.json();
    },

    /*
    =====================================================
        MODEL INFO
    =====================================================
    */
    modelInfo: async () => {
        const res = await fetch(`${BASE}/model/info`);
        return res.json();
    },

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