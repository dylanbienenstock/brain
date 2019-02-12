import { EventEmitter } from "@angular/core";

let _window = window as any;

const copyToClipboard = (str) => {
    const el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
};

const prefix = (name: string) => {
    return "key-" + name;
}

const log = (str: string) => {
    console.log(str);
}

_window.deleteKey = (name: string) => {
    if (!localStorage.getItem(prefix(name))) {
        log("Key does not exist.");
        return;
    }

    localStorage.removeItem(prefix(name));
    log(`Key "${name}" deleted from localStorage`);
}

_window.clearAllKeys = () => {
    localStorage.clear();
    log("Cleared all keys.");
}

_window.useKey = (name: string) => {
    if (!localStorage.getItem(prefix(name))) {
        log("Key does not exist.");
        return;
    }

    localStorage.setItem("use-key", prefix(name));
    log(`Using key ${name}. Refresh the page.`);
}

_window.genKey = (name: string) => {
    if (localStorage.getItem(prefix(name))) {
        log("That key already exists.");
        return;
    }

    if (!name || name.length <= 8) {
        log("You must specify a key name >= 8 characters.");
        return;
    }

    let keyByteCount = 2048 / 8;
    let keyArr = new Uint8Array(keyByteCount);
    let key = "";

    window.crypto.getRandomValues(keyArr);

    for (let i = 0; i < keyByteCount; i++) {
        key += keyArr[i].toString(16);
    }

    localStorage.setItem(prefix(name), key);
    copyToClipboard(key);

    log(`Key "${name}" saved to localStorage and clipboard.`);
}