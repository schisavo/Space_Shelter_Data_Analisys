const BASE = "http://127.0.0.1:8000/space";

export const spaceApi = {

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
        MODEL TRAIN (CON PARAMETROS)
    =====================================================
    */
    train: async (config?: {
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
                n_estimators: config?.n_estimators ?? 200,
                max_depth: config?.max_depth ?? 10,
                test_size: config?.test_size ?? 0.2,
                random_state: config?.random_state ?? 42,
                class_weight: config?.class_weight ?? "balanced"
            })
        });

        return res.json();
    },

    /*
    =====================================================
        MODEL INFO
    =====================================================
    */
    modelInfo: () =>
        fetch(`${BASE}/model/info`).then(r => r.json()),

    /*
    =====================================================
        FULL PIPELINE (MANUAL CONTROLLED)
    =====================================================
    */
    initialize: async () => {

        console.log("🚀 Cleaning space dataset...");
        await spaceApi.clean();

        console.log("🧠 Space model ready for training (manual trigger)");
    },

    /*
    =====================================================
        PREDICT
    =====================================================
    */
    predict: async (data: any) => {

        const res = await fetch(`${BASE}/model/predict`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });

        return res.json();
    },
};