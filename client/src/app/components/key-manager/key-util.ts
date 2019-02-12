import { EventEmitter } from "@angular/core";

export module KeyUtil {
    function copyToClipboard(str) {
        const el = document.createElement("textarea");
        el.value = str;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
    };
    
    function log(str: string) {
        output.emit(str);
    }
    
    export const output = new EventEmitter<string>();

    export function prefix(name: string) {
        return "key-" + name;
    }
    
    export function removeKey(name: string) {
        if (!localStorage.getItem(prefix(name))) {
            log(`Key "${name}" does not exist.`);
            return;
        }
    
        localStorage.removeItem(prefix(name));
        localStorage.setItem("all-keys", JSON.stringify(getAllKeys().filter(k => k.name != name)));

        log(`Key "${name}" has been deleted.`);
    }
    
    export function clearAllKeys() {
        localStorage.clear();
        log("Cleared all keys.");
    }
    
    export function useKey(name: string) {
        if (!localStorage.getItem(prefix(name))) {
            log(`Key "${name}" does not exist.`);
            return;
        }
    
        localStorage.setItem("use-key", prefix(name));
        log(`Set key "${name}" as default key.`);
    }

    export function getDefaultKeyName(): string {
        return localStorage.getItem("use-key");
    }

    export function getKey(name: string) {
        return localStorage.getItem(prefix(name));
    }

    interface KeyRecord {
        name: string,
        date: Date
    }

    export function getAllKeys(): KeyRecord[] {
        let allKeysRaw = localStorage.getItem("all-keys");

        if (allKeysRaw) {
            try {
                let raw = JSON.parse(allKeysRaw);
                return raw.map(k => { return { name: k.name, date: new Date(k.date) } });

            } catch {
                return [];
            }
        }

        return [];
    }
    
    export function genKey(name: string) {
        if (localStorage.getItem(prefix(name))) {
            log(`Key "${name}" already exists.`);
            return;
        }
    
        if (!name || name.length <= 8) {
            log("Key name must be >= 8 characters");
            return;
        }

        let keyByteCount = 2048 / 8;
        let keyArr = new Uint8Array(keyByteCount);
        let key = "";
    
        window.crypto.getRandomValues(keyArr);
    
        for (let i = 0; i < keyByteCount; i++) {
            key += keyArr[i].toString(16);
        }
    
        localStorage.setItem("all-keys", JSON.stringify([...getAllKeys(), { name, date: new Date() }]));
        localStorage.setItem(prefix(name), key);
        // copyToClipboard(key);
    
        log(`Key "${name}" generated and saved.`);
    }
}