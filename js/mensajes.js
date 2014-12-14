var Mensaje = Parse.Object.extend({
    className: "Mensaje",
    initialize: function() {
        this.set("fecha", new Date())
    },
    toString: function() {
        return this.get("fecha").toLocaleString() + ":" + this.get("texto")
    }

})


function listarMensajesRecientes() {
    var qMensajesRecientes = new Parse.Query(Mensaje)
    qMensajesRecientes
        .limit(2)
        .descending("fecha")

    qMensajesRecientes.find({
        success: function (resultados) {
            $('#lista_recientes').empty()
            for (var i = 0; i < resultados.length; i++) {
                $('<li>')
                    .append(resultados[i].get("texto"))
                    .append('<div class="ui-li-aside">'
                        + resultados[i].get("fecha").toLocaleDateString()
                        + " "
                        + resultados[i].get("fecha").toLocaleTimeString()
                        + '</div>')
                    .appendTo('#lista_recientes')
            }
            $('#lista_recientes').listview('refresh')
        },
        error: function () {

        }
    })
}

function enviarMensaje(texto) {
    var mensaje = new Mensaje()
    mensaje.set('texto', texto)
    mensaje.save(
        null, {
        success: function () {
            $('#mensaje').append('Mensaje guardado correctamente')
        },
        error: function () {
            $('#mensaje').append('Error al guardar mensaje')
        }
    })
}

$('#boton_enviar_mensaje').click(function() {
    enviarMensaje($('#texto_mensaje').val())
})

