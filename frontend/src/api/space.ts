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

    train: () =>
        fetch(`${BASE}/model/train`).then(r => r.json()),

    /*
    =====================================================
        FULL PIPELINE
    =====================================================
    */
    initialize: async () => {

        console.log("🐾 Cleaning animal dataset...");
        await spaceApi.clean();

        console.log("🐾 Training animal model...");
        await spaceApi.train();

        console.log("✅ Animal pipeline ready");
    },
    /*
    =====================================================
        PREDICT
    =====================================================
    */
    predict: (data: any) =>
        fetch(`${BASE}/model/predict`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).then(r => r.json()),
};