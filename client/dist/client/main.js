(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../shared/routes.ts":
/*!***************************!*\
  !*** ../shared/routes.ts ***!
  \***************************/
/*! exports provided: Routes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Routes", function() { return Routes; });
var Routes;
(function (Routes) {
    // Authentication
    Routes["authenticate"] = "/api/authenticate";
    // Task Lists
    Routes["createTaskList"] = "/api/tasklist/create";
    Routes["getTaskLists"] = "/api/tasklist/getAll";
    Routes["updateTaskList"] = "/api/tasklist/update";
    Routes["deleteTaskList"] = "/api/tasklist/delete";
    // Tasks
    Routes["createTask"] = "/api/task/create";
    Routes["getTasks"] = "/api/task/get";
    Routes["updateTask"] = "/api/task/update";
    Routes["deleteTask"] = "/api/task/delete";
})(Routes || (Routes = {}));


/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.auth.ts":
/*!*****************************!*\
  !*** ./src/app/app.auth.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var _window = window;
var copyToClipboard = function (str) {
    var el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
};
var prefix = function (name) {
    return "key-" + name;
};
_window.deleteKey = function (name) {
    if (!localStorage.getItem(prefix(name))) {
        console.log("Key does not exist.");
        return;
    }
    localStorage.removeItem(prefix(name));
    console.log("Key \"" + name + "\" deleted from localStorage");
};
_window.clearAllKeys = function () {
    localStorage.clear();
    console.log("Cleared all keys.");
};
_window.useKey = function (name) {
    if (!localStorage.getItem(prefix(name))) {
        console.log("Key does not exist.");
        return;
    }
    localStorage.setItem("use-key", prefix(name));
    console.log("Using key " + name + ". Refresh the page.");
};
_window.genKey = function (name) {
    if (localStorage.getItem(prefix(name))) {
        console.log("That key already exists.");
        return;
    }
    if (!name || name.length <= 8) {
        console.log("You must specify a key name >= 8 characters.");
        return;
    }
    var keyByteCount = 2048 / 8;
    var keyArr = new Uint8Array(keyByteCount);
    var key = "";
    window.crypto.getRandomValues(keyArr);
    for (var i = 0; i < keyByteCount; i++) {
        key += keyArr[i].toString(16);
    }
    localStorage.setItem(prefix(name), key);
    copyToClipboard(key);
    console.log("Key \"" + name + "\" saved to localStorage and clipboard.");
};


/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-authenticator\r\n*ngIf=\"showAuthenticator\"\r\n(authenticated)=\"onAuthenticated()\">\r\n</app-authenticator>\r\n\r\n<div class=\"content\">\r\n    <app-navbar></app-navbar>\r\n    <router-outlet></router-outlet>\r\n</div>"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  overflow: hidden; }\n  :host .content {\n    display: -ms-grid;\n    display: grid;\n    -ms-grid-rows: 72px auto;\n        grid-template-rows: 72px auto;\n    overflow: hidden; }\n  @media (max-width: 786px) {\n      :host .content {\n        -ms-grid-rows: 56px auto;\n            grid-template-rows: 56px auto; } }\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_globals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.globals */ "./src/app/app.globals.ts");
/* harmony import */ var _services_http_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/http.service */ "./src/app/services/http.service.ts");
/* harmony import */ var _services_screen_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/screen.service */ "./src/app/services/screen.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppComponent = /** @class */ (function () {
    function AppComponent(globals, router, httpService, screenService) {
        var _this = this;
        this.globals = globals;
        this.router = router;
        this.httpService = httpService;
        this.screenService = screenService;
        this.showAuthenticator = false;
        this.onWindowResized();
        router.events.subscribe(function (e) {
            if (e instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"]) {
                if (globals.passcode == "") {
                    _this.showAuthenticator = true;
                }
            }
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        if (!this.loadKey()) {
            console.log("Failed to load authentication key.");
        }
    };
    AppComponent.prototype.loadKey = function () {
        var keyName = localStorage.getItem("use-key");
        if (!keyName)
            return false;
        var key = localStorage.getItem("key-" + keyName);
        if (!key)
            return false;
        this.globals.keyName = keyName;
        this.globals.key = key;
    };
    AppComponent.prototype.onAuthenticated = function () {
        this.showAuthenticator = false;
    };
    AppComponent.prototype.onWindowResized = function () {
        this.screenService.setScreenSize(window.innerWidth, window.innerHeight);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])("window:resize"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AppComponent.prototype, "onWindowResized", null);
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [_app_globals__WEBPACK_IMPORTED_MODULE_2__["Globals"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_http_service__WEBPACK_IMPORTED_MODULE_3__["HttpService"],
            _services_screen_service__WEBPACK_IMPORTED_MODULE_4__["ScreenService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.globals.ts":
/*!********************************!*\
  !*** ./src/app/app.globals.ts ***!
  \********************************/
/*! exports provided: Globals */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Globals", function() { return Globals; });
var Globals = /** @class */ (function () {
    function Globals() {
        this.passcode = "";
        this.key = "";
        this.keyName = "";
    }
    return Globals;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _app_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.auth */ "./src/app/app.auth.ts");
/* harmony import */ var _app_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_app_auth__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _components_tool_selector_tool_selector_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/tool-selector/tool-selector.component */ "./src/app/components/tool-selector/tool-selector.component.ts");
/* harmony import */ var _app_routes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app.routes */ "./src/app/app.routes.ts");
/* harmony import */ var _components_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/navbar/navbar.component */ "./src/app/components/navbar/navbar.component.ts");
/* harmony import */ var _components_task_list_task_list_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/task-list/task-list.component */ "./src/app/components/task-list/task-list.component.ts");
/* harmony import */ var _components_authenticator_authenticator_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/authenticator/authenticator.component */ "./src/app/components/authenticator/authenticator.component.ts");
/* harmony import */ var _services_http_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./services/http.service */ "./src/app/services/http.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _services_http_interceptor__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./services/http.interceptor */ "./src/app/services/http.interceptor.ts");
/* harmony import */ var _app_globals__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./app.globals */ "./src/app/app.globals.ts");
/* harmony import */ var _services_screen_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./services/screen.service */ "./src/app/services/screen.service.ts");
/* harmony import */ var _services_navbar_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./services/navbar.service */ "./src/app/services/navbar.service.ts");
/* harmony import */ var _services_string_util_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./services/string-util.service */ "./src/app/services/string-util.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                _components_tool_selector_tool_selector_component__WEBPACK_IMPORTED_MODULE_6__["ToolSelectorComponent"],
                _components_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_8__["NavbarComponent"],
                _components_task_list_task_list_component__WEBPACK_IMPORTED_MODULE_9__["TaskListComponent"],
                _components_authenticator_authenticator_component__WEBPACK_IMPORTED_MODULE_10__["AuthenticatorComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_12__["HttpClientModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forRoot(_app_routes__WEBPACK_IMPORTED_MODULE_7__["AppRoutes"]),
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"]
            ],
            providers: [
                _services_http_service__WEBPACK_IMPORTED_MODULE_11__["HttpService"],
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_12__["HTTP_INTERCEPTORS"], useClass: _services_http_interceptor__WEBPACK_IMPORTED_MODULE_13__["PasscodeInterceptor"], multi: true },
                _app_globals__WEBPACK_IMPORTED_MODULE_14__["Globals"],
                _services_screen_service__WEBPACK_IMPORTED_MODULE_15__["ScreenService"],
                _services_navbar_service__WEBPACK_IMPORTED_MODULE_16__["NavbarService"],
                _services_string_util_service__WEBPACK_IMPORTED_MODULE_17__["StringUtilService"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.routes.ts":
/*!*******************************!*\
  !*** ./src/app/app.routes.ts ***!
  \*******************************/
/*! exports provided: AppRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutes", function() { return AppRoutes; });
/* harmony import */ var _components_tool_selector_tool_selector_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/tool-selector/tool-selector.component */ "./src/app/components/tool-selector/tool-selector.component.ts");
/* harmony import */ var _components_task_list_task_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/task-list/task-list.component */ "./src/app/components/task-list/task-list.component.ts");


var AppRoutes = [
    {
        path: "tasks",
        component: _components_task_list_task_list_component__WEBPACK_IMPORTED_MODULE_1__["TaskListComponent"],
    },
    {
        path: "authenticate",
        redirectTo: ""
    },
    {
        path: "",
        component: _components_tool_selector_tool_selector_component__WEBPACK_IMPORTED_MODULE_0__["ToolSelectorComponent"],
    }
];


/***/ }),

/***/ "./src/app/components/authenticator/authenticator.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/components/authenticator/authenticator.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" [class.hidden]=\"hidden\">\r\n    <div class=\"keypad\">\r\n        <div class=\"code\">\r\n            <div class=\"text\">\r\n                <div class=\"dot\" \r\n                *ngFor=\"let _ of codeDots; index as index\"\r\n                [class.opaque]=\"index <= curCode.length - 1\"\r\n                [class.waiting]=\"waiting\"\r\n                [class.correct]=\"passwordCorrect\"\r\n                [class.incorrect]=\"passwordIncorrect\">\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"key\" *ngFor=\"let key of keys\"\r\n        (click)=\"onKeyClicked(key)\">\r\n            <div class=\"text\">{{ key }}</div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/components/authenticator/authenticator.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/components/authenticator/authenticator.component.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container {\n  display: block;\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 9999;\n  background-color: #1a1919;\n  box-shadow: inset 0 0 8px black;\n  transition: opacity 500ms ease; }\n  .container.hidden {\n    opacity: 0; }\n  .container .keypad {\n    display: -ms-grid;\n    display: grid;\n    -ms-grid-rows: 1fr 1fr 1fr 1fr 1fr;\n        grid-template-rows: 1fr 1fr 1fr 1fr 1fr;\n    -ms-grid-columns: 1fr 1fr 1fr;\n        grid-template-columns: 1fr 1fr 1fr;\n    position: relative;\n    left: 50%;\n    top: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n    width: 240px;\n    height: 400px;\n    box-shadow: 0 0 8px black; }\n  @media (max-width: 786px) {\n      .container .keypad {\n        width: 100%;\n        height: 100%; } }\n  .container .keypad .key .text, .container .keypad .code .text {\n      display: inline-block;\n      position: relative;\n      left: 50%;\n      top: 50%;\n      -webkit-transform: translate(-50%, -50%);\n              transform: translate(-50%, -50%);\n      -webkit-user-select: none;\n         -moz-user-select: none;\n          -ms-user-select: none;\n              user-select: none;\n      font-size: 18px; }\n  @media (max-width: 786px) {\n        .container .keypad .key .text, .container .keypad .code .text {\n          font-size: 14px; } }\n  .container .keypad .code {\n      box-sizing: border-box;\n      background: linear-gradient(135deg, #242424 0%, #1a1919 100%);\n      grid-column: span 3; }\n  .container .keypad .code .dot {\n        display: inline-block;\n        width: 24px;\n        height: 24px;\n        border-radius: 50%;\n        background-color: #cccccc;\n        opacity: 0.2; }\n  .container .keypad .code .dot + .dot {\n          margin-left: 16px; }\n  .container .keypad .code .dot.opaque {\n          opacity: 1; }\n  .container .keypad .code .dot.waiting {\n          -webkit-animation: \"waiting\" 500ms ease infinite;\n                  animation: \"waiting\" 500ms ease infinite; }\n  @-webkit-keyframes waiting {\n  0% {\n    opacity: 1; }\n  50% {\n    opacity: 0.2; }\n  100% {\n    opacity: 1; } }\n  @keyframes waiting {\n  0% {\n    opacity: 1; }\n  50% {\n    opacity: 0.2; }\n  100% {\n    opacity: 1; } }\n  .container .keypad .code .dot.correct {\n          opacity: 1;\n          background-color: #009900; }\n  .container .keypad .code .dot.incorrect {\n          opacity: 1;\n          background-color: #990000; }\n  .container .keypad .key {\n      box-sizing: border-box;\n      background: linear-gradient(135deg, #242424 0%, #1a1919 100%); }\n  @media (min-width: 786px) {\n        .container .keypad .key {\n          cursor: pointer; }\n          .container .keypad .key:hover {\n            background: linear-gradient(135deg, #073740 0%, #052329 100%); }\n          .container .keypad .key:active {\n            background: linear-gradient(135deg, #062f37 0%, #041b20 100%); } }\n  .container .keypad .key:nth-child(11) {\n        color: #e60000; }\n  @media (min-width: 786px) {\n          .container .keypad .key:nth-child(11) {\n            cursor: pointer; }\n            .container .keypad .key:nth-child(11):hover {\n              background: linear-gradient(135deg, #420000 0%, #330000 100%); }\n            .container .keypad .key:nth-child(11):active {\n              background: linear-gradient(135deg, #380000 0%, #290000 100%); } }\n  .container .keypad .key:nth-child(13) {\n        color: #009900; }\n  @media (min-width: 786px) {\n          .container .keypad .key:nth-child(13) {\n            cursor: pointer; }\n            .container .keypad .key:nth-child(13):hover {\n              background: linear-gradient(135deg, #003300 0%, #002400 100%); }\n            .container .keypad .key:nth-child(13):active {\n              background: linear-gradient(135deg, #002900 0%, #001a00 100%); } }\n"

/***/ }),

/***/ "./src/app/components/authenticator/authenticator.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/components/authenticator/authenticator.component.ts ***!
  \*********************************************************************/
/*! exports provided: AuthenticatorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticatorComponent", function() { return AuthenticatorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/http.service */ "./src/app/services/http.service.ts");
/* harmony import */ var _app_globals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app.globals */ "./src/app/app.globals.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthenticatorComponent = /** @class */ (function () {
    function AuthenticatorComponent(httpService, globals) {
        this.httpService = httpService;
        this.globals = globals;
        this.authenticated = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.clearKey = "C";
        this.enterKey = "✓";
        this.codeDots = new Array(4).fill(null);
        this.keys = [
            "1", "2", "3",
            "4", "5", "6",
            "7", "8", "9",
            this.clearKey, "0", this.enterKey
        ];
        this.keyAliases = ["c", "Enter"];
        this.curCode = "";
        this.waiting = false;
        this.hidden = false;
        this.passwordCorrect = false;
        this.passwordIncorrect = false;
    }
    AuthenticatorComponent.prototype.onKeyClicked = function (key) {
        if (!this.keys.includes(key) &&
            !this.keyAliases.includes(key))
            return;
        if (key == this.clearKey || key == "c") {
            this.curCode = "";
        }
        else if (key == this.enterKey || key == "Enter") {
            if (this.curCode.length == 4) {
                this.onPasscodeEntered(this.curCode);
            }
        }
        else if (this.curCode.length < 4) {
            this.curCode += key;
        }
    };
    AuthenticatorComponent.prototype.onPasscodeEntered = function (code) {
        var _this = this;
        this.waiting = true;
        this.globals.passcode = code;
        setTimeout(function () {
            _this.httpService.authenticate(code)
                .subscribe(function (res) {
                _this.waiting = false;
                _this.curCode = "";
                if (res.success) {
                    _this.onCorrectPasscode();
                }
                else {
                    _this.onIncorrectPasscode();
                }
            });
        }, 1250);
    };
    AuthenticatorComponent.prototype.onCorrectPasscode = function () {
        var _this = this;
        this.passwordCorrect = true;
        this.passwordIncorrect = false;
        setTimeout(function () {
            _this.hidden = true;
            setTimeout(function () {
                _this.authenticated.emit();
            }, 500);
        }, 500);
    };
    AuthenticatorComponent.prototype.onIncorrectPasscode = function () {
        var _this = this;
        this.passwordCorrect = false;
        this.passwordIncorrect = true;
        setTimeout(function () {
            _this.passwordCorrect = false;
            _this.passwordIncorrect = false;
        }, 1000);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], AuthenticatorComponent.prototype, "authenticated", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])("window:keypress", ["$event.key"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], AuthenticatorComponent.prototype, "onKeyClicked", null);
    AuthenticatorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-authenticator',
            template: __webpack_require__(/*! ./authenticator.component.html */ "./src/app/components/authenticator/authenticator.component.html"),
            styles: [__webpack_require__(/*! ./authenticator.component.scss */ "./src/app/components/authenticator/authenticator.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"],
            _app_globals__WEBPACK_IMPORTED_MODULE_2__["Globals"]])
    ], AuthenticatorComponent);
    return AuthenticatorComponent;
}());



/***/ }),

/***/ "./src/app/components/navbar/navbar.component.html":
/*!*********************************************************!*\
  !*** ./src/app/components/navbar/navbar.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"path\">\n    <ng-container *ngIf=\"!screenService.mobile\">\n        <span class=\"dir\" (click)=\"onDirClicked(-1)\">Tools</span>\n        <span class=\"delim\">{{ delimSymbol }}</span>\n\n        <ng-container *ngIf=\"path.length == 0\">\n            <span class=\"hint\">Select a tool...</span>\n        </ng-container>\n\n        <ng-container *ngIf=\"path.length > 0\">\n            <ng-container *ngIf=\"!screenService.mobile\">\n                <ng-container *ngFor=\"let dir of path; index as index; last as last;\">\n                    <span class=\"dir\" (click)=\"onDirClicked(index)\">{{ dir }}</span>\n                    <span class=\"delim\" *ngIf=\"!last && !navbarService.extensions\">{{ delimSymbol }}</span>\n                </ng-container>\n        \n                <span class=\"delim\" *ngIf=\"navbarService.extensions.length > 0\">{{ delimSymbol }}</span>\n        \n                <ng-container *ngFor=\"let ext of navbarService.extensions; index as index; last as last;\">\n                    <span class=\"dir\" (click)=\"onExtClicked(index)\">{{ ext }}</span>\n                    <span class=\"delim\" *ngIf=\"!last\">{{ delimSymbol }}</span>\n                </ng-container>\n            </ng-container>\n        </ng-container>\n    </ng-container>\n\n    <ng-container *ngIf=\"screenService.mobile\">\n        <ng-container *ngIf=\"navbarService.extensions.length == 0\">\n            <ng-container *ngIf=\"path.length == 0\">\n                <span class=\"dir\">Tools</span>\n            </ng-container>\n\n            <ng-container *ngIf=\"path.length > 0\">\n                <span class=\"dir\" (click)=\"onDirClicked(path.length - 2)\">...</span>\n                <span class=\"delim\">{{ delimSymbol }}</span>\n                <span class=\"dir\">{{ path[path.length - 1] }}</span>\n            </ng-container>\n        </ng-container>\n\n        <ng-container *ngIf=\"navbarService.extensions.length > 0\">\n            <ng-container *ngIf=\"navbarService.extensions.length == 1\">\n                <span class=\"dir\" (click)=\"onDirClicked(path.length - 1)\">...</span>\n            </ng-container>\n\n            <ng-container *ngIf=\"navbarService.extensions.length > 1\">\n                <span class=\"dir\" (click)=\"onExtClicked(navbarService.extensions.length - 2)\">...</span>\n            </ng-container>\n\n            <span class=\"delim\">{{ delimSymbol }}</span>\n            <span class=\"dir\">{{ navbarService.extensions[navbarService.extensions.length - 1] }}</span>\n        </ng-container>\n    </ng-container>\n</div>\n\n<div class=\"fullscreen\"\n(click)=\"toggleFullscreen()\">\n    <div class=\"fullscreen-inner\">[F]</div>\n</div>"

/***/ }),

/***/ "./src/app/components/navbar/navbar.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/components/navbar/navbar.component.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  box-sizing: border-box;\n  background: linear-gradient(135deg, #242424 0%, #1a1919 100%);\n  position: relative;\n  z-index: 999;\n  box-shadow: 0 0 8px black;\n  display: flex;\n  flex-flow: row nowrap;\n  box-sizing: border-box;\n  padding-left: 16px;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  font-size: 18px; }\n  @media (max-width: 786px) {\n    :host {\n      font-size: 14px; } }\n  :host > * {\n    display: inline-block;\n    position: relative;\n    top: 50%;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%); }\n  :host .path {\n    flex: 1;\n    height: -webkit-min-content;\n    height: -moz-min-content;\n    height: min-content; }\n  :host .path .dir {\n      text-transform: capitalize; }\n  :host .path .dir:not(:last-child) {\n        cursor: pointer; }\n  :host .path .dir:last-child {\n        cursor: default; }\n  @media (min-width: 786px) {\n        :host .path .dir:hover:not(:last-child) {\n          text-decoration: underline;\n          color: #008099; } }\n  :host .path .delim {\n      opacity: 0.5;\n      margin: 0 18px; }\n  :host .path .hint {\n      opacity: 0.5; }\n  :host .fullscreen {\n    position: absolute;\n    right: 0;\n    width: 72px;\n    height: 72px; }\n  @media (min-width: 786px) {\n      :host .fullscreen {\n        cursor: pointer; }\n        :host .fullscreen:hover {\n          background: linear-gradient(135deg, #073740 0%, #052329 100%); }\n        :host .fullscreen:active {\n          background: linear-gradient(135deg, #062f37 0%, #041b20 100%); } }\n  :host .fullscreen .fullscreen-inner {\n      display: inline-block;\n      position: relative;\n      left: 50%;\n      top: 50%;\n      -webkit-transform: translate(-50%, -50%);\n              transform: translate(-50%, -50%); }\n"

/***/ }),

/***/ "./src/app/components/navbar/navbar.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/navbar/navbar.component.ts ***!
  \*******************************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_navbar_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/navbar.service */ "./src/app/services/navbar.service.ts");
/* harmony import */ var _services_screen_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/screen.service */ "./src/app/services/screen.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(router, navbarService, screenService) {
        var _this = this;
        this.router = router;
        this.navbarService = navbarService;
        this.screenService = screenService;
        this.path = [];
        this.backSymbol = "...";
        this.delimSymbol = ">";
        this.fullscreen = false;
        router.events.subscribe(function (e) {
            _this.onRouteChange(e);
        });
    }
    NavbarComponent.prototype.onRouteChange = function (e) {
        if (!(e instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"]))
            return;
        this.path = e.url.substr(1).split("/");
        if ((this.path.length == 1 && this.path[0] == "") ||
            this.path[0] == "authenticate") {
            this.path = [];
        }
    };
    NavbarComponent.prototype.onDirClicked = function (index) {
        if (index == -1) {
            this.router.navigate([""]);
            return;
        }
        this.router.navigate(this.path.slice(0, index + 1));
        if (index == this.path.length - 1) {
            this.navbarService.triggerClickEvent(-1);
        }
    };
    NavbarComponent.prototype.onExtClicked = function (index) {
        this.navbarService.triggerClickEvent(index);
    };
    NavbarComponent.prototype.toggleFullscreen = function () {
        if (this.fullscreen) {
            document.exitFullscreen();
        }
        else {
            document.body.requestFullscreen();
        }
        this.fullscreen = !this.fullscreen;
    };
    NavbarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(/*! ./navbar.component.html */ "./src/app/components/navbar/navbar.component.html"),
            styles: [__webpack_require__(/*! ./navbar.component.scss */ "./src/app/components/navbar/navbar.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_navbar_service__WEBPACK_IMPORTED_MODULE_2__["NavbarService"],
            _services_screen_service__WEBPACK_IMPORTED_MODULE_3__["ScreenService"]])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "./src/app/components/task-list/task-list.component.html":
/*!***************************************************************!*\
  !*** ./src/app/components/task-list/task-list.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\"\n[class.view-one]=\"screenService.mobile && !listSelected && !taskSelected\"\n[class.view-two]=\"screenService.mobile && listSelected && !taskSelected\"\n[class.view-three]=\"screenService.mobile && listSelected && taskSelected\">\n    <div class=\"list-section\">\n        <div class=\"list-header\">\n            <div class=\"label\">\n                <div class=\"text\">Task Lists</div>\n            </div>\n            \n            <div class=\"list-delete\"\n            (click)=\"onDeleteTaskList()\"\n            [class.placeholder]=\"!listSelected\">\n                <span class=\"text\">[-]</span>        \n            </div>\n\n            <div class=\"list-create\"\n            (click)=\"onCreateTaskList()\">\n                <div class=\"text\">[+]</div>\n            </div>\n        </div>\n\n        <div class=\"list-container\">\n            <div class=\"list\"\n            *ngFor=\"let taskList of taskLists; index as index;\"\n            (click)=\"onSelectTaskList(index)\"\n            [class.selected]=\"!screenService.mobile && index == curListIndex\">\n                <div class=\"text\" *ngIf=\"taskList.name.trim()\">\n                    {{ listSymbol }}&nbsp;{{ taskList.name }}\n                </div>\n\n                <div class=\"text\" *ngIf=\"!taskList.name.trim()\">\n                    {{ listSymbol }}&nbsp;&lt;Untitled&gt;\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"task-section\">\n        <div class=\"task-header\">\n            <ng-container *ngIf=\"!listSelected\">\n                <div class=\"list-name\">\n                    <div class=\"text\">\n                        <span class=\"placeholder\">{{ listSymbol }}&nbsp;&lt;Task List: Name&gt;</span>\n                    </div>\n                </div>\n                        \n                <div class=\"list-desc\">\n                    <span class=\"text placeholder\">&lt;Task List: Description&gt;</span>\n                </div>\n\n                <div class=\"list-info\">\n                    <span class=\"text placeholder\">\n                        &lt;Task List: Length&gt; | &lt;Task List: ID&gt;\n                    </span>\n                </div>\n            </ng-container>\n\n            <ng-container *ngIf=\"listSelected\">\n                <div class=\"list-name\" \n                [class.hoverable]=\"focusedInput != 'list-name'\"\n                [class.active]=\"focusedInput == 'list-name'\"\n                (click)=\"onInputFocus('list-name', listNameInput, true)\">\n                    <span class=\"text\"\n                    *ngIf=\"focusedInput != 'list-name'\"\n                    [class.placeholder]=\"!curTaskList?.name?.trim()\">\n                        {{ listSymbol }}&nbsp;{{ curTaskList?.name?.trim() || \"<Task List: Name>\" }}\n                    </span>\n\n                    <div class=\"text\"\n                    [style.display]=\"focusedInput != 'list-name' ? 'none' : 'flex'\">\n                        <div class=\"icon-container\">\n                            <span class=\"icon\"\n                            [class.placeholder]=\"!curTaskList?.name?.trim()\">\n                                {{ listSymbol }}&nbsp;\n                            </span>\n                        </div>\n                        \n                        <div class=\"input-container\">\n                            <input type=\"text\" placeholder=\"<Task List: Name>\"\n                            [(ngModel)]=\"curTaskList.name\"\n                            (ngModelChange)=\"onTaskListDetailsModified()\"\n                            (blur)=\"onInputBlur()\"\n                            #listNameInput>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"list-desc\"\n                [class.hoverable]=\"focusedInput != 'list-description'\"\n                [class.active]=\"focusedInput == 'list-description'\"\n                (click)=\"onInputFocus('list-description', listDescInput, true)\">\n                    <span class=\"text\"\n                    *ngIf=\"focusedInput != 'list-description'\"\n                    [class.placeholder]=\"!curTaskList?.description?.trim()\">\n                        {{ curTaskList?.description?.trim() || \"<Task List: Description>\" }}\n                    </span>\n\n                    <input type=\"text\" class=\"text\" placeholder=\"<Task List: Description>\"\n                    [(ngModel)]=\"curTaskList.description\"\n                    (ngModelChange)=\"onTaskListDetailsModified()\"\n                    (blur)=\"onInputBlur()\"\n                    [style.display]=\"focusedInput != 'list-description' ? 'none' : ''\"\n                    #listDescInput>\n                </div>\n\n                <div class=\"list-info\">\n                    <span class=\"text\">\n                        {{ curTaskList?.tasks?.length }} tasks |\n                        ID: {{ curTaskList?._id }}\n                    </span>\n                </div>\n            </ng-container>\n\n            <div class=\"task-delete\"\n            (click)=\"onDeleteTask()\"\n            *ngIf=\"!screenService.mobile\"\n            [class.placeholder]=\"!(listSelected && taskSelected) || focusedInput == 'list-name'\">\n                <span class=\"text\">[-]</span>        \n            </div>\n\n            <div class=\"task-create\"\n            (click)=\"onCreateTask()\"\n            [class.placeholder]=\"!listSelected || focusedInput == 'list-name'\">\n                <span class=\"text\">[+]</span>        \n            </div>\n        </div>\n\n        <div class=\"task-container\">\n            <div class=\"task-container-inner\">\n                <div class=\"task\"\n                *ngFor=\"let task of curTaskList?.tasks; index as index;\"\n                [class.active]=\"!screenService.mobile && index == this.curTaskIndex\">\n                    <div class=\"task-checkbox\"\n                    (click)=\"onCheckTask(index)\">\n                        <span class=\"text\">\n                            [{{ task.completed ? checkSymbol : ' ' }}]\n                        </span>\n                    </div>\n                    \n                    <div class=\"task-details\"\n                    [class.completed]=\"task.completed\"\n                    (click)=\"onSelectTask(index)\">\n                        <span class=\"text\">\n                            <div class=\"task-name\">\n                                {{ task.name }}\n                            </div>\n\n                            <!-- <div class=\"other-stuff\">\n                                Today @ 8:50\n                            </div> -->\n                        </span>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"task-details-section\"\n    [class.hide-top-tile]=\"screenService.mobile && taskSelected && focusedInput == 'task-desc'\">\n        <ng-container *ngIf=\"!taskSelected\">\n            <div class=\"top-tile\">\n                <div class=\"task-name placeholder\">\n                    <span class=\"text\">&lt;Task: Name&gt;</span>    \n                </div>\n\n                <div class=\"task-date placeholder\">\n                    <span class=\"text\">&lt;Task: Date&gt;</span>\n                </div>\n\n                <div class=\"task-completed placeholder\">\n                    <span class=\"text left\">&lt;Task: Done&gt;</span>\n                </div>\n\n                <div class=\"task-urgent placeholder\">\n                    <span class=\"text left\">&lt;Task: Urgent&gt;</span>\n                </div>\n            </div>\n\n            <div class=\"task-desc placeholder\">\n                <span class=\"text placeholder\">&lt;Task: Description&gt;</span>\n            </div>\n        </ng-container>\n\n        <ng-container *ngIf=\"taskSelected\">\n            <div class=\"top-tile\" \n            *ngIf=\"!(screenService.mobile && focusedInput == 'task-desc')\">\n                <div class=\"task-name\"\n                [class.hoverable]=\"focusedInput != 'task-name'\"\n                [class.active]=\"focusedInput == 'task-name'\"\n                (click)=\"onInputFocus('task-name', taskNameInput)\">\n                    <span class=\"text\"\n                    [class.placeholder]=\"!curTask?.name?.trim()\"\n                    *ngIf=\"focusedInput != 'task-name'\">\n                        {{ curTask?.name?.trim() || \"<Task: Name>\" }}\n                    </span>\n                    \n                    <input type=\"text\" class=\"text\" placeholder=\"<Task: Name>\"\n                    [(ngModel)]=\"curTask.name\"\n                    (ngModelChange)=\"onTaskDetailsModified()\"\n                    (blur)=\"onInputBlur()\"\n                    [style.display]=\"focusedInput != 'task-name' ? 'none' : ''\"\n                    #taskNameInput>\n                </div>\n\n                <div class=\"task-date\"\n                [class.hoverable]=\"focusedInput != 'task-date'\"\n                [class.active]=\"focusedInput == 'task-date'\"\n                [class.invalid]=\"!dateValid(curTask?.date)\"\n                (click)=\"onInputFocus('task-date', taskDateInput)\">\n                    <span class=\"text\"\n                    [class.placeholder]=\"!curTask?.date?.trim()\"\n                    *ngIf=\"focusedInput != 'task-date'\">\n                        {{ curTask?.date?.trim() || \"<Task: Date>\" }}\n                    </span>\n                    \n                    <input type=\"text\" class=\"text\" placeholder=\"<Task: Date>\"\n                    [(ngModel)]=\"curTask.date\"\n                    (ngModelChange)=\"onTaskDetailsModified()\"\n                    (blur)=\"onInputBlur()\"\n                    [style.display]=\"focusedInput != 'task-date' ? 'none' : ''\"\n                    #taskDateInput>\n                </div>\n\n                <div class=\"task-completed\"\n                (click)=\"onToggleTaskProp('completed')\">\n                    <span class=\"text placeholder left\"\n                    *ngIf=\"!taskSelected\">\n                        &lt;Task: Done&gt;\n                    </span>\n\n                    <span class=\"text\"\n                    [class.good]=\"curTask.completed\"\n                    [class.bad]=\"!curTask.completed\"\n                    *ngIf=\"taskSelected\">\n                        {{ curTask?.completed ? 'DONE' : 'NOT DONE' }}\n                    </span>\n                </div>\n\n                <div class=\"task-urgent\"\n                (click)=\"onToggleTaskProp('urgent')\"\n                [class.placeholder]=\"curTask?.completed\">\n                    <span class=\"text placeholder left\"\n                    *ngIf=\"!taskSelected\">\n                        &lt;Task: Urgent&gt;\n                    </span>\n\n                    <span class=\"text\"\n                    [class.good]=\"!curTask?.completed && !curTask?.urgent\"\n                    [class.bad]=\"!curTask?.completed && curTask?.urgent\"\n                    *ngIf=\"taskSelected\">\n                        {{ curTask?.urgent ? 'URGENT' : 'NOT URGENT' }}\n                    </span>\n                </div>\n            </div>\n\n            <div class=\"task-desc\"\n            [class.placeholder]=\"!taskSelected\"\n            [class.hoverable]=\"focusedInput != 'task-desc'\"\n            [class.active]=\"focusedInput == 'task-desc'\"\n            (click)=\"onInputFocus('task-desc', taskDescInput)\">\n                <span class=\"text\"\n                [class.placeholder]=\"!curTask?.description?.trim()\"\n                *ngIf=\"focusedInput != 'task-desc'\">\n                    {{ curTask?.description?.trim() ? curTask.description : '&lt;Task: Description&gt;' }}  \n                </span>\n\n                <textarea class=\"text\"\n                [(ngModel)]=\"curTask.description\"\n                (ngModelChange)=\"onTaskDetailsModified()\"\n                (blur)=\"onInputBlur()\"\n                [style.display]=\"focusedInput != 'task-desc' ? 'none' : ''\"\n                #taskDescInput>\n                </textarea>\n            </div>\n        </ng-container>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/components/task-list/task-list.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/components/task-list/task-list.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".placeholder {\n  pointer-events: none;\n  color: rgba(204, 204, 204, 0.25) !important; }\n\ninput[type=text] {\n  width: calc(100% - 32px);\n  padding: 0;\n  margin: 0;\n  background: transparent;\n  height: 72px; }\n\n@media (max-width: 786px) {\n    input[type=text] {\n      height: 56px; } }\n\n.container {\n  position: absolute;\n  left: 0;\n  top: 72px;\n  width: 100%;\n  height: calc(100% - 72px);\n  font-size: 0;\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-rows: 1fr;\n      grid-template-rows: 1fr;\n  -ms-grid-columns: 300px auto 350px;\n      grid-template-columns: 300px auto 350px; }\n\n@media (max-width: 786px) {\n    .container {\n      top: 56px;\n      height: calc(100% - 56px); } }\n\n@media (max-width: 786px) {\n    .container {\n      -ms-grid-columns: 100vw 100vw 100vw;\n          grid-template-columns: 100vw 100vw 100vw;\n      transition: -webkit-transform 300ms ease;\n      transition: transform 300ms ease;\n      transition: transform 300ms ease, -webkit-transform 300ms ease; } }\n\n.container.view-one {\n    -webkit-transform: translateX(0);\n            transform: translateX(0); }\n\n.container.view-two {\n    -webkit-transform: translateX(-100vw);\n            transform: translateX(-100vw); }\n\n.container.view-three {\n    -webkit-transform: translateX(-200vw);\n            transform: translateX(-200vw); }\n\n.container .list-section {\n    display: -ms-grid;\n    display: grid;\n    -ms-grid-rows: 72px auto;\n        grid-template-rows: 72px auto;\n    overflow: hidden; }\n\n@media (min-width: 786px) {\n      .container .list-section {\n        box-shadow: 0 0 12px black;\n        z-index: 2; } }\n\n.container .list-section .list-header {\n      box-sizing: border-box;\n      background: linear-gradient(135deg, #242424 0%, #1a1919 100%);\n      display: -ms-grid;\n      display: grid;\n      -ms-grid-columns: auto (72px)[2];\n          grid-template-columns: auto repeat(2, 72px); }\n\n@media (max-width: 786px) {\n        .container .list-section .list-header {\n          -ms-grid-columns: auto (56px)[2];\n              grid-template-columns: auto repeat(2, 56px); } }\n\n.container .list-section .list-header .label .text {\n        display: inline-block;\n        position: relative;\n        left: 16px;\n        top: 50%;\n        -webkit-transform: translateY(-50%);\n                transform: translateY(-50%);\n        -webkit-user-select: none;\n           -moz-user-select: none;\n            -ms-user-select: none;\n                user-select: none;\n        font-size: 18px; }\n\n@media (max-width: 786px) {\n          .container .list-section .list-header .label .text {\n            font-size: 14px; } }\n\n.container .list-section .list-header .list-create .text,\n      .container .list-section .list-header .list-delete .text {\n        display: inline-block;\n        position: relative;\n        left: 50%;\n        top: 50%;\n        -webkit-transform: translate(-50%, -50%);\n                transform: translate(-50%, -50%);\n        -webkit-user-select: none;\n           -moz-user-select: none;\n            -ms-user-select: none;\n                user-select: none;\n        font-size: 18px; }\n\n@media (max-width: 786px) {\n          .container .list-section .list-header .list-create .text,\n          .container .list-section .list-header .list-delete .text {\n            font-size: 14px; } }\n\n.container .list-section .list-header .list-create {\n        color: #009900; }\n\n@media (min-width: 786px) {\n          .container .list-section .list-header .list-create {\n            cursor: pointer; }\n            .container .list-section .list-header .list-create:hover {\n              background: linear-gradient(135deg, #003300 0%, #002400 100%); }\n            .container .list-section .list-header .list-create:active {\n              background: linear-gradient(135deg, #002900 0%, #001a00 100%); } }\n\n.container .list-section .list-header .list-delete {\n        color: #e60000; }\n\n@media (min-width: 786px) {\n          .container .list-section .list-header .list-delete {\n            cursor: pointer; }\n            .container .list-section .list-header .list-delete:hover {\n              background: linear-gradient(135deg, #420000 0%, #330000 100%); }\n            .container .list-section .list-header .list-delete:active {\n              background: linear-gradient(135deg, #380000 0%, #290000 100%); } }\n\n.container .list-section .list-container {\n      box-sizing: border-box;\n      background: linear-gradient(135deg, #242424 0%, #1a1919 100%);\n      overflow-x: hidden;\n      overflow-y: auto; }\n\n.container .list-section .list-container .list {\n        height: 72px; }\n\n@media (min-width: 786px) {\n          .container .list-section .list-container .list {\n            cursor: pointer; }\n            .container .list-section .list-container .list:hover {\n              background: linear-gradient(135deg, #073740 0%, #052329 100%); }\n            .container .list-section .list-container .list:active {\n              background: linear-gradient(135deg, #062f37 0%, #041b20 100%); } }\n\n.container .list-section .list-container .list.selected {\n          background: linear-gradient(135deg, #062f37 0%, #041b20 100%);\n          pointer-events: none; }\n\n.container .list-section .list-container .list .text {\n          display: inline-block;\n          position: relative;\n          left: 16px;\n          top: 50%;\n          -webkit-transform: translateY(-50%);\n                  transform: translateY(-50%);\n          -webkit-user-select: none;\n             -moz-user-select: none;\n              -ms-user-select: none;\n                  user-select: none;\n          font-size: 18px;\n          white-space: nowrap;\n          overflow: hidden;\n          text-overflow: ellipsis;\n          max-width: calc(100% - 32px); }\n\n@media (max-width: 786px) {\n            .container .list-section .list-container .list .text {\n              font-size: 14px; } }\n\n.container .task-section {\n    display: -ms-grid;\n    display: grid;\n    -ms-grid-rows: 216px auto;\n        grid-template-rows: 216px auto;\n    overflow: hidden; }\n\n@media (max-width: 786px) {\n      .container .task-section {\n        -ms-grid-rows: 168px auto;\n            grid-template-rows: 168px auto; } }\n\n@media (min-width: 786px) {\n      .container .task-section {\n        box-shadow: 0 0 12px black;\n        z-index: 1; } }\n\n.container .task-section .task-header {\n      box-sizing: border-box;\n      background: linear-gradient(135deg, #242424 0%, #1a1919 100%);\n      display: -ms-grid;\n      display: grid;\n          -ms-grid-rows: 1fr 1fr 1fr;\n          grid-template-rows: 1fr 1fr 1fr;\n          -ms-grid-columns: 1fr (72px)[2];\n          grid-template-columns: 1fr repeat(2, 72px);\n          grid-template-areas: \"name delete create\"\r \"desc desc desc\"\r \"info info info\"; }\n\n@media (max-width: 786px) {\n        .container .task-section .task-header {\n          -ms-grid-columns: 1fr (56px)[2];\n              grid-template-columns: 1fr repeat(2, 56px); } }\n\n.container .task-section .task-header .list-name {\n        -ms-grid-row: 1;\n        -ms-grid-column: 1;\n        -ms-grid-column-span: 2;\n        grid-area: name; }\n\n.container .task-section .task-header .list-desc {\n        -ms-grid-row: 2;\n        -ms-grid-column: 1;\n        -ms-grid-column-span: 3;\n        grid-area: desc; }\n\n.container .task-section .task-header .list-info {\n        -ms-grid-row: 3;\n        -ms-grid-column: 1;\n        -ms-grid-column-span: 3;\n        grid-area: info; }\n\n.container .task-section .task-header .task-delete {\n        -ms-grid-row: 1;\n        -ms-grid-column: 2;\n        grid-area: delete; }\n\n.container .task-section .task-header .task-create {\n        -ms-grid-row: 1;\n        -ms-grid-column: 3;\n        grid-area: create; }\n\n.container .task-section .task-header > :not(.list-delete) .text {\n        display: inline-block;\n        position: relative;\n        left: 16px;\n        top: 50%;\n        -webkit-transform: translateY(-50%);\n                transform: translateY(-50%);\n        -webkit-user-select: none;\n           -moz-user-select: none;\n            -ms-user-select: none;\n                user-select: none;\n        font-size: 18px; }\n\n@media (max-width: 786px) {\n          .container .task-section .task-header > :not(.list-delete) .text {\n            font-size: 14px; } }\n\n.container .task-section .task-header .list-name span.text,\n      .container .task-section .task-header .list-desc span.text,\n      .container .task-section .task-header .list-info span.text {\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        max-width: calc(100% - 32px); }\n\n.container .task-section .task-header .list-name {\n        width: calc(100% + 144px); }\n\n.container .task-section .task-header .list-name .text {\n          display: flex;\n          flex-flow: row nowrap; }\n\n.container .task-section .task-header .list-name .text .icon {\n            display: inline-block;\n            position: relative;\n            top: 50%;\n            -webkit-transform: translateY(-50%);\n                    transform: translateY(-50%); }\n\n.container .task-section .task-header .list-name .text .input-container {\n            flex: 1; }\n\n.container .task-section .task-header .list-name .text .input-container input[type=text] {\n              height: 24px !important;\n              position: relative;\n              top: 50%;\n              -webkit-transform: translateY(calc(-50% + 0.5px));\n                      transform: translateY(calc(-50% + 0.5px)); }\n\n.container .task-section .task-header .list-name .text .input-container input[type=text]::-webkit-input-placeholder {\n                color: rgba(204, 204, 204, 0.25); }\n\n.container .task-section .task-header .list-name .text .input-container input[type=text]::-ms-input-placeholder {\n                color: rgba(204, 204, 204, 0.25); }\n\n.container .task-section .task-header .list-name .text .input-container input[type=text]::placeholder {\n                color: rgba(204, 204, 204, 0.25); }\n\n.container .task-section .task-header .list-desc .text,\n      .container .task-section .task-header .list-info .text {\n        color: rgba(204, 204, 204, 0.5); }\n\n.container .task-section .task-header .list-desc input[type=text],\n      .container .task-section .task-header .list-info input[type=text] {\n        color: rgba(204, 204, 204, 0.5) !important; }\n\n.container .task-section .task-header .list-desc input[type=text]::-webkit-input-placeholder,\n        .container .task-section .task-header .list-info input[type=text]::-webkit-input-placeholder {\n          color: rgba(204, 204, 204, 0.25) !important;\n          opacity: 1; }\n\n.container .task-section .task-header .list-desc input[type=text]::-ms-input-placeholder,\n        .container .task-section .task-header .list-info input[type=text]::-ms-input-placeholder {\n          color: rgba(204, 204, 204, 0.25) !important;\n          opacity: 1; }\n\n.container .task-section .task-header .list-desc input[type=text]::placeholder,\n        .container .task-section .task-header .list-info input[type=text]::placeholder {\n          color: rgba(204, 204, 204, 0.25) !important;\n          opacity: 1; }\n\n.container .task-section .task-header .task-delete,\n      .container .task-section .task-header .task-create {\n        z-index: 1; }\n\n.container .task-section .task-header .task-delete .text,\n        .container .task-section .task-header .task-create .text {\n          display: inline-block;\n          position: relative;\n          left: 50%;\n          top: 50%;\n          -webkit-transform: translate(-50%, -50%);\n                  transform: translate(-50%, -50%);\n          -webkit-user-select: none;\n             -moz-user-select: none;\n              -ms-user-select: none;\n                  user-select: none;\n          font-size: 18px; }\n\n@media (max-width: 786px) {\n            .container .task-section .task-header .task-delete .text,\n            .container .task-section .task-header .task-create .text {\n              font-size: 14px; } }\n\n.container .task-section .task-header .task-delete {\n        color: #e60000; }\n\n@media (min-width: 786px) {\n          .container .task-section .task-header .task-delete {\n            cursor: pointer; }\n            .container .task-section .task-header .task-delete:hover {\n              background: linear-gradient(135deg, #420000 0%, #330000 100%); }\n            .container .task-section .task-header .task-delete:active {\n              background: linear-gradient(135deg, #380000 0%, #290000 100%); } }\n\n.container .task-section .task-header .task-create {\n        color: #009900; }\n\n@media (min-width: 786px) {\n          .container .task-section .task-header .task-create {\n            cursor: pointer; }\n            .container .task-section .task-header .task-create:hover {\n              background: linear-gradient(135deg, #003300 0%, #002400 100%); }\n            .container .task-section .task-header .task-create:active {\n              background: linear-gradient(135deg, #002900 0%, #001a00 100%); } }\n\n@media (min-width: 786px) {\n        .container .task-section .task-header .hoverable {\n          cursor: pointer; }\n          .container .task-section .task-header .hoverable:hover {\n            background: linear-gradient(135deg, #073740 0%, #052329 100%); }\n          .container .task-section .task-header .hoverable:active {\n            background: linear-gradient(135deg, #062f37 0%, #041b20 100%); } }\n\n.container .task-section .task-header .active {\n        background: linear-gradient(135deg, #062f37 0%, #041b20 100%); }\n\n.container .task-section .task-container {\n      overflow: hidden; }\n\n.container .task-section .task-container .task-container-inner {\n        box-sizing: border-box;\n        background: linear-gradient(135deg, #242424 0%, #1a1919 100%);\n        height: 100%;\n        overflow-x: hidden;\n        overflow-y: auto; }\n\n.container .task-section .task-container .task-container-inner .task {\n          display: -ms-grid;\n          display: grid;\n          -ms-grid-columns: 72px auto;\n              grid-template-columns: 72px auto;\n          height: 72px; }\n\n@media (max-width: 786px) {\n            .container .task-section .task-container .task-container-inner .task {\n              -ms-grid-columns: 56px auto;\n                  grid-template-columns: 56px auto;\n              height: 56px; } }\n\n@media (min-width: 786px) {\n            .container .task-section .task-container .task-container-inner .task {\n              cursor: pointer; }\n              .container .task-section .task-container .task-container-inner .task:hover {\n                background: linear-gradient(135deg, #073740 0%, #052329 100%); }\n              .container .task-section .task-container .task-container-inner .task:active {\n                background: linear-gradient(135deg, #062f37 0%, #041b20 100%); } }\n\n.container .task-section .task-container .task-container-inner .task.active {\n            background: linear-gradient(135deg, #062f37 0%, #041b20 100%);\n            pointer-events: none; }\n\n.container .task-section .task-container .task-container-inner .task .task-checkbox {\n            z-index: 1;\n            pointer-events: all; }\n\n.container .task-section .task-container .task-container-inner .task .task-checkbox .text {\n              display: inline-block;\n              position: relative;\n              left: 50%;\n              top: 50%;\n              -webkit-transform: translate(-50%, -50%);\n                      transform: translate(-50%, -50%);\n              -webkit-user-select: none;\n                 -moz-user-select: none;\n                  -ms-user-select: none;\n                      user-select: none;\n              font-size: 18px;\n              -webkit-transform: translate(-50%, calc(-50% - 1.5px));\n                      transform: translate(-50%, calc(-50% - 1.5px)); }\n\n@media (max-width: 786px) {\n                .container .task-section .task-container .task-container-inner .task .task-checkbox .text {\n                  font-size: 14px; } }\n\n.container .task-section .task-container .task-container-inner .task .task-details.completed .text .task-name {\n            text-decoration: line-through;\n            opacity: 0.25; }\n\n.container .task-section .task-container .task-container-inner .task .task-details .text {\n            display: inline-block;\n            position: relative;\n            left: 16px;\n            top: 50%;\n            -webkit-transform: translateY(-50%);\n                    transform: translateY(-50%);\n            -webkit-user-select: none;\n               -moz-user-select: none;\n                -ms-user-select: none;\n                    user-select: none;\n            font-size: 18px;\n            left: 0; }\n\n@media (max-width: 786px) {\n              .container .task-section .task-container .task-container-inner .task .task-details .text {\n                font-size: 14px; } }\n\n.container .task-section .task-container .task-container-inner .task .task-details .text .other-stuff {\n              font-size: 14px;\n              opacity: 0.25; }\n\n.container .task-details-section {\n    display: -ms-grid;\n    display: grid;\n    -ms-grid-rows: 216px auto;\n        grid-template-rows: 216px auto; }\n\n@media (max-width: 786px) {\n      .container .task-details-section {\n        -ms-grid-rows: 168px auto;\n            grid-template-rows: 168px auto; } }\n\n.container .task-details-section.hide-top-tile {\n      -ms-grid-rows: auto;\n          grid-template-rows: auto; }\n\n.container .task-details-section .top-tile {\n      box-sizing: border-box;\n      background: linear-gradient(135deg, #242424 0%, #1a1919 100%);\n      display: -ms-grid;\n      display: grid;\n          -ms-grid-rows: (72px)[3];\n          grid-template-rows: repeat(3, 72px);\n          -ms-grid-columns: (1fr)[2];\n          grid-template-columns: repeat(2, 1fr);\n          grid-template-areas: \"name name\"\r \"date date\"\r \"completed urgent\"; }\n\n@media (max-width: 786px) {\n        .container .task-details-section .top-tile {\n          -ms-grid-rows: (56px)[3];\n              grid-template-rows: repeat(3, 56px); } }\n\n.container .task-details-section ::-webkit-input-placeholder {\n      color: rgba(204, 204, 204, 0.25); }\n\n.container .task-details-section ::-ms-input-placeholder {\n      color: rgba(204, 204, 204, 0.25); }\n\n.container .task-details-section ::placeholder {\n      color: rgba(204, 204, 204, 0.25); }\n\n.container .task-details-section .task-name {\n      -ms-grid-row: 1;\n      -ms-grid-column: 1;\n      -ms-grid-column-span: 2;\n      grid-area: name; }\n\n.container .task-details-section .task-date {\n      -ms-grid-row: 2;\n      -ms-grid-column: 1;\n      -ms-grid-column-span: 2;\n      grid-area: date; }\n\n.container .task-details-section .task-completed {\n      -ms-grid-row: 3;\n      -ms-grid-column: 1;\n      grid-area: completed; }\n\n.container .task-details-section .task-urgent {\n      -ms-grid-row: 3;\n      -ms-grid-column: 2;\n      grid-area: urgent; }\n\n@media (min-width: 786px) {\n      .container .task-details-section .task-name,\n      .container .task-details-section .task-date,\n      .container .task-details-section .task-completed,\n      .container .task-details-section .task-urgent {\n        cursor: pointer; }\n        .container .task-details-section .task-name:hover,\n        .container .task-details-section .task-date:hover,\n        .container .task-details-section .task-completed:hover,\n        .container .task-details-section .task-urgent:hover {\n          background: linear-gradient(135deg, #073740 0%, #052329 100%); }\n        .container .task-details-section .task-name:active,\n        .container .task-details-section .task-date:active,\n        .container .task-details-section .task-completed:active,\n        .container .task-details-section .task-urgent:active {\n          background: linear-gradient(135deg, #062f37 0%, #041b20 100%); } }\n\n.container .task-details-section .task-name.active,\n    .container .task-details-section .task-date.active,\n    .container .task-details-section .task-completed.active,\n    .container .task-details-section .task-urgent.active {\n      background: linear-gradient(135deg, #062f37 0%, #041b20 100%); }\n\n.container .task-details-section .task-name .text,\n    .container .task-details-section .task-date .text {\n      display: inline-block;\n      position: relative;\n      left: 16px;\n      top: 50%;\n      -webkit-transform: translateY(-50%);\n              transform: translateY(-50%);\n      -webkit-user-select: none;\n         -moz-user-select: none;\n          -ms-user-select: none;\n              user-select: none;\n      font-size: 18px; }\n\n@media (max-width: 786px) {\n        .container .task-details-section .task-name .text,\n        .container .task-details-section .task-date .text {\n          font-size: 14px; } }\n\n.container .task-details-section .task-date.invalid .text {\n      color: #e6bf00 !important; }\n\n.container .task-details-section .task-completed .text,\n    .container .task-details-section .task-urgent .text {\n      pointer-events: none; }\n\n.container .task-details-section .task-completed .text:not(.left),\n      .container .task-details-section .task-urgent .text:not(.left) {\n        display: inline-block;\n        position: relative;\n        left: 50%;\n        top: 50%;\n        -webkit-transform: translate(-50%, -50%);\n                transform: translate(-50%, -50%);\n        -webkit-user-select: none;\n           -moz-user-select: none;\n            -ms-user-select: none;\n                user-select: none;\n        font-size: 18px; }\n\n@media (max-width: 786px) {\n          .container .task-details-section .task-completed .text:not(.left),\n          .container .task-details-section .task-urgent .text:not(.left) {\n            font-size: 14px; } }\n\n.container .task-details-section .task-completed .text.left,\n      .container .task-details-section .task-urgent .text.left {\n        display: inline-block;\n        position: relative;\n        left: 16px;\n        top: 50%;\n        -webkit-transform: translateY(-50%);\n                transform: translateY(-50%);\n        -webkit-user-select: none;\n           -moz-user-select: none;\n            -ms-user-select: none;\n                user-select: none;\n        font-size: 18px; }\n\n@media (max-width: 786px) {\n          .container .task-details-section .task-completed .text.left,\n          .container .task-details-section .task-urgent .text.left {\n            font-size: 14px; } }\n\n.container .task-details-section .task-completed .text.good,\n      .container .task-details-section .task-urgent .text.good {\n        color: #009900; }\n\n.container .task-details-section .task-completed .text.bad,\n      .container .task-details-section .task-urgent .text.bad {\n        color: #e60000; }\n\n.container .task-details-section .task-urgent .text.left {\n      left: 0px; }\n\n.container .task-details-section .task-desc {\n      box-sizing: border-box;\n      background: linear-gradient(135deg, #242424 0%, #1a1919 100%); }\n\n@media (min-width: 786px) {\n        .container .task-details-section .task-desc {\n          cursor: pointer; }\n          .container .task-details-section .task-desc:hover {\n            background: linear-gradient(135deg, #073740 0%, #052329 100%); }\n          .container .task-details-section .task-desc:active {\n            background: linear-gradient(135deg, #062f37 0%, #041b20 100%); } }\n\n.container .task-details-section .task-desc.active {\n        background: linear-gradient(135deg, #062f37 0%, #041b20 100%); }\n\n.container .task-details-section .task-desc .text {\n        font-size: 18px; }\n\n@media (max-width: 786px) {\n          .container .task-details-section .task-desc .text {\n            font-size: 14px; } }\n\n.container .task-details-section .task-desc span.text {\n        display: inline-block;\n        margin: 16px;\n        -webkit-user-select: none;\n           -moz-user-select: none;\n            -ms-user-select: none;\n                user-select: none;\n        white-space: pre-line; }\n\n.container .task-details-section .task-desc textarea.text {\n        width: 100%;\n        height: 100%;\n        padding: 16px;\n        box-sizing: border-box;\n        background: transparent;\n        border: 0;\n        outline: 0; }\n"

/***/ }),

/***/ "./src/app/components/task-list/task-list.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/components/task-list/task-list.component.ts ***!
  \*************************************************************/
/*! exports provided: TaskListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskListComponent", function() { return TaskListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/http.service */ "./src/app/services/http.service.ts");
/* harmony import */ var _services_screen_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/screen.service */ "./src/app/services/screen.service.ts");
/* harmony import */ var _services_navbar_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/navbar.service */ "./src/app/services/navbar.service.ts");
/* harmony import */ var _services_string_util_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/string-util.service */ "./src/app/services/string-util.service.ts");
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TaskListComponent = /** @class */ (function () {
    function TaskListComponent(httpService, stringUtilService, screenService, navbarService) {
        this.httpService = httpService;
        this.stringUtilService = stringUtilService;
        this.screenService = screenService;
        this.navbarService = navbarService;
        this.taskLists = [];
        this.listSelected = false;
        this.taskSelected = false;
        this.focusedInput = "";
        this.defaultTaskListName = "<New Task List>";
        this.defaultTaskName = "<New Task>";
        this.listSymbol = "☰";
        this.checkSymbol = "x";
        this.saveDelay = 2500;
        this.navbarExtensionOwner = "task-list";
    }
    Object.defineProperty(TaskListComponent.prototype, "curTaskList", {
        // Convenience
        get: function () {
            return this.taskLists[this.curListIndex];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskListComponent.prototype, "curTaskListId", {
        get: function () {
            var taskList = this.curTaskList;
            if (!taskList)
                return;
            return taskList._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskListComponent.prototype, "curTask", {
        get: function () {
            if (!this.curTaskList)
                return;
            return this.curTaskList.tasks[this.curTaskIndex];
        },
        set: function (val) {
            this.curTaskList.tasks[this.curTaskIndex] = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskListComponent.prototype, "curTaskId", {
        get: function () {
            var task = this.curTask;
            if (!task)
                return;
            return task._id;
        },
        enumerable: true,
        configurable: true
    });
    // Lifecycle
    TaskListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getTaskLists();
        this.navbarExtensionClickedSub =
            this.navbarService.extensionClicked
                .subscribe(function (e) {
                _this.onExtensionClicked(e);
            });
    };
    TaskListComponent.prototype.ngOnDestroy = function () {
        this.navbarExtensionClickedSub.unsubscribe();
    };
    TaskListComponent.prototype.findTaskListIndexById = function (listId) {
        return this.taskLists
            .findIndex(function (tl) { return tl._id == listId; });
    };
    TaskListComponent.prototype.findTaskIndexById = function (listIndex, taskId) {
        if (listIndex == -1)
            return -1;
        return this.taskLists[listIndex].tasks
            .findIndex(function (t) { return t._id == taskId; });
    };
    TaskListComponent.prototype.onInputFocus = function (detail, input, clearTaskFocus) {
        var _this = this;
        if (clearTaskFocus === void 0) { clearTaskFocus = false; }
        if (clearTaskFocus) {
            this.curTaskIndex = null;
            this.taskSelected = false;
        }
        setTimeout(function () {
            _this.focusedInput = detail;
            setTimeout(function () {
                input.focus();
            });
        });
    };
    TaskListComponent.prototype.onInputBlur = function () {
        this.focusedInput = "";
    };
    // Navbar
    TaskListComponent.prototype.setNavbarExtensions = function () {
        var list = this.curTaskList;
        var listName = list && list.name;
        var task = this.curTask;
        var taskName = task && task.name;
        this.navbarService
            .setExtensions(this.navbarExtensionOwner, [
            this.listSelected && (listName || "<Untitled>"),
            this.taskSelected && (taskName || "<Untitled>")
        ]);
    };
    TaskListComponent.prototype.onExtensionClicked = function (e) {
        if (e.owner != this.navbarExtensionOwner)
            return;
        switch (e.index) {
            case -1:
                this.curListIndex = null;
                this.listSelected = false;
            case 0:
                this.curTaskIndex = null;
                this.taskSelected = false;
                break;
        }
        this.setNavbarExtensions();
    };
    // Task Lists
    TaskListComponent.prototype.createTaskList = function (name) {
        var _this = this;
        this.httpService.createTaskList({ name: name })
            .subscribe(function (response) {
            if (!response.success) {
                alert("Failed to create task list.");
                return;
            }
            _this.taskLists.push(response.taskList);
            _this.onSelectTaskList(_this.taskLists.length - 1);
        });
    };
    TaskListComponent.prototype.getTaskLists = function () {
        var _this = this;
        this.httpService.getTaskLists()
            .subscribe(function (res) {
            if (!res.success) {
                alert("Failed to fetch task lists.");
                return;
            }
            _this.taskLists = res.taskLists
                .map(function (tl) {
                return __assign({}, tl, { tasks: [] });
            });
        });
    };
    TaskListComponent.prototype.updateTaskList = function (req) {
        this.httpService.updateTaskList(req)
            .subscribe(function (res) {
            if (!res.success)
                alert("Failed to update task list.");
        });
    };
    TaskListComponent.prototype.deleteTaskList = function (listId) {
        var _this = this;
        this.httpService.deleteTaskList({ listId: listId })
            .subscribe(function (res) {
            if (!res.success) {
                alert("Failed to delete task list.");
                return;
            }
            _this.curListIndex = null;
            _this.listSelected = false;
            var listIndex = _this.findTaskListIndexById(listId);
            _this.taskLists.splice(listIndex, 1);
            _this.setNavbarExtensions();
        });
    };
    TaskListComponent.prototype.onCreateTaskList = function () {
        if (!this.taskLists)
            return;
        var name = this.defaultTaskListName;
        var otherNames = this.taskLists.map(function (tl) { return tl.name; });
        name = this.stringUtilService.makeUnique(name, otherNames);
        this.createTaskList(name);
    };
    TaskListComponent.prototype.onSelectTaskList = function (index) {
        this.curListIndex = index;
        this.listSelected = true;
        this.setNavbarExtensions();
        var listId = this.curTaskListId;
        if (listId == null)
            return;
        this.getTasks(listId);
    };
    TaskListComponent.prototype.onDeleteTaskList = function () {
        if (!this.listSelected)
            return;
        var list = this.taskLists[this.curListIndex];
        if (!list)
            return;
        this.deleteTaskList(list._id);
        this.setNavbarExtensions();
    };
    TaskListComponent.prototype.onTaskListDetailsModified = function () {
        var _this = this;
        this.setNavbarExtensions();
        clearTimeout(this.taskListDetailsModifiedTimeout);
        var taskList = __assign({}, this.curTaskList);
        if (!taskList.name.trim()) {
            taskList.name = "<Untitled List>";
        }
        this.taskListDetailsModifiedTimeout =
            setTimeout(function () {
                _this.updateTaskList({
                    listId: taskList._id,
                    name: taskList.name,
                    description: taskList.description
                });
            }, this.saveDelay);
    };
    // Tasks
    TaskListComponent.prototype.createTask = function (listId, name) {
        var _this = this;
        this.httpService.createTask({ listId: listId, name: name })
            .subscribe(function (res) {
            if (!res.success) {
                alert("Failed to create task.");
                return;
            }
            var taskList = _this.taskLists
                .find(function (tl) { return tl._id == listId; });
            taskList.tasks.unshift(res.task);
        });
    };
    TaskListComponent.prototype.getTasks = function (listId) {
        var _this = this;
        this.httpService.getTasks({ listId: listId })
            .subscribe(function (res) {
            if (!res.success) {
                alert("Failed to get tasks.");
                return;
            }
            var taskList = _this.taskLists.find(function (tl) { return tl._id == listId; });
            taskList.tasks = res.tasks;
        });
    };
    TaskListComponent.prototype.updateTask = function (req) {
        this.httpService.updateTask(req)
            .subscribe(function (res) {
            if (!res.success)
                alert("Failed to update task.");
        });
    };
    TaskListComponent.prototype.deleteTask = function (listId, taskId) {
        var _this = this;
        this.httpService.deleteTask({ listId: listId, taskId: taskId })
            .subscribe(function (res) {
            if (!res.success) {
                alert("Failed to delete task.");
                return;
            }
            var listIndex = _this.findTaskListIndexById(listId);
            if (listIndex == -1)
                return;
            var taskIndex = _this.findTaskIndexById(listIndex, taskId);
            if (taskIndex == -1)
                return;
            _this.taskLists[listIndex].tasks.splice(taskIndex, 1);
        });
    };
    TaskListComponent.prototype.onCreateTask = function () {
        var listId = this.curTaskListId;
        if (!listId)
            return;
        var name = this.defaultTaskName;
        var otherNames = this.curTaskList.tasks.map(function (t) { return t.name; });
        name = this.stringUtilService.makeUnique(name, otherNames);
        this.createTask(listId, name);
    };
    TaskListComponent.prototype.onDeleteTask = function () {
        var listId = this.curTaskListId;
        var taskId = this.curTaskId;
        this.curTaskIndex = null;
        this.taskSelected = false;
        this.deleteTask(listId, taskId);
        this.setNavbarExtensions();
    };
    TaskListComponent.prototype.onSelectTask = function (index) {
        this.curTaskIndex = index;
        this.taskSelected = true;
        this.setNavbarExtensions();
    };
    TaskListComponent.prototype.onCheckTask = function (index) {
        if (!this.listSelected)
            return;
        var task = this.curTaskList.tasks[index];
        task.completed = !task.completed;
        this.onTaskDetailsModified();
    };
    TaskListComponent.prototype.onToggleTaskProp = function (prop) {
        if (!this.taskSelected)
            return;
        this.curTask[prop] = !this.curTask[prop];
        this.curTask = __assign({}, this.curTask);
    };
    TaskListComponent.prototype.onTaskDetailsModified = function () {
        var _this = this;
        this.setNavbarExtensions();
        clearTimeout(this.taskDetailsModifiedTimeout);
        var listId = this.curTaskListId;
        var task = __assign({}, this.curTask);
        if (!task.name.trim()) {
            task.name = "<Untitled Task>";
        }
        this.taskDetailsModifiedTimeout =
            setTimeout(function () {
                _this.updateTask({
                    listId: listId,
                    taskId: task._id,
                    name: task.name,
                    description: task.description,
                    date: task.date,
                    completed: task.completed,
                    urgent: task.urgent
                });
            }, this.saveDelay);
    };
    TaskListComponent.prototype.dateValid = function (dateStr) {
        if (!dateStr || !dateStr.trim())
            return true;
        var date = new Date(dateStr);
        return date.getTime() === date.getTime();
    };
    TaskListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-task-list',
            template: __webpack_require__(/*! ./task-list.component.html */ "./src/app/components/task-list/task-list.component.html"),
            styles: [__webpack_require__(/*! ./task-list.component.scss */ "./src/app/components/task-list/task-list.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"],
            _services_string_util_service__WEBPACK_IMPORTED_MODULE_4__["StringUtilService"],
            _services_screen_service__WEBPACK_IMPORTED_MODULE_2__["ScreenService"],
            _services_navbar_service__WEBPACK_IMPORTED_MODULE_3__["NavbarService"]])
    ], TaskListComponent);
    return TaskListComponent;
}());



/***/ }),

/***/ "./src/app/components/tool-selector/tool-selector.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/components/tool-selector/tool-selector.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"tool\" (click)=\"navigateTo('tasks')\">\r\n    <div class=\"text\">Task List</div>\r\n</div>\r\n\r\n<div class=\"tool\">\r\n    <div class=\"text placeholder\">Intake Log</div>\r\n</div>\r\n\r\n<div class=\"tool\">\r\n    <div class=\"text placeholder\">Prescriptions</div>\r\n</div>\r\n\r\n<div class=\"tool\">\r\n    <div class=\"text placeholder\">Inscriptions</div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/components/tool-selector/tool-selector.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/components/tool-selector/tool-selector.component.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  position: absolute;\n  left: 0;\n  top: 72px;\n  width: 100%;\n  height: calc(100% - 72px);\n  font-size: 0;\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-rows: 1fr 1fr;\n      grid-template-rows: 1fr 1fr;\n  -ms-grid-columns: 1fr 1fr;\n      grid-template-columns: 1fr 1fr; }\n  @media (max-width: 786px) {\n    :host {\n      top: 56px;\n      height: calc(100% - 56px); } }\n  @media (max-width: 786px) {\n    :host {\n      -ms-grid-rows: 1fr 1fr 1fr 1fr;\n          grid-template-rows: 1fr 1fr 1fr 1fr;\n      -ms-grid-columns: 1fr;\n          grid-template-columns: 1fr; } }\n  :host .tool {\n    box-sizing: border-box;\n    background: linear-gradient(135deg, #242424 0%, #1a1919 100%); }\n  @media (min-width: 786px) {\n      :host .tool {\n        cursor: pointer; }\n        :host .tool:hover {\n          background: linear-gradient(135deg, #073740 0%, #052329 100%); }\n        :host .tool:active {\n          background: linear-gradient(135deg, #062f37 0%, #041b20 100%); } }\n  :host .tool .text {\n      display: inline-block;\n      position: relative;\n      left: 50%;\n      top: 50%;\n      -webkit-transform: translate(-50%, -50%);\n              transform: translate(-50%, -50%);\n      -webkit-user-select: none;\n         -moz-user-select: none;\n          -ms-user-select: none;\n              user-select: none;\n      font-size: 18px; }\n  @media (max-width: 786px) {\n        :host .tool .text {\n          font-size: 14px; } }\n  :host .tool .text.placeholder {\n        opacity: 0.4; }\n"

/***/ }),

/***/ "./src/app/components/tool-selector/tool-selector.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/components/tool-selector/tool-selector.component.ts ***!
  \*********************************************************************/
/*! exports provided: ToolSelectorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolSelectorComponent", function() { return ToolSelectorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ToolSelectorComponent = /** @class */ (function () {
    function ToolSelectorComponent(router) {
        this.router = router;
    }
    ToolSelectorComponent.prototype.navigateTo = function (path) {
        this.router.navigateByUrl(path);
    };
    ToolSelectorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-tool-selector',
            template: __webpack_require__(/*! ./tool-selector.component.html */ "./src/app/components/tool-selector/tool-selector.component.html"),
            styles: [__webpack_require__(/*! ./tool-selector.component.scss */ "./src/app/components/tool-selector/tool-selector.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], ToolSelectorComponent);
    return ToolSelectorComponent;
}());



/***/ }),

/***/ "./src/app/services/http.interceptor.ts":
/*!**********************************************!*\
  !*** ./src/app/services/http.interceptor.ts ***!
  \**********************************************/
/*! exports provided: PasscodeInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasscodeInterceptor", function() { return PasscodeInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app.globals */ "./src/app/app.globals.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PasscodeInterceptor = /** @class */ (function () {
    function PasscodeInterceptor(globals) {
        this.globals = globals;
    }
    PasscodeInterceptor.prototype.intercept = function (_req, next) {
        var req = _req.clone({ setHeaders: {
                "B-PASSCODE": this.globals.passcode,
                "B-KEY-NAME": this.globals.keyName,
                "B-KEY": this.globals.key
            } });
        return next.handle(req);
    };
    PasscodeInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_app_globals__WEBPACK_IMPORTED_MODULE_1__["Globals"]])
    ], PasscodeInterceptor);
    return PasscodeInterceptor;
}());



/***/ }),

/***/ "./src/app/services/http.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/http.service.ts ***!
  \******************************************/
/*! exports provided: HttpService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpService", function() { return HttpService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _shared_routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/routes */ "../shared/routes.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HttpService = /** @class */ (function () {
    function HttpService(httpClient) {
        this.httpClient = httpClient;
    }
    // Authentication
    HttpService.prototype.authenticate = function (code) {
        return this.httpClient
            .post(_shared_routes__WEBPACK_IMPORTED_MODULE_3__["Routes"].authenticate, { code: code })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1));
    };
    // Task Lists
    HttpService.prototype.createTaskList = function (req) {
        return this.httpClient
            .post(_shared_routes__WEBPACK_IMPORTED_MODULE_3__["Routes"].createTaskList, req)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1));
    };
    HttpService.prototype.getTaskLists = function () {
        return this.httpClient
            .post(_shared_routes__WEBPACK_IMPORTED_MODULE_3__["Routes"].getTaskLists, {})
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1));
    };
    HttpService.prototype.updateTaskList = function (req) {
        return this.httpClient
            .post(_shared_routes__WEBPACK_IMPORTED_MODULE_3__["Routes"].updateTaskList, req)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1));
    };
    HttpService.prototype.deleteTaskList = function (req) {
        return this.httpClient
            .post(_shared_routes__WEBPACK_IMPORTED_MODULE_3__["Routes"].deleteTaskList, req)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1));
    };
    // Tasks
    HttpService.prototype.createTask = function (req) {
        return this.httpClient
            .post(_shared_routes__WEBPACK_IMPORTED_MODULE_3__["Routes"].createTask, req)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1));
    };
    HttpService.prototype.getTasks = function (req) {
        return this.httpClient
            .post(_shared_routes__WEBPACK_IMPORTED_MODULE_3__["Routes"].getTasks, req)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1));
    };
    HttpService.prototype.updateTask = function (req) {
        return this.httpClient
            .post(_shared_routes__WEBPACK_IMPORTED_MODULE_3__["Routes"].updateTask, req)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1));
    };
    HttpService.prototype.deleteTask = function (req) {
        return this.httpClient
            .post(_shared_routes__WEBPACK_IMPORTED_MODULE_3__["Routes"].deleteTask, req)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1));
    };
    HttpService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], HttpService);
    return HttpService;
}());



/***/ }),

/***/ "./src/app/services/navbar.service.ts":
/*!********************************************!*\
  !*** ./src/app/services/navbar.service.ts ***!
  \********************************************/
/*! exports provided: NavbarService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarService", function() { return NavbarService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NavbarService = /** @class */ (function () {
    function NavbarService() {
        this.extensionClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.extensions = [];
    }
    NavbarService.prototype.setExtensions = function (owner, exts) {
        this.owner = owner;
        if (!exts)
            return;
        var extensions = [];
        for (var _i = 0, exts_1 = exts; _i < exts_1.length; _i++) {
            var ext = exts_1[_i];
            if (!ext)
                break;
            extensions.push(ext);
        }
        this.extensions = extensions;
    };
    NavbarService.prototype.triggerClickEvent = function (index) {
        this.extensionClicked.emit({
            index: index,
            extensions: this.extensions,
            owner: this.owner
        });
    };
    NavbarService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], NavbarService);
    return NavbarService;
}());



/***/ }),

/***/ "./src/app/services/screen.service.ts":
/*!********************************************!*\
  !*** ./src/app/services/screen.service.ts ***!
  \********************************************/
/*! exports provided: ScreenService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScreenService", function() { return ScreenService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ScreenService = /** @class */ (function () {
    function ScreenService() {
        this.width = 1920;
        this.height = 1080;
    }
    Object.defineProperty(ScreenService.prototype, "mobile", {
        get: function () {
            return this.width <= 768;
        },
        enumerable: true,
        configurable: true
    });
    ScreenService.prototype.setScreenSize = function (w, h) {
        this.width = w;
        this.height = h;
    };
    ScreenService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], ScreenService);
    return ScreenService;
}());



/***/ }),

/***/ "./src/app/services/string-util.service.ts":
/*!*************************************************!*\
  !*** ./src/app/services/string-util.service.ts ***!
  \*************************************************/
/*! exports provided: StringUtilService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StringUtilService", function() { return StringUtilService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var StringUtilService = /** @class */ (function () {
    function StringUtilService() {
    }
    StringUtilService.prototype.makeUnique = function (name, otherNames) {
        var suffix = "";
        var _makeUnique = function (otherNames) {
            for (var _i = 0, otherNames_1 = otherNames; _i < otherNames_1.length; _i++) {
                var otherName = otherNames_1[_i];
                if (otherName.startsWith(name)) {
                    if (!suffix)
                        suffix = " (2)";
                    if (otherName.endsWith(suffix)) {
                        var num = suffix.substr(2, suffix.length - 1);
                        suffix = " (" + (parseInt(num) + 1) + ")";
                    }
                }
            }
        };
        _makeUnique(otherNames);
        _makeUnique(otherNames.reverse());
        return name + suffix;
    };
    StringUtilService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], StringUtilService);
    return StringUtilService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\db\Projects\brain\client\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map