import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class Globals {
    public passcode: string = "";
    public key: string = "";
    public keyName: string = "";
}