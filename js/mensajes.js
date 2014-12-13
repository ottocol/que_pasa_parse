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
            for (var i = 0; i < resultados.length; i++) {
                $('<li>')
                    .append(resultados[i].get("texto"))
                    .appendTo('#lista_recientes')
            }
            $('#lista_recientes').listview('refresh')
        },
        error: function () {

        }
    })
}

