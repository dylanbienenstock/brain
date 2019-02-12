const _Keyv = require("keyv");
const keyv = new _Keyv("mongodb://localhost:27017/dylans-brain-keyv");

keyv.on("error", err => console.log("[Keyv]", err));

(async () => {
    await keyv.set("keys", null);

    console.log("Cleared all keys.")

    process.exit();
})();