import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StringUtilService {

    constructor() { }

    makeUnique(name: string, otherNames: string[]) {
        let suffix = "";

        let _makeUnique = (otherNames) => {
            for (let otherName of otherNames) {
                if (otherName.startsWith(name)) {
                    if (!suffix) suffix = " (2)";
    
                    if (otherName.endsWith(suffix)) {
                        let num = suffix.substr(2, suffix.length - 1);
                        suffix = ` (${ parseInt(num) + 1 })`;
                    }
                }
            }
        }

        _makeUnique(otherNames);
        _makeUnique(otherNames.reverse());

        return name + suffix;
    }
}
