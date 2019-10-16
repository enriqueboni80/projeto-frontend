let lat
let long
let element
let elementX = $(".content__exibir-localizacao-tela")
let elementXModal = $(".content__exibir-localizacao-tela-modal")
let posicoes = []

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        elementX.html("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    lat = position.coords.latitude
    long = position.coords.longitude
    exibirLocalizacao(lat, long)
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

function exibirLocalizacao(lat, long, modal = false) {    
    element = (modal) ? elementXModal : elementX
    element.html("<b>Latitude:</b> " + lat +
        "<br><b>Longitude:</b> " + long);
}

function exibirLocalizaoNaTabela() {
    posicoes = getPosicoes()
    $(".exibir-localizacao-tabela").html("")
    $.each(posicoes, function (index) {
        lat = posicoes[index].latitude
        long = posicoes[index].longitude
        
        $(".exibir-localizacao-tabela").append(
            `<tr>
                <td>${converteDataParaPortugues(posicoes[index].data)}</td>
                <td>${lat}</td>
                <td>${long}</td>
                <td>
                <button onclick="exibirLocalizacao(${lat},${long},${true})" type="button" 
                class="btn btn-info btn-sm" alt=""
                data-toggle="modal" data-target="#modalMapa">
                <i class="fas fa-globe-americas"></i>
                </button>
                <button onclick="deletarRegistro(${posicoes[index].id})" type="button" 
                class="btn btn-danger btn-sm" alt="deletar Registro">
                <i class="fas fa-eraser"></i>
                </button>
                </td>
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
    let hora
    dataString = data.split("-")
    dia = dataString[2].split("T")[0]
    hora = dataString[2].split("T")[1].split(".")[0]
    return dia + '/' + dataString[1] + '/' + dataString[0] + "</br>" + hora
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


function redirecionarPagina(pagina) {
    $.ajax({
        url: `paginas/${pagina}.html`,
        data: { "expression": "Enrique Teste" },
        cache: false
    })
        .done(function (retornoRequestPagina) {
            $(".content").html(retornoRequestPagina);
        });
}