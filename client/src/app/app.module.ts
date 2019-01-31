import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ToolSelectorComponent } from './components/tool-selector/tool-selector.component';
import { AppRoutes } from './app.routes';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AuthenticatorComponent } from './components/authenticator/authenticator.component';

@NgModule({
    declarations: [
        AppComponent,
        ToolSelectorComponent,
        NavbarComponent,
        TaskListComponent,
        AuthenticatorComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(AppRoutes),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
