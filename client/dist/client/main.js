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
    Routes["submitPasscode"] = "/api/submitPasscode";
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

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-authenticator\r\n*ngIf=\"showAuthenticator\"\r\n(hide)=\"onHideAuthenticator()\">\r\n</app-authenticator>\r\n\r\n<div class=\"content\">\r\n    <app-navbar></app-navbar>\r\n    <router-outlet></router-outlet>\r\n</div>"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host .content {\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-rows: 72px auto;\n      grid-template-rows: 72px auto; }\n"

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
    function AppComponent(globals, router) {
        var _this = this;
        this.globals = globals;
        this.router = router;
        this.showAuthenticator = false;
        router.events.subscribe(function (e) {
            if (e instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"]) {
                if (globals.passcode == "") {
                    _this.showAuthenticator = true;
                }
            }
        });
    }
    AppComponent.prototype.onHideAuthenticator = function () {
        this.showAuthenticator = false;
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [_app_globals__WEBPACK_IMPORTED_MODULE_2__["Globals"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
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
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _components_tool_selector_tool_selector_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/tool-selector/tool-selector.component */ "./src/app/components/tool-selector/tool-selector.component.ts");
/* harmony import */ var _app_routes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.routes */ "./src/app/app.routes.ts");
/* harmony import */ var _components_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/navbar/navbar.component */ "./src/app/components/navbar/navbar.component.ts");
/* harmony import */ var _components_task_list_task_list_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/task-list/task-list.component */ "./src/app/components/task-list/task-list.component.ts");
/* harmony import */ var _components_authenticator_authenticator_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/authenticator/authenticator.component */ "./src/app/components/authenticator/authenticator.component.ts");
/* harmony import */ var _services_http_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./services/http.service */ "./src/app/services/http.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _services_http_interceptor__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./services/http.interceptor */ "./src/app/services/http.interceptor.ts");
/* harmony import */ var _app_globals__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./app.globals */ "./src/app/app.globals.ts");
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
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                _components_tool_selector_tool_selector_component__WEBPACK_IMPORTED_MODULE_4__["ToolSelectorComponent"],
                _components_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_6__["NavbarComponent"],
                _components_task_list_task_list_component__WEBPACK_IMPORTED_MODULE_7__["TaskListComponent"],
                _components_authenticator_authenticator_component__WEBPACK_IMPORTED_MODULE_8__["AuthenticatorComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_10__["HttpClientModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(_app_routes__WEBPACK_IMPORTED_MODULE_5__["AppRoutes"]),
            ],
            providers: [
                _services_http_service__WEBPACK_IMPORTED_MODULE_9__["HttpService"],
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_10__["HTTP_INTERCEPTORS"], useClass: _services_http_interceptor__WEBPACK_IMPORTED_MODULE_11__["PasscodeInterceptor"], multi: true },
                _app_globals__WEBPACK_IMPORTED_MODULE_12__["Globals"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
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

module.exports = ".container {\n  display: block;\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 999;\n  background-color: #1a1919;\n  box-shadow: inset 0 0 8px black;\n  transition: opacity 500ms ease; }\n  .container.hidden {\n    opacity: 0; }\n  .container .keypad {\n    display: -ms-grid;\n    display: grid;\n    -ms-grid-rows: 1fr 1fr 1fr 1fr 1fr;\n        grid-template-rows: 1fr 1fr 1fr 1fr 1fr;\n    -ms-grid-columns: 1fr 1fr 1fr;\n        grid-template-columns: 1fr 1fr 1fr;\n    position: relative;\n    left: 50%;\n    top: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n    width: 240px;\n    height: 400px;\n    box-shadow: 0 0 8px black; }\n  @media (max-width: 786px) {\n      .container .keypad {\n        width: 100%;\n        height: 100%; } }\n  .container .keypad .key .text, .container .keypad .code .text {\n      display: inline-block;\n      position: relative;\n      left: 50%;\n      top: 50%;\n      -webkit-transform: translate(-50%, -50%);\n              transform: translate(-50%, -50%);\n      -webkit-user-select: none;\n         -moz-user-select: none;\n          -ms-user-select: none;\n              user-select: none;\n      font-size: 18px; }\n  .container .keypad .code {\n      box-sizing: border-box;\n      background: linear-gradient(135deg, #242424 0%, #1a1919 100%);\n      grid-column: span 3; }\n  .container .keypad .code .dot {\n        display: inline-block;\n        width: 24px;\n        height: 24px;\n        border-radius: 50%;\n        background-color: #cccccc;\n        opacity: 0.2; }\n  .container .keypad .code .dot + .dot {\n          margin-left: 16px; }\n  .container .keypad .code .dot.opaque {\n          opacity: 1; }\n  .container .keypad .code .dot.waiting {\n          -webkit-animation: \"waiting\" 500ms ease infinite;\n                  animation: \"waiting\" 500ms ease infinite; }\n  @-webkit-keyframes waiting {\n  0% {\n    opacity: 1; }\n  50% {\n    opacity: 0.2; }\n  100% {\n    opacity: 1; } }\n  @keyframes waiting {\n  0% {\n    opacity: 1; }\n  50% {\n    opacity: 0.2; }\n  100% {\n    opacity: 1; } }\n  .container .keypad .code .dot.correct {\n          opacity: 1;\n          background-color: #009900; }\n  .container .keypad .code .dot.incorrect {\n          opacity: 1;\n          background-color: #990000; }\n  .container .keypad .key {\n      box-sizing: border-box;\n      background: linear-gradient(135deg, #242424 0%, #1a1919 100%); }\n  @media (min-width: 786px) {\n        .container .keypad .key {\n          cursor: pointer; }\n          .container .keypad .key:hover {\n            background: linear-gradient(135deg, #073740 0%, #052329 100%); }\n          .container .keypad .key:active {\n            background: linear-gradient(135deg, #062f37 0%, #041b20 100%); } }\n  .container .keypad .key:nth-child(11) {\n        color: #990000; }\n  @media (min-width: 786px) {\n          .container .keypad .key:nth-child(11) {\n            cursor: pointer; }\n            .container .keypad .key:nth-child(11):hover {\n              background: linear-gradient(135deg, #330000 0%, #240000 100%); }\n            .container .keypad .key:nth-child(11):active {\n              background: linear-gradient(135deg, #290000 0%, #1a0000 100%); } }\n  .container .keypad .key:nth-child(13) {\n        color: #009900; }\n  @media (min-width: 786px) {\n          .container .keypad .key:nth-child(13) {\n            cursor: pointer; }\n            .container .keypad .key:nth-child(13):hover {\n              background: linear-gradient(135deg, #003300 0%, #002400 100%); }\n            .container .keypad .key:nth-child(13):active {\n              background: linear-gradient(135deg, #002900 0%, #001a00 100%); } }\n"

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
        this.hide = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
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
            _this.httpService.submitPasscode(code)
                .subscribe(function (res) {
                _this.waiting = false;
                _this.curCode = "";
                if (res.correct) {
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
                _this.hide.emit();
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
    ], AuthenticatorComponent.prototype, "hide", void 0);
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

module.exports = "<div class=\"path\">\n    <span class=\"dir\" (click)=\"navigateTo(-1)\">Tools</span>\n    <span class=\"delim\">&nbsp;>&nbsp;</span>\n\n    <ng-container *ngIf=\"path.length == 0\">\n        <span class=\"hint\">Select a tool...</span>\n    </ng-container>\n\n    <ng-container *ngIf=\"path.length > 0\">\n        <ng-container *ngFor=\"let dir of path; index as index; last as last;\">\n            <span class=\"dir\" (click)=\"navigateTo(index)\">{{ dir }}</span>\n            <span class=\"delim\" *ngIf=\"!last\">&nbsp;>&nbsp;</span>\n        </ng-container>\n    </ng-container>\n</div>\n\n<div class=\"fullscreen\"\n(click)=\"toggleFullscreen()\">\n    <div class=\"fullscreen-inner\">[F]</div>\n</div>"

/***/ }),

/***/ "./src/app/components/navbar/navbar.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/components/navbar/navbar.component.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  box-sizing: border-box;\n  background: linear-gradient(135deg, #242424 0%, #1a1919 100%);\n  position: relative;\n  z-index: 1;\n  box-shadow: 0 0 8px black;\n  display: flex;\n  flex-flow: row nowrap;\n  box-sizing: border-box;\n  padding-left: 16px;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  font-size: 20px; }\n  :host > * {\n    display: inline-block;\n    position: relative;\n    top: 50%;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%); }\n  :host .path {\n    flex: 1;\n    height: -webkit-min-content;\n    height: -moz-min-content;\n    height: min-content; }\n  :host .path .dir {\n      text-transform: capitalize; }\n  :host .path .dir:not(:last-child) {\n        cursor: pointer; }\n  :host .path .dir:last-child {\n        cursor: default; }\n  @media (min-width: 786px) {\n        :host .path .dir:hover:not(:last-child) {\n          text-decoration: underline;\n          color: #008099; } }\n  :host .path .hint {\n      opacity: 0.5; }\n  :host .fullscreen {\n    cursor: pointer;\n    width: 72px; }\n  @media (min-width: 786px) {\n      :host .fullscreen:hover {\n        background: linear-gradient(135deg, #003c47 0%, #00262e 100%); } }\n  :host .fullscreen .fullscreen-inner {\n      display: inline-block;\n      position: relative;\n      left: 50%;\n      top: 50%;\n      -webkit-transform: translate(-50%, -50%);\n              transform: translate(-50%, -50%); }\n"

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
    function NavbarComponent(router) {
        var _this = this;
        this.router = router;
        this.path = [];
        this.fullscreen = false;
        router.events.subscribe(function (e) {
            _this.onRouteChange(e);
        });
    }
    NavbarComponent.prototype.onRouteChange = function (e) {
        if (!(e instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"]))
            return;
        this.path = e.url.substr(1).split("/");
        if (this.path.length == 1 && this.path[0] == "") {
            this.path = [];
        }
    };
    NavbarComponent.prototype.navigateTo = function (index) {
        if (index == -1) {
            this.router.navigate([""]);
            return;
        }
        this.router.navigate(this.path.slice(0, index + 1));
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
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
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

module.exports = "<div class=\"lists\"></div>\n<div class=\"tasks\"></div>\n<div class=\"task-details\"></div>"

/***/ }),

/***/ "./src/app/components/task-list/task-list.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/components/task-list/task-list.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  position: absolute;\n  left: 0;\n  top: 72px;\n  width: 100%;\n  height: calc(100% - 72px);\n  font-size: 0;\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-rows: 1fr;\n      grid-template-rows: 1fr;\n  -ms-grid-columns: 300px auto 330px;\n      grid-template-columns: 300px auto 330px; }\n  :host .lists {\n    box-sizing: border-box;\n    background: linear-gradient(135deg, #242424 0%, #1a1919 100%);\n    display: flex;\n    flex-flow: column nowrap; }\n  :host .tasks {\n    box-sizing: border-box;\n    background: linear-gradient(135deg, #242424 0%, #1a1919 100%); }\n  :host .task-details {\n    box-sizing: border-box;\n    background: linear-gradient(135deg, #242424 0%, #1a1919 100%); }\n"

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
    function TaskListComponent() {
    }
    TaskListComponent.prototype.ngOnInit = function () {
    };
    TaskListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-task-list',
            template: __webpack_require__(/*! ./task-list.component.html */ "./src/app/components/task-list/task-list.component.html"),
            styles: [__webpack_require__(/*! ./task-list.component.scss */ "./src/app/components/task-list/task-list.component.scss")]
        }),
        __metadata("design:paramtypes", [])
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

module.exports = "<div class=\"tool\" (click)=\"navigateTo('tasks')\">\r\n    <div class=\"text\">Task List</div>\r\n</div>\r\n\r\n<div class=\"tool\">\r\n    <div class=\"text\">Intake Log</div>\r\n</div>\r\n\r\n<div class=\"tool\">\r\n    <div class=\"text\">Prescriptions</div>\r\n</div>\r\n\r\n<div class=\"tool\">\r\n    <div class=\"text\">Inscriptions</div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/components/tool-selector/tool-selector.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/components/tool-selector/tool-selector.component.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  position: absolute;\n  left: 0;\n  top: 72px;\n  width: 100%;\n  height: calc(100% - 72px);\n  font-size: 0;\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-rows: 1fr 1fr;\n      grid-template-rows: 1fr 1fr;\n  -ms-grid-columns: 1fr 1fr;\n      grid-template-columns: 1fr 1fr; }\n  @media (max-width: 786px) {\n    :host {\n      -ms-grid-rows: 1fr 1fr 1fr 1fr;\n          grid-template-rows: 1fr 1fr 1fr 1fr;\n      -ms-grid-columns: 1fr;\n          grid-template-columns: 1fr; } }\n  :host .tool {\n    box-sizing: border-box;\n    background: linear-gradient(135deg, #242424 0%, #1a1919 100%); }\n  @media (min-width: 786px) {\n      :host .tool {\n        cursor: pointer; }\n        :host .tool:hover {\n          background: linear-gradient(135deg, #073740 0%, #052329 100%); }\n        :host .tool:active {\n          background: linear-gradient(135deg, #062f37 0%, #041b20 100%); } }\n  :host .tool .text {\n      display: inline-block;\n      position: relative;\n      left: 50%;\n      top: 50%;\n      -webkit-transform: translate(-50%, -50%);\n              transform: translate(-50%, -50%);\n      -webkit-user-select: none;\n         -moz-user-select: none;\n          -ms-user-select: none;\n              user-select: none;\n      font-size: 18px; }\n"

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
                "B-PASSCODE": this.globals.passcode
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
    HttpService.prototype.submitPasscode = function (code) {
        return this.httpClient
            .post(_shared_routes__WEBPACK_IMPORTED_MODULE_3__["Routes"].submitPasscode, { code: code })
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