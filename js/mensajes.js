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
        var mensaje_tmpl = '<h1>{{texto}}</h1>'
            + '<div class="ui-li-aside"> {{fecha_hora}} </div> '
        var datos = {
            fecha_hora: mensajes[i].get("fecha").toLocaleDateString() +
                        mensajes[i].get("fecha").toLocaleTimeString(),
            texto:mensajes[i].get("texto")
        }
        $('<li>')
            .append(Mustache.render(mensaje_tmpl, datos))
            .appendTo('#lista_recientes')
    }
    $('#lista_recientes').listview('refresh')
}

$(document).onPage( "show", '#mensajes', function () {
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

