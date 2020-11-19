function main(carrera) {
    $("#grafo").html("<div class='loader'></div>");
    defaultFooterSnackbar()
    $('#carreras .dropdown-content').hide();
    $("#carreras .active").removeClass('active');
    $("#materias").empty();
    let filename, titulo, tituloShort, plan;
    switch (carrera) {
        case 'fondeo1':
            filename = 'data/fondeo1.csv';
            plan = 'Demo';
            titulo = 'Fondeo 1';
            tituloShort = 'fondeo1';
            break;
        case 'fondeo2':
            filename = 'data/fondeo2.csv';
            plan = 'Demo';
            titulo = 'Fondeo 2';
            tituloShort = 'fondeo2';
            break;
        case 'principal':
            filename = 'data/principal.csv';
            plan = 'Demo';
            titulo = 'Principal';
            tituloShort = 'principal';
            break;
        case 'captacion_y_alta':
            filename = 'data/captacion_y_alta.csv';
            plan = 'Demo';
            titulo = 'Captación y alta';
            tituloShort = 'captacion_y_alta';
            break;
        case 'estrategia_de_fondeo':
            filename = 'data/estrategia_de_fondeo.csv';
            plan = 'Demo';
            titulo = 'Estrategia de Fondeo';
            tituloShort = 'estrategia_de_fondeo';
            break;
        case 'fidelizacion':
            filename = 'data/fidelizacion.csv';
            plan = 'Demo';
            titulo = 'Fidelización';
            tituloShort = 'fidelizacion';
            break;
        case 'gestion_de_eventos':
            filename = 'data/gestion_de_eventos.csv';
            plan = 'Demo';
            titulo = 'Gestión de Eventos';
            tituloShort = 'gestion_de_eventos';
            break;
        case 'gestion_de_programas':
            filename = 'data/gestion_de_programas.csv';
            plan = 'Demo';
            titulo = 'Gestión de Programas';
            tituloShort = 'gestion_de_programas';
            break;
        case 'gestion_del_donante':
            filename = 'data/gestion_del_donante.csv';
            plan = 'Demo';
            titulo = 'Gestión del Donante';
            tituloShort = 'gestion_del_donante';
            break;
        case 'rrhh':
            filename = 'data/rrhh.csv';
            plan = 'Demo';
            titulo = 'RRHH';
            tituloShort = 'rrhh';
            break;
    }

    $("#carrera-actual-long").text(titulo + ' | ' + plan);
    $("#carrera-actual-short").text(tituloShort);
    $("#" + carrera).addClass('active');

    $.ajax({
        url: filename,
        dataType: 'text',
        success: function (data) {
            new FiubaMap(data, carrera)
        },
        async: false
    })
}

$(document).ready(function () {
    $(".dropdown").on("mouseover", function () {
        $(this).children('.dropdown-content').show()
    });

    $(".dropdown").on("mouseout", function () {
        $(this).children('.dropdown-content').hide()
    });

    $('.carrera').on('click', function () {
        main($(this).attr('id'))
        FIUBAMAP.aprobar("CBC", 0, FIUBAMAP.cuatri)
    });

    $(document).keydown(function (event) {
        if (event.keyCode == 27)
            $('.close-button').click();
    });
});

$(document).ready(function () {
    $("#grafo").html("<div class='loader'></div>");
    defaultFooterSnackbar()
    let url = new URL(window.location.href);
    let clave = url.searchParams.get('clave')
    if (clave)
        $.ajax({
            url: SHEETAPI,
            method: 'GET',
            success: function (data) {
                loadMap(data, clave)
            }
        })
    else
        $("#principal").click()
});
