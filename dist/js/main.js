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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLocation = getLocation;
exports.showPosition = showPosition;
exports.gravarLocalizacao = gravarLocalizacao;
exports.exibirLocalizacao = exibirLocalizacao;
var lat = void 0;
var long = void 0;
var element = void 0;
var elementX = $(".content__exibir-localizacao-tela");
var elementXModal = $(".content__exibir-localizacao-tela-modal");
var posicoes = [];

var getToday = function getToday() {
    var dateUS = new Date(Date.now());
    var dateBR = new Date(dateUS.getTime() - dateUS.getTimezoneOffset() * 60000);
    return dateBR;
};

var getPosicoes = function getPosicoes() {
    posicoes = JSON.parse(localStorage.getItem("posicoes"));
    return posicoes == null ? [] : posicoes;
};

var setPosicao = function setPosicao() {
    var posicao = void 0;
    return posicao = {
        id: setNovoId(),
        data: getToday(),
        latitude: lat,
        longitude: long
    };
};

var limparTudo = exports.limparTudo = function limparTudo() {
    localStorage.clear();
    exibirLocalizaoNaTabela();
};

var limparExibirLocalizacaoHome = function limparExibirLocalizacaoHome() {
    elementX.html(" ");
};

var setNovoId = exports.setNovoId = function setNovoId() {
    var novoID = localStorage.getItem("last_id");
    novoID++;
    localStorage.setItem("last_id", novoID);
    return localStorage.getItem("last_id");
};

var converteDataParaPortugues = function converteDataParaPortugues(data) {
    var dataString = void 0;
    var dia = void 0;
    var hora = void 0;
    dataString = data.split("-");
    dia = dataString[2].split("T")[0];
    hora = dataString[2].split("T")[1].split(".")[0];
    return dia + '/' + dataString[1] + '/' + dataString[0] + "</br>" + hora;
};

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        elementX.html("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    exibirLocalizacao(lat, long);
}

var redirecionarPagina = function redirecionarPagina(pagina) {
    $.ajax({
        url: "paginas/" + pagina + ".html",
        data: { "expression": "Enrique Teste" },
        cache: false
    }).done(function (retornoRequestPagina) {
        $(".content").html(retornoRequestPagina);
    });
};

function gravarLocalizacao() {
    posicoes = getPosicoes();
    if (lat == undefined || long == undefined) {
        alert("Permita que a Geolocalização funcione para gravar sua localização");
    }
    var posicao = setPosicao();
    posicoes.push(posicao);
    posicoes = JSON.stringify(posicoes);
    localStorage.setItem("posicoes", posicoes);
    limparExibirLocalizacaoHome();
    exibirLocalizaoNaTabela();
}

function exibirLocalizacao(lat, long) {
    var modal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    element = modal ? elementXModal : elementX;
    element.html("<b>Latitude:</b> " + lat + "<br><b>Longitude:</b> " + long);
    //initMap(lat, long)
}

function exibirLocalizaoNaTabela() {
    posicoes = getPosicoes();
    $(".exibir-localizacao-tabela").html("");
    $.each(posicoes, function (index) {
        lat = posicoes[index].latitude;
        long = posicoes[index].longitude;

        $(".exibir-localizacao-tabela").append("<tr>\n                <td>" + converteDataParaPortugues(posicoes[index].data) + "</td>\n                <td>" + lat + "</td>\n                <td>" + long + "</td>\n                <td>\n                <button onclick=\"exibirLocalizacao(" + lat + "," + long + "," + true + ")\" type=\"button\" \n                class=\"btn btn-info btn-sm\" alt=\"\"\n                data-toggle=\"modal\" data-target=\"#modalMapa\">\n                <i class=\"fas fa-globe-americas\"></i>\n                </button>\n                <button onclick=\"deletarRegistro(" + posicoes[index].id + ")\" type=\"button\" \n                class=\"btn btn-danger btn-sm\" alt=\"deletar Registro\">\n                <i class=\"fas fa-eraser\"></i>\n                </button>\n                </td>\n            </tr>");
    });
}

function deletarRegistro(numeroRegistro) {
    posicoes = getPosicoes();
    $.each(posicoes, function (index) {
        if (this.id == numeroRegistro) {
            posicoes.splice(index, 1);
            localStorage.setItem('posicoes', JSON.stringify(posicoes));
        }
    });
    exibirLocalizaoNaTabela();
}

$(document).ready(function () {
    getLocation();
    limparExibirLocalizacaoHome();
    exibirLocalizaoNaTabela();
});

function initMap(latitude, longitude) {
    var myLatlng = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
        zoom: 15,
        center: myLatlng
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var marker = new google.maps.Marker({
        position: myLatlng,
        title: "Google Maps"
    });
    marker.setMap(map);
}

/***/ })
/******/ ])));