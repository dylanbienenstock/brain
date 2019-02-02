import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router";
import { Globals } from "./app.globals";

@Injectable()
export class forwarderGuard implements CanActivate {

    constructor(private globals: Globals,
                private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot) {
        this.globals.passcode = "";
        this.router.navigate([""]);

        return false;
    }
}