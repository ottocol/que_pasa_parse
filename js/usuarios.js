$('#boton_login').click(function() {
    Parse.User.logIn(
        $('#campo_login').val(),
        $('#campo_password').val(),{
        success: function() {
            console.log("login OK")
            $.mobile.pageContainer.pagecontainer('change', '#mensajes',
                {transition: 'slide'})
        },
        error: function() {
            $('#mensaje_login').html("Usuario y/o contraseña incorrectos")
        }
    })
})