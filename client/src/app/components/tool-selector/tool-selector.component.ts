import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tool-selector',
    templateUrl: './tool-selector.component.html',
    styleUrls: ['./tool-selector.component.scss']
})
export class ToolSelectorComponent {

    constructor(private router: Router) { }

    navigateTo(path: string) {
        this.router.navigateByUrl(path);
    }

}
