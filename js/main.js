function main(carrera) {
    $("#grafo").html("<div class='loader'></div>");
    defaultFooterSnackbar()
    $('#carreras .dropdown-content').hide();
    $("#carreras .active").removeClass('active');
    $("#materias").empty();
    let filename, titulo, tituloShort, plan;
    switch (carrera) {
        case 'fondeo-1':
            filename = 'data/fondeo-1.csv';
            plan = 'Plan 1986 v2016';
            titulo = 'fondeo-1';
            tituloShort = 'fondeo-1';
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
        $("#fondeo-1").click()
});
