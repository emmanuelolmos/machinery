function loadData(){

    var petition = {
        function: 'getUsers'
    };
    
    $.ajax({ 
        url: '../../Controllers/Admin/UserController.php', 
        type: 'POST', 
        data: petition, 
        success: function (data){

            var convertedInfo = JSON.parse(data);

            if(convertedInfo['success']){
                
                let tbody = '';

                //Cada usuario
                for(let i=0; i < convertedInfo['users'].length; i++){
                    
                    //Cada dato del usuario
                    tbody += 
                    '<tr>' +
                        '<td style="padding: 10px;">' + convertedInfo['users'][i].nombre_usuario + '</td>' +
                        '<td style="padding: 10px;">' + convertedInfo['users'][i].telefono + '</td>' +
                        '<td style="padding: 10px;">' + convertedInfo['users'][i].empresa + '</td>' +
                        '<td style="padding: 10px;">' + convertedInfo['users'][i].rol_usuario + '</td>' +
                        '<td style="padding: 10px">' +
                            '<button class="btn btn-success" onclick="loadDataUser(' + convertedInfo['users'][i].ID_usuario + ')" data-bs-toggle="modal" data-bs-target="#editUserModal">' +
                                '<i class="bi bi-pencil-fill"></i>' +
                            '</button> ' +
                            '<button class="btn btn-danger" onclick="removeUser(' + convertedInfo['users'][i].ID_usuario + ')">' +
                                '<i class="bi bi-person-dash-fill"></i>' +
                            '</button>' +
                        '</td>' +
                    '</tr>';

                }

                $("#listUsers").append(tbody);
                
            }else{

                $("#tableUsers").remove();

                switch(convertedInfo['error']){
                    case 'Error':
                        $("#divUsers").append(
                            '<h1 id="error" class="error text-center text-danger fw-bold mt-1 fs-2">Error en la conexión con la base de datos.</h3>'
                        );
                        break;
                    case 'Empty':
                        $("#divUsers").append(
                            '<h1 id="error" class="error text-center text-danger fw-bold mt-1 fs-2">Sin registros.</h3>'
                        );
                        break;
                    default:
                        $("#divUsers").append(
                            '<h1 id="error" class="error text-center text-danger fw-bold mt-1 fs-2">Error desconocido.</h3>'
                        );
                        break;
                }

            }

        }, 
        error: function (jqXHR, textStatus, errorThrown) { 
            alert('Error'); 
        } 
    }); 
}

function loadCompanies(){

    var petition = {
        function: 'getCompanies'
    };
    
    $.ajax({ 
        url: '../../Controllers/Admin/UserController.php', 
        type: 'POST', 
        data: petition, 
        success: function (data){

            var convertedInfo = JSON.parse(data);

            if(convertedInfo['success']){
                
                let select = '';

                //Cada empresa
                for(let i=0; i < convertedInfo['companies'].length; i++){

                    //En caso de ya haberse generado las opciones es necesario borrar las anteriores
                    $("#itemCompanies").remove();
                    
                    //Cada dato del usuario
                    select += '<option id="itemCompanies" value="' + convertedInfo['companies'][i].ID_empresa + '">' + convertedInfo['companies'][i].nombre_empresa + '</option>';

                }

                $("#company").append(select);
                
            }else{

                switch(convertedInfo['error']){
                    case 'Error':
                        $("#companies").append(
                            '<option id="itemCompanies" value="">No se cargó el listado de empresas</option>'
                        );
                        break;
                    case 'Empty':
                        $("#companies").append(
                            '<option id="itemCompanies" value="">No hay empresas registradas</option>'
                        );
                        break;
                    default:
                        $("#companies").append(
                            '<option id="itemCompanies" value="">Error desconocido</option>'
                        );
                        break;
                }

            }

        }, 
        error: function (jqXHR, textStatus, errorThrown) { 
            alert('Error'); 
        } 
    }); 
}

function loadCompaniesEditUser(idCompanyUser){

    var petition = {
        function: 'getCompanies'
    };
    
    $.ajax({ 
        url: '../../Controllers/Admin/UserController.php', 
        type: 'POST', 
        data: petition, 
        success: function (data){

            var convertedInfo = JSON.parse(data);

            if(convertedInfo['success']){
                
                let select = '';

                //Cada empresa
                for(let i=0; i < convertedInfo['companies'].length; i++){

                    //En caso de ya haberse generado las opciones es necesario borrar las anteriores
                    $("#itemCompaniesEditUser").remove();
                    
                    //Cada dato del usuario

                    //En caso de que la empresa coincida con la del usuario se agregará un selected
                    if(convertedInfo['companies'][i].ID_empresa == idCompanyUser){
                        select += '<option id="itemCompaniesEditUser" value="' + convertedInfo['companies'][i].ID_empresa + '" selected>' + convertedInfo['companies'][i].nombre_empresa + '</option>';
                    }else{
                        select += '<option id="itemCompaniesEditUser" value="' + convertedInfo['companies'][i].ID_empresa + '">' + convertedInfo['companies'][i].nombre_empresa + '</option>';
                    }

                }

                $("#selectCompanyEditUser").append(select);
                
            }else{

                switch(convertedInfo['error']){
                    case 'Error':
                        $("#companyEditUser").append(
                            '<option id="itemCompanies" value="">No se cargó el listado de empresas</option>'
                        );
                        break;
                    case 'Empty':
                        $("#companyEditUser").append(
                            '<option id="itemCompanies" value="">No hay empresas registradas</option>'
                        );
                        break;
                    default:
                        $("#companyEditUser").append(
                            '<option id="itemCompanies" value="">Error desconocido</option>'
                        );
                        break;
                }

            }

        }, 
        error: function (jqXHR, textStatus, errorThrown) { 
            alert('Error'); 
        } 
    }); 
}

function loadDataUser(id){

    var petition = {
        id: id,
        function: 'getDataUser'
    };

    $.ajax({ 
        url: '../../Controllers/Admin/UserController.php', 
        type: 'POST', 
        data: petition, 
        success: function (data){

            var convertedInfo = JSON.parse(data);

            if(convertedInfo['success']){

                //Se cargan los nombres de las empresas
                loadCompaniesEditUser(convertedInfo['company']);

                //Se borran los datos en caso de ya haber sido solicitados
                $("#inputIdEditUser").remove();
                $("#inputNameEditUser").remove();
                $("#inputPhoneEditUser").remove();
                $("#inputPasswordEditUser").remove();

                //Se borra la alerta de error en el caso de que se hayan ingresado los datos incorrectos
                $('#errorMessageContentEditUser').remove();

                //Se imprime la información

                $("#divIdEditUser").append(
                    '<input id="inputIdEditUser" name="id" type="hidden" value="' + id + '">'
                );

                $("#divNameEditUser").append(
                    '<input id="inputNameEditUser" name="name" type="text" placeholder="Ingresa el nombre" style="margin-left: 8px; width: 250px;" value="' + convertedInfo['name'] + '">'
                );

                $("#divPhoneEditUser").append(
                    '<input id="inputPhoneEditUser" name="phone" type="text" placeholder="Ingresa el número teléfonico" style="margin-left: 8px; width: 250px;" value="' + convertedInfo['phone'] + '">'
                );

                $("#divPasswordEditUser").append(
                    '<input id="inputPasswordEditUser" name="password" type="text" placeholder="Ingresa la contraseña" style="margin-left: 8px; width: 250px;" value="' + convertedInfo['password'] + '">'
                );
                
            }else{

                alert(convertedInfo['error']);

            }

        }, 
        error: function (jqXHR, textStatus, errorThrown) { 
            alert('Error'); 
        } 
    }); 

}

function removeUser(id){
    
    //Alerta de SweetAlert
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: true
      });
      swalWithBootstrapButtons.fire({
        title: "Estás seguro de eliminar al usuario?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

            //Se confirmó la eliminación
            var petition = {
                function: 'removeUser',
                id: id
            };
            
            $.ajax({ 
                url: '../../Controllers/Admin/UserController.php', 
                type: 'POST', 
                data: petition, 
                success: function (data){
        
                    var convertedInfo = JSON.parse(data);
        
                    if(convertedInfo['success']){
                        
                        swalWithBootstrapButtons.fire({
                            title: "Eliminado",
                            text: "El usuario se ha eliminado.",
                            icon: "success"
                        });

                        location.reload();
                        
                    }else{

                        switch(convertedInfo['error']){
                            case 'ownAccount':
                                swalWithBootstrapButtons.fire({
                                    title: "Error",
                                    text: "No puedes borrar tu cuenta.",
                                    icon: "error"
                                });
                                break;

                            case 'unknown':
                                swalWithBootstrapButtons.fire({
                                    title: "Error",
                                    text: "El usuario no se eliminó correctamente.",
                                    icon: "error"
                                });
                                break;
                        }
        
                    }
        
                }, 
                error: function (jqXHR, textStatus, errorThrown) { 
                    alert('Error'); 
                } 
            });
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "No se borró al usuario",
            icon: "error"
          });
        }
      });
}

//Formularios de los modales

//Nuevo usuario
$(document).ready(function () { 
    $('#formAddUserModal').submit(function (e) { 
        e.preventDefault(); 

        //Para el caso que el usuario haya enviado el form con datos erróneos
        $("#errorMessageContent").remove();
         
        var formData = {
            name: $("#name").val(),
            phone: $("#phone").val(),
            password: $("#password").val(),
            company: $("#company").val(),
            role: $("#role").val(),
            status: $("#status").val(),
            function: 'insertUser'
        };

        $.ajax({ 
            url: '../../Controllers/Admin/UserController.php', 
            type: 'POST', 
            data: formData, 
            success: function (data){

                var convertedInfo = JSON.parse(data);

                if(convertedInfo['success']){

                    location.reload();
                    
                }else{
                    $("#errorMessage").append(
                        '<h1 id="errorMessageContent" class="text-danger fw-bold fs-6 mb-3">' + convertedInfo['error'] + '</h1>'
                    );
                }

            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                alert('Error'); 
            } 
        });
    }); 
}); 

//Editar usuario
$(document).ready(function () { 
    $('#formEditUserModal').submit(function (e) { 
        e.preventDefault(); 

        //Para el caso que el usuario haya enviado el form con datos erróneos
        $("#errorMessageContentEditUser").remove();
         
        var formData = {
            id: $("#inputIdEditUser").val(),
            name: $("#inputNameEditUser").val(),
            phone: $("#inputPhoneEditUser").val(),
            password: $("#inputPasswordEditUser").val(),
            company: $("#selectCompanyEditUser").val(),
            role: $("#selectRoleEditUser").val(),
            status: $("#selectStatusEditUser").val(),
            function: 'updateUser'
        };

        $.ajax({ 
            url: '../../Controllers/Admin/UserController.php', 
            type: 'POST', 
            data: formData, 
            success: function (data){

                var convertedInfo = JSON.parse(data);

                if(convertedInfo['success']){

                    location.reload();
                    
                }else{
                    $("#errorMessageEditUser").append(
                        '<h1 id="errorMessageContentEditUser" class="text-danger fw-bold fs-6 mb-3">' + convertedInfo['error'] + '</h1>'
                    );
                }

            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                alert('Error'); 
            } 
        });
    }); 
}); 

loadData();