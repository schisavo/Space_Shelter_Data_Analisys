import { animalApi } from "../api/shelter";
import { spaceApi } from "../api/space";

let initialized = false;
/*
=====================================================
    INITIALIZE APP
=====================================================
*/
export async function initializeApp() {
    if (initialized) {
        console.log("⚡ App already initialized");
        return;
    }
    try {
        console.log("🚀 Initializing app...");
        /*
        =====================================================
            RUN PIPELINES IN PARALLEL
        =====================================================
        */
        await Promise.all([
            animalApi.initialize(),
            spaceApi.initialize()
        ]);
        initialized = true;
        console.log("✅ App initialized successfully");
    } catch (err) {
        console.error("❌ Initialization failed:", err);
    }
}