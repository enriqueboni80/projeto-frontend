var x = document.getElementById("demo");
var lat
var long
var posicoes = []

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    lat = position.coords.latitude
    long = position.coords.longitude
    exibirLocalizacao()
}

function gravarLocalizacao() {
    posicoes = getPosicoes()
    posicao = {
        data: getToday(),
        latitude: lat,
        longitude: long
    }
    posicoes.push(posicao)
    posicoes = JSON.stringify(posicoes)
    localStorage.setItem("posicao", posicoes)
    exibirLocalizaoNaTabela()
}

function exibirLocalizacao() {
    x.innerHTML = "Latitude: " + lat +
        "<br>Longitude: " + long;
}

function exibirLocalizaoNaTabela() {
    posicoes = getPosicoes()
    $(".exibir-localizacao-tabela").html("")
    $.each(posicoes, function(index) {
        $(".exibir-localizacao-tabela").append(
            `<tr>
                <td>${posicoes[index].data}</td>
                <td>${posicoes[index].latitude}</td>
                <td>${posicoes[index].longitude}</td>
                <td>@mdo</td>
            </tr>`
        )
    })
}

function getPosicoes() {
    posicoes = JSON.parse(localStorage.getItem("posicao"))
    if (posicoes == null) {
        return posicoes = []
    }
    return posicoes
}

function getToday() {
    return new Date(Date.now());
}

$(document).ready(function() {
    exibirLocalizaoNaTabela()
})