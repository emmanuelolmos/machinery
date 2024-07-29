//Función para mostrar u ocultar la contraseña
const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#inputPasswordLogin");

togglePassword.addEventListener("click", function () {
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
});

//Función para mandar el formulario al controlador
$(document).ready(function () { 
    $('#formLogin').submit(function (e) { 
        e.preventDefault(); 

        //Para el caso que el usuario haya enviado el form con datos erróneos
        $("#errorLogin").remove();

        formData = new FormData(document.getElementById('formLogin'));
        formData.append('function', 'startSession');
        
        $.ajax({ 

            url: '../../Controllers/Login/SessionController.php', 
            type: 'POST', 
            data: formData, 
            cache: false,
            contentType: false,
            processData: false,
            success: function (response){

                var convertedInfo = JSON.parse(response);

                if(convertedInfo['success']){

                    location.reload();
                    
                }else{
                    $("#titleLogin").append(
                        '<h3 id="errorLogin" class="error text-center text-danger fw-bold mt-1 fs-6">' 
                        + convertedInfo['error'] + 
                        '</h3>'
                    );
                }

            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                alert('Error'); 
            } 
        }); 
    }); 
}); 