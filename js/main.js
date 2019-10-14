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

    if (lat == undefined || long == undefined) {
        getLocation()
        alert("Permita que a Geolocalização funcione e depois clique novamente em gravar a localização")
    } else {
        posicao = {
            id: setNovoId(),
            data: getToday(),
            latitude: lat,
            longitude: long
        }
    }

    posicoes.push(posicao)
    posicoes = JSON.stringify(posicoes)
    localStorage.setItem("posicoes", posicoes)
    exibirLocalizaoNaTabela()
}

function exibirLocalizacao() {
    x.innerHTML = "Latitude: " + lat +
        "<br>Longitude: " + long;
}

function exibirLocalizaoNaTabela() {
    posicoes = getPosicoes()
    $(".exibir-localizacao-tabela").html("")
    $.each(posicoes, function (index) {
        $(".exibir-localizacao-tabela").append(
            `<tr>
                <td>${converteDataParaPortugues(posicoes[index].data)}</td>
                <td>${posicoes[index].latitude}</td>
                <td>${posicoes[index].longitude}</td>
                <td><button onclick="deletarRegistro(${posicoes[index].id})" type="button" 
                class="btn btn-danger btn-sm btn-delete-lancamento" alt="deletar Registro">
                <i class="fas fa-eraser"></i>
                </button ></td>
            </tr>`
        )
    })
}

function getPosicoes() {
    posicoes = JSON.parse(localStorage.getItem("posicoes"))
    if (posicoes == null) {
        return posicoes = []
    }
    return posicoes
}

function getToday() {
    return new Date(Date.now());
}

function limparTudo() {
    localStorage.clear();
    exibirLocalizaoNaTabela()
}

function converteDataParaPortugues(data) {
    let dataString
    let dia
    dataString = data.split("-")
    dia = dataString[2].split("T")[0]
    return dia + '/' + dataString[1] + '/' + dataString[0]
}

function deletarRegistro(numeroRegistro) {
    posicoes = getPosicoes()
    $.each(posicoes, function (index) {
        if (this.id == numeroRegistro) {
            posicoes.splice(index, 1)
            localStorage.setItem('posicoes', JSON.stringify(posicoes))
        }
    })
    exibirLocalizaoNaTabela()
}

function setNovoId() {
    novoID = localStorage.getItem("last_id")
    novoID++
    localStorage.setItem("last_id", novoID)
    return localStorage.getItem("last_id")
}

$(document).ready(function () {
    exibirLocalizaoNaTabela()
})