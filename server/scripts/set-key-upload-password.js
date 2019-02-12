const upash = require("upash");
const argon2 = require("@phc/argon2");

const _Keyv = require("keyv");
const keyv = new _Keyv("mongodb://localhost:27017/dylans-brain-keyv");

upash.install("argon2", argon2);
keyv.on("error", err => console.log("[Keyv]", err));

(async () => {
    const password = process.argv[2];
    const hash = await upash.hash(password);
    
    await keyv.set("key-upload-password", hash);

    console.log("Password set.")
    console.log();

    process.exit();
})();