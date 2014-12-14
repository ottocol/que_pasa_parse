var Mensaje = Parse.Object.extend({
    className: "Mensaje",
    initialize: function() {
        this.set("fecha", new Date())
    },
    toString: function() {
        return this.get("fecha").toLocaleString() + ":" + this.get("texto")
    }

})


function obtenerMensajesRecientes() {
    var qMensajesRecientes = new Parse.Query(Mensaje)
    qMensajesRecientes
        .limit(2)
        .descending("fecha")
    qMensajesRecientes.find({
        success: function (resultados) {
           mostrarMensajesRecientes(resultados)
        },
        error: function () {

        }
    })
}

function mostrarMensajesRecientes(mensajes) {
    $('#lista_recientes').empty()
    for (var i = 0; i < mensajes.length; i++) {
        $('<li>')
            .append('<h1>' + mensajes[i].get("texto") + '</h1>')
            .append('<div class="ui-li-aside">'
            + mensajes[i].get("fecha").toLocaleDateString()
            + " "
            + mensajes[i].get("fecha").toLocaleTimeString()
            + '</div>')
            .appendTo('#lista_recientes')
    }
    $('#lista_recientes').listview('refresh')
}

$(document).onPage( "show", '#principal', function () {
    obtenerMensajesRecientes()
})

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

