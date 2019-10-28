(function(e, a) { for(var i in a) e[i] = a[i]; }(window, /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.jsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/index.jsx":
/*!**************************!*\
  !*** ./src/js/index.jsx ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.getLocation = getLocation;\nexports.gravarLocalizacao = gravarLocalizacao;\nexports.deletarRegistro = deletarRegistro;\nvar lat = void 0;\nvar long = void 0;\nvar element = void 0;\nvar elementX = $(\".content__exibir-localizacao-tela\");\nvar elementXModal = $(\".content__exibir-localizacao-tela-modal\");\nvar posicoes = [];\n\nvar getToday = function getToday() {\n    var dateUS = new Date(Date.now());\n    var dateBR = new Date(dateUS.getTime() - dateUS.getTimezoneOffset() * 60000);\n    return dateBR;\n};\n\nvar getPosicoes = function getPosicoes() {\n    posicoes = JSON.parse(localStorage.getItem(\"posicoes\"));\n    return posicoes == null ? [] : posicoes;\n};\n\nvar setPosicao = function setPosicao() {\n    var posicao = void 0;\n    return posicao = {\n        id: setNovoId(),\n        data: getToday(),\n        latitude: lat,\n        longitude: long\n    };\n};\n\nvar limparTudo = exports.limparTudo = function limparTudo() {\n    localStorage.clear();\n    exibirLocalizaoNaTabela();\n};\n\nvar limparExibirLocalizacaoHome = function limparExibirLocalizacaoHome() {\n    elementX.html(\" \");\n};\n\nvar setNovoId = function setNovoId() {\n    var novoID = localStorage.getItem(\"last_id\");\n    novoID++;\n    localStorage.setItem(\"last_id\", novoID);\n    return localStorage.getItem(\"last_id\");\n};\n\nvar converteDataParaPortugues = function converteDataParaPortugues(data) {\n    var dataString = void 0;\n    var dia = void 0;\n    var hora = void 0;\n    dataString = data.split(\"-\");\n    dia = dataString[2].split(\"T\")[0];\n    hora = dataString[2].split(\"T\")[1].split(\".\")[0];\n    return dia + '/' + dataString[1] + '/' + dataString[0] + \"</br>\" + hora;\n};\n\nfunction getLocation() {\n    if (navigator.geolocation) {\n        navigator.geolocation.getCurrentPosition(showPosition);\n    } else {\n        elementX.html(\"Geolocation is not supported by this browser.\");\n    }\n}\n\nfunction showPosition(position) {\n    lat = position.coords.latitude;\n    long = position.coords.longitude;\n    exibirLocalizacao(lat, long);\n}\n\nvar redirecionarPagina = function redirecionarPagina(pagina) {\n    $.ajax({\n        url: \"paginas/\" + pagina + \".html\",\n        data: { \"expression\": \"Enrique Teste\" },\n        cache: false\n    }).done(function (retornoRequestPagina) {\n        $(\".content\").html(retornoRequestPagina);\n    });\n};\n\nfunction gravarLocalizacao() {\n    posicoes = getPosicoes();\n    if (lat == undefined || long == undefined) {\n        alert(\"Permita que a Geolocalização funcione para gravar sua localização\");\n    }\n    var posicao = setPosicao();\n    posicoes.push(posicao);\n    posicoes = JSON.stringify(posicoes);\n    localStorage.setItem(\"posicoes\", posicoes);\n    limparExibirLocalizacaoHome();\n    exibirLocalizaoNaTabela();\n}\n\nfunction exibirLocalizacao(lat, long) {\n    var modal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n\n    element = modal ? elementXModal : elementX;\n    element.html(\"<b>Latitude:</b> \" + lat + \"<br><b>Longitude:</b> \" + long);\n    //initMap(lat, long)\n}\n\nfunction exibirLocalizaoNaTabela() {\n    posicoes = getPosicoes();\n    $(\".exibir-localizacao-tabela\").html(\"\");\n    $.each(posicoes, function (index) {\n        lat = posicoes[index].latitude;\n        long = posicoes[index].longitude;\n\n        $(\".exibir-localizacao-tabela\").append(\"<tr>\\n                <td>\" + converteDataParaPortugues(posicoes[index].data) + \"</td>\\n                <td>\" + lat + \"</td>\\n                <td>\" + long + \"</td>\\n                <td>\\n                <button onclick=\\\"exibirLocalizacao(\" + lat + \",\" + long + \",\" + true + \")\\\" type=\\\"button\\\" \\n                class=\\\"btn btn-info btn-sm\\\" alt=\\\"\\\"\\n                data-toggle=\\\"modal\\\" data-target=\\\"#modalMapa\\\">\\n                <i class=\\\"fas fa-globe-americas\\\"></i>\\n                </button>\\n                <button onclick=\\\"deletarRegistro(\" + posicoes[index].id + \")\\\" type=\\\"button\\\" \\n                class=\\\"btn btn-danger btn-sm\\\" alt=\\\"deletar Registro\\\">\\n                <i class=\\\"fas fa-eraser\\\"></i>\\n                </button>\\n                </td>\\n            </tr>\");\n    });\n}\n\nfunction deletarRegistro(numeroRegistro) {\n    posicoes = getPosicoes();\n    $.each(posicoes, function (index) {\n        if (this.id == numeroRegistro) {\n            posicoes.splice(index, 1);\n            localStorage.setItem('posicoes', JSON.stringify(posicoes));\n        }\n    });\n    exibirLocalizaoNaTabela();\n}\n\n$(document).ready(function () {\n    getLocation();\n    limparExibirLocalizacaoHome();\n    exibirLocalizaoNaTabela();\n});\n\nfunction initMap(latitude, longitude) {\n    var myLatlng = new google.maps.LatLng(latitude, longitude);\n    var mapOptions = {\n        zoom: 15,\n        center: myLatlng\n    };\n    var map = new google.maps.Map(document.getElementById(\"map\"), mapOptions);\n    var marker = new google.maps.Marker({\n        position: myLatlng,\n        title: \"Google Maps\"\n    });\n    marker.setMap(map);\n}\n\n//# sourceURL=webpack:///./src/js/index.jsx?");

/***/ })

/******/ })));