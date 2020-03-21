/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./service/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./service/controller.js":
/*!*******************************!*\
  !*** ./service/controller.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _window = window,
    chrome = _window.chrome,
    WSC = _window.WSC,
    _ = _window._;

var Router = function () {
  function Router() {
    _classCallCheck(this, Router);
  }

  _createClass(Router, null, [{
    key: 'post',
    value: function post(mapping, handle) {
      function HttpHandler() {
        WSC.BaseHandler.prototype.constructor.call(this);
      }

      HttpHandler.prototype = {
        post: function post() {
          chrome.storage.local.get(null, function (data) {
            this.setHeader('content-type', 'text/json');
            var body = handle(this);
            var buf = new TextEncoder('utf-8').encode(JSON.stringify(body)).buffer;
            this.write(buf);
            this.finish();
          }.bind(this));
        },
        get: function get() {
          chrome.storage.local.get(null, function (data) {
            this.setHeader('content-type', 'text/json');
            var buf = new TextEncoder('utf-8').encode(JSON.stringify({ code: 405, msg: 'bad request' })).buffer;
            this.write(buf);
            this.finish();
          }.bind(this));
        }
      };

      _.extend(HttpHandler.prototype, WSC.BaseHandler.prototype);
      return [mapping, HttpHandler];
    }
  }]);

  return Router;
}();

function testHandle(ctx) {
  console.log(ctx);

  return {
    code: 0,
    msg: 'test success'
  };
}

var handles = [Router.post('/test', testHandle)];
/* harmony default export */ __webpack_exports__["default"] = (handles);

/***/ }),

/***/ "./service/main.js":
/*!*************************!*\
  !*** ./service/main.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller */ "./service/controller.js");



var _window = window,
    chrome = _window.chrome,
    WSC = _window.WSC;


chrome.app.runtime.onLaunched.addListener(init);
chrome.app.runtime.onRestarted.addListener(init);

function init() {
  var win = void 0,
      webServer = void 0;

  // console.log(chrome.storage.local)
  chrome.storage.local.get(null, function (data) {
    openWindow('index.html');
  });

  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request);
  });

  function startWebserver(port) {
    var _resolve = null;
    var p = new Promise(function (resolve, reject) {
      return _resolve = resolve;
    });
    chrome.storage.local.get(null, function (data) {
      var _port = port || data.port;
      if (!_port) {
        chrome.storage.local.set({ port: 8089 }, function () {
          console.log('port is 8089');
          _port = 8089;
        });
      }
      webServer && webServer.stop();
      webServer = new WSC.WebApplication({
        host: '0.0.0.0',
        port: _port,
        optBackground: true,
        renderIndex: true,
        handlers: _controller__WEBPACK_IMPORTED_MODULE_0__["default"]
      });

      webServer.start();

      _resolve({
        host: '127.0.0.1',
        port: _port
      });
    });

    return p;
  }

  function openWindow(path) {
    if (win) win.close();
    chrome.system.display.getInfo(function (d) {
      chrome.app.window.create(path, {
        // 'frame': 'none',
        'id': 'browser',
        // 'state': 'fullscreen',
        'bounds': {
          'left': 0,
          'top': 0,
          'width': d[0].bounds.width,
          'height': d[0].bounds.height
        }
      }, function (w) {
        win = w;
      });
    });
  }

  // 保存项目数据
  function saveProject(projectList) {
    return new Promise(function (resolve, reject) {
      chrome.storage.local.set({ 'projectList': projectList }, function () {
        resolve();
      });
    });
  }

  function saveApiLists(apiLists) {
    return new Promise(function (resolve, reject) {
      chrome.storage.local.set(apiLists, function () {
        resolve();
      });
    });
  }

  function getProject() {
    return new Promise(function (resolve, reject) {
      chrome.storage.local.get('projectList', function (data) {
        resolve(data.projectList);
      });
    });
  }

  function getApiLists(id) {
    return new Promise(function (resolve, reject) {
      chrome.storage.local.get('getApiLists', function (data) {
        if (data) {
          resolve(id ? data.getApiLists[id] : data.getApiLists);
        } else {
          resolve({});
        }
      });
    });
  }

  function delProject(id) {
    getProject().then(function (data) {
      if (!data) {
        return;
      }
      if (id) {
        delete data[id];
      } else {
        data = {};
      }

      saveProject(data);
    });
  }

  window.saveProject = saveProject;
  window.saveApiList = saveApiLists;
  window.getProject = getProject;
  window.getApiLists = getApiLists;
  window.delProject = delProject;
  window.startWebserver = startWebserver;
  window.openWindow = openWindow;
}

/***/ })

/******/ });