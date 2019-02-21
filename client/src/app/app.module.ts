import "./app.auth";

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";

import { MomentModule } from 'ngx-moment';

import { AppComponent } from './app.component';
import { ToolSelectorComponent } from './components/tool-selector/tool-selector.component';
import { AppRoutes } from './app.routes';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AuthenticatorComponent } from './components/authenticator/authenticator.component';
import { HttpService } from './services/http.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainInterceptor } from './services/http.interceptor';
import { Globals } from './app.globals';
import { ScreenService } from './services/screen.service';
import { NavbarService } from './services/navbar.service';
import { StringUtilService } from './services/string-util.service';
import { DayOnlyPipe } from './pipes/day-only.pipe';
import { LeftPadPipe } from './pipes/left-pad.pipe';
import { IntakeLogComponent } from './components/intake-log/intake-log.component';
import { CalenderComponent } from './components/calender/calender.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { KeyManagerComponent } from './components/key-manager/key-manager.component';
import { PwaService } from "./services/pwa.service";
import { ConnectionService } from "ng-connection-service";
import { ResponseCacheService } from "./services/response-cache.service";
import { RequestCacheService } from "./services/request-cache.service";
import { OfflineService } from "./services/offline.service";
import { DataService } from "./services/data.service";

@NgModule({
    declarations: [
        AppComponent,
        ToolSelectorComponent,
        NavbarComponent,
        TaskListComponent,
        AuthenticatorComponent,
        DayOnlyPipe,
        LeftPadPipe,
        IntakeLogComponent,
        CalenderComponent,
        KeyManagerComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(AppRoutes),
        FormsModule,
        MomentModule,
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [
        HttpService,
        { 
            provide: HTTP_INTERCEPTORS,
            useClass: MainInterceptor,
            multi: true
        },
        Globals,
        ScreenService,
        NavbarService,
        StringUtilService,
        PwaService,
        ConnectionService,
        ResponseCacheService,
        RequestCacheService,
        OfflineService,
        DataService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
