import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ToolSelectorComponent } from './components/tool-selector/tool-selector.component';
import { AppRoutes } from './app.routes';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AuthenticatorComponent } from './components/authenticator/authenticator.component';
import { HttpService } from './services/http.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PasscodeInterceptor } from './services/http.interceptor';
import { Globals } from './app.globals';

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
        HttpClientModule,
        RouterModule.forRoot(AppRoutes),
    ],
    providers: [
        HttpService,
        { provide: HTTP_INTERCEPTORS, useClass: PasscodeInterceptor, multi: true },
        Globals
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
