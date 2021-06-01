(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["NetCollect"] = factory();
	else
		root["NetCollect"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var NetCollect = (function () {
    function NetCollect(config) {
        this._msgQueue = [];
        this._timer = 0;
        this._breadcrumbs = [];
        this._enabled = true;
        this.version = "1.0.0";
        this.pageId = '';
        if (!config) {
            throw new Error('Invalid config');
        }
        if (!config.key) {
            throw new Error('Invalid config key');
        }
        if (!config.clientStart) {
            throw new Error('Invalid config clientStart');
        }
        if (!config.reportUrl) {
            config.reportUrl = '//192.168.44.125:7020';
        }
        config.uid = config.uid || '';
        config.env = config.env || 'dev';
        config.interval = config.interval || 3000;
        this.config = config;
        this.initCollector();
    }
    NetCollect.prototype.autofillUrl = function (url) {
        if (url[0] === '/') {
            if (url[1] === '/') {
                return location.protocol + url;
            }
            else {
                return location.protocol + '//' + location.host + url;
            }
        }
        else {
            return url;
        }
    };
    NetCollect.prototype.performanceNow = function () {
        return window.performance && typeof window.performance.now === 'function'
            ? ~~window.performance.now()
            : +new Date() - this.config.clientStart;
    };
    NetCollect.prototype.pushApiLog = function (log, xhr) {
        if (!this._enabled)
            return;
        this._msgQueue.push({
            type: 'api',
            level: 'log',
            data: {
                method: log.method,
                url: this.autofillUrl(log.url),
                status: xhr.status,
                duration: log.end ? log.end - log.start : 0,
                script: log.script ? log.script - log.end : 0,
                code: log.code,
            }
        });
    };
    NetCollect.prototype.pushErrorLog = function (name, err) {
        if (!this._enabled)
            return;
        this._msgQueue.push({
            type: 'error',
            level: 'error',
            name: name,
            data: {
                breadcrumbs: this._breadcrumbs.slice(),
                message: err.message || '',
                stack: err.stack || '',
                line: err.lineno || 0,
                col: err.colno || 0,
                source: err.filename || '',
            }
        });
        if (this.pageId) {
            this.flush();
        }
    };
    NetCollect.prototype.pushWarnLog = function (name, warn) {
        if (!this._enabled)
            return;
        this._msgQueue.push({
            type: 'warn',
            level: 'warn',
            name: name,
            data: {
                breadcrumbs: this._breadcrumbs.slice(),
                message: warn.message || '',
                stack: warn.stack || '',
                line: warn.lineno || 0,
                col: warn.colno || 0,
                source: warn.filename || '',
            }
        });
        if (this.pageId) {
            this.flush();
        }
    };
    NetCollect.prototype.pushPerformanceLog = function (t) {
        if (!this._enabled)
            return;
        this._msgQueue.push({
            type: 'performance',
            level: 'log',
            data: {
                redirect: t.redirectEnd ? t.redirectEnd - t.navigationStart : 0,
                appCache: t.domainLookupStart - t.fetchStart,
                dns: t.domainLookupEnd - t.domainLookupStart,
                tcp: t.connectEnd - t.connectStart,
                request: t.responseStart - t.requestStart,
                ttfb: t.responseStart - t.navigationStart,
                response: t.responseEnd - t.responseStart,
                domInteractive: t.domInteractive - t.navigationStart,
                domReady: t.domComplete ? t.domComplete - t.navigationStart : 0,
                load: t.loadEventEnd ? t.loadEventEnd - t.navigationStart : 0,
                sh: window.screen.height,
                sw: window.screen.width,
                cw: document.documentElement.clientWidth,
                ch: document.documentElement.clientHeight,
                referrer: document.referrer || document.URL,
            }
        });
    };
    NetCollect.prototype.initPageId = function () {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4)
                return;
            if (xhr.status !== 200) {
                _this._enabled = false;
                return;
            }
            if (xhr.responseText) {
                _this.pageId = xhr.responseText || '';
                if (!_this.pageId) {
                    _this._enabled = false;
                    return;
                }
                _this._timer = window.setTimeout(function () { return _this.flush(); }, _this.config.interval);
            }
        };
        xhr.open('POST', this.config.reportUrl + "/api/pageId/" + this.config.key + "?__ignoreCollector", true);
        xhr.send();
    };
    NetCollect.prototype.initCollector = function () {
        var _this = this;
        if (NetCollect._initedMonitor) {
            console.warn('initMonitor can only be initialized once.');
            return;
        }
        NetCollect._initedMonitor = true;
        var c = this.config;
        if (c.enabled === false) {
            this._enabled = false;
            return;
        }
        var that = this;
        this.initPageId();
        if (XMLHttpRequest && XMLHttpRequest.prototype) {
            var _open_1 = XMLHttpRequest.prototype.open;
            XMLHttpRequest.prototype.open = function (method, url) {
                var rest = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    rest[_i - 2] = arguments[_i];
                }
                this.__collectData = { method: method, url: url };
                _open_1.apply(this, arguments);
            };
            var _send_1 = XMLHttpRequest.prototype.send;
            XMLHttpRequest.prototype.send = function (args) {
                this.__collectData.start = that.performanceNow();
                if (this.__collectData.url.indexOf('__ignoreCollector') === -1) {
                    var _onreadystatechange_1 = this.onreadystatechange;
                    if (this.readyState === 4) {
                        this.__collectData.end = that.performanceNow();
                        that.pushApiLog(this.__collectData, this);
                    }
                    else {
                        this.onreadystatechange = function () {
                            if (this.readyState === 4) {
                                this.__collectData.end = that.performanceNow();
                                if (_onreadystatechange_1) {
                                    _onreadystatechange_1.apply(this, arguments);
                                    this.__collectData.script = that.performanceNow();
                                }
                                this.__collectData.code = (that.config.extractApiCode ? that.config.extractApiCode(this) || '' : '') + '';
                                that.pushApiLog(this.__collectData, this);
                            }
                            else {
                                if (this.readyState === 3 && that.performanceNow() - this.__collectData.start > 20000) {
                                    that.pushWarnLog('Long Request', { message: "The request '" + this.__collectData.url + "' lasted " + (that.performanceNow() - this.__collectData.start) + " ms" });
                                }
                                if (_onreadystatechange_1) {
                                    _onreadystatechange_1.apply(this, arguments);
                                }
                            }
                        };
                    }
                }
                _send_1.apply(this, arguments);
            };
        }
        if (!window.addEventListener)
            return;
        window.addEventListener('error', function (event) {
            _this.pushErrorLog('error', event);
        });
        window.addEventListener('unhandledrejection', function (event) {
            if (!event.reason)
                return;
            _this.pushErrorLog('unhandledRejection', typeof event.reason === 'string' ? { message: event.reason } : event.reason);
        });
        window.addEventListener('beforeunload', function () {
            _this.flush();
        });
        if (c.Vue) {
            var Vue = c.Vue;
            var defaultErrorHandler_1 = Vue.config.errorHandler;
            Vue.config.errorHandler = function (err, vm, info) {
                var rest = [];
                for (var _i = 3; _i < arguments.length; _i++) {
                    rest[_i - 3] = arguments[_i];
                }
                _this.pushErrorLog('VueError', err);
                var handled = null;
                if (typeof defaultErrorHandler_1 === 'function') {
                    handled = defaultErrorHandler_1.apply(void 0, __spreadArrays([err, vm, info], rest));
                }
                return handled;
            };
        }
        this.performance();
    };
    NetCollect.prototype.updateConfig = function (config) {
        this.config = Object.assign(this.config, config);
    };
    NetCollect.prototype.send = function () {
        if (!this._enabled) {
            this._msgQueue = [];
            return;
        }
        while (this._msgQueue.length) {
            var logs = this._msgQueue.splice(0, 10);
            var url = this.config.reportUrl + "/api/log/" + this.config.key + "?__ignoreCollector";
            var data = JSON.stringify({
                uid: this.config.uid || '',
                env: this.config.env || 'dev',
                pageId: this.pageId,
                logs: logs
            });
            if (navigator.sendBeacon) {
                navigator.sendBeacon(url, data);
            }
            else {
                var xhr = new XMLHttpRequest();
                xhr.open('POST', url, true);
                xhr.send(data);
            }
        }
    };
    NetCollect.prototype.flush = function () {
        var _this = this;
        clearTimeout(this._timer);
        this.send();
        this._timer = window.setTimeout(function () { return _this.flush(); }, this.config.interval);
    };
    NetCollect.prototype.data = function (name, data, level) {
        if (data === void 0) { data = {}; }
        if (level === void 0) { level = 'log'; }
        this._msgQueue.push({
            type: 'data',
            level: level,
            name: name,
            data: data,
        });
    };
    NetCollect.prototype.performance = function () {
        var _this = this;
        if (!window.performance)
            return;
        var t = window.performance.timing;
        if (!t)
            return;
        if (t.loadEventEnd) {
            this.pushPerformanceLog(t);
        }
        else {
            window.addEventListener('load', function () {
                setTimeout(function () {
                    _this.pushPerformanceLog(t);
                }, 100);
            });
        }
    };
    NetCollect.prototype.addBreadcrumb = function (breadcrumb) {
        this._breadcrumbs.push(breadcrumb);
    };
    NetCollect._initedMonitor = false;
    return NetCollect;
}());
exports.default = NetCollect;


/***/ })
/******/ ])["default"];
});