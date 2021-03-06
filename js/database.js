let FORMAPI = 'https://docs.google.com/forms/d/18EzhRKs4nyOVGgoVHsH35RsbT9BCRmftAhMe-8NtE94';
let SHEETAPI = "https://spreadsheets.google.com/feeds/list/1Xng29KS8L5hG972OSEdMu0JG8STqAl4-zMk6RCMhaIo/default/public/values?alt=json";


function save(clave, carrera, materias) {
    let form = $("<form id='formRecord' type='hidden' action=" + FORMAPI + " onsubmit='return window.submitGoogleForm(this)'></form>");
    form.append("<input name='entry.1857332476' value=" + clave + ">");
    form.append("<input name='entry.1673427254' value=" + carrera + ">");
    form.append("<input name='entry.1544060842' value=" + materias + ">");
    form.submit()
}

function loadMap(api, clave) {
    $("#clave input").val(clave);
    let data = api.feed.entry;
    let usuario = null;
    data.forEach(fila => {
        if (fila.gsx$clave.$t == clave) usuario = fila
    });
    if (!usuario) {
        warningSnackbar(clave);
        $("#principal").click()
        return
    }
    let carrera = usuario.gsx$carrera.$t;
    let materias = usuario.gsx$materias.$t;
    let materiasAprobadas = materias
    main(carrera)
    cargarMaterias(materiasAprobadas)
}

$(document).ready(function () {
    $('#clave-save').on('click', function () {
        let clave = $("#clave input").val();
        if (!clave) return;
        let carrera = FIUBAMAP.carrera;
        let materias = mapToJson(FIUBAMAP.aprobadas)
        save(clave, carrera, materias);
        let url = new URL(window.location.href);
        url.searchParams.set('clave', clave)    
        window.history.pushState("", "", url.toString())
        notificationSnackbar(clave)
    });

    $('#clave-load').on('click', function () {
        let clave = $("#clave input").val();
        if (!clave) return;
        window.location = "https://catacier.github.io/Generico-PotSol?clave=" + clave;
    });

    $('#clave input').on("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            $("#clave-load").click();
        }
    });
});

function cargarMaterias(materias) {
    let map = objToMap(materias)
    FIUBAMAP.aprobadas = map
    FIUBAMAP.cambiarCuatri()
}

function mapToJson(map){
    let obj = {}
    map.forEach((map,cuatri) => {
        obj[cuatri] = Object.fromEntries(map)
    })
    return JSON.stringify(obj)        
}

function objToMap(obj){
    let json = JSON.parse(obj)
    let map = new Map()
    Object.keys(json).forEach(cuatri => {
        let submap = new Map()
        Object.keys(json[cuatri]).forEach(id => {
            submap.set(id, parseInt(json[cuatri][id]))
        })
        map.set(parseFloat(cuatri), submap)
    })
    return map
}
