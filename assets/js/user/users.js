function loadData(){

    var petition = {
        function: 'getUsers'
    };
    
    $.ajax({ 
        url: '../../Controllers/User/UserController.php', 
        type: 'POST', 
        data: petition, 
        success: function (response){

            var convertedInfo = JSON.parse(response);

            if(convertedInfo['success']){
                
                let tbody = '';

                //Cada usuario
                for(let i=0; i < convertedInfo['users'].length; i++){

                    let roleUser = '';

                    switch(convertedInfo['users'][i].role_id){
                        case 1:
                            roleUser = 'SUPERADMIN';
                            break;
                        case 2:
                            roleUser = 'ADMIN';
                            break;
                        case 3:
                            roleUser = 'TÉCNICO'
                            break;
                    }
                    
                    //Cada dato del usuario
                    tbody += 
                    '<tr>' +
                        '<td style="padding: 10px;">' + convertedInfo['users'][i].name_user + '</td>' +
                        '<td style="padding: 10px;">' + convertedInfo['users'][i].phone_user + '</td>' +
                        '<td style="padding: 10px;">' + convertedInfo['nameCompany'] + '</td>' +
                        '<td style="padding: 10px;">' + roleUser + '</td>' +
                        '<td style="padding: 10px">';

                    if(roleUser != 'SUPERADMIN'){
                        tbody += '<button class="btn btn-success" onclick="loadDataUser(' + convertedInfo['users'][i].id_user + ')" data-bs-toggle="modal" data-bs-target="#editUserModal">' +
                                    '<i class="bi bi-pencil-fill"></i>' +
                                  '</button> ' +
                                  '<button class="btn btn-danger" onclick="removeUser(' + convertedInfo['users'][i].id_user + ')">' +
                                    '<i class="bi bi-person-dash-fill"></i>' +
                                  '</button>';
                    }

                    tbody += '</td></tr>';

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

//Obtiene la información del usuario a editar
function loadDataUser(id){

    var petition = {
        id: id,
        function: 'getDataUser'
    };

    $.ajax({ 
        url: '../../Controllers/User/UserController.php', 
        type: 'POST', 
        data: petition, 
        success: function (response){

            var convertedInfo = JSON.parse(response);

            if(convertedInfo['success']){

                //Se cargan los nombres de las empresas
                //loadCompaniesEditUser(convertedInfo['company']);

                //Se borran los datos en caso de ya haber sido solicitados
                $("#inputIdEditUser").remove();
                $("#inputNameEditUser").remove();
                $("#inputPhoneEditUser").remove();
                $("#inputPasswordEditUser").remove();
                $("#selectRoleEditUser").remove();

                //Se borra la alerta de error en el caso de que se hayan ingresado los datos incorrectos
                $('#errorMessageContentEditUser').remove();

                //Se imprime la información

                $("#divIdEditUser").append(
                    '<input class="form-control" id="inputIdEditUser" name="inputIdEditUser" type="hidden" value="' + id + '">'
                );

                $("#divNameEditUser").append(
                    '<input class="form-control" id="inputNameEditUser" name="inputNameEditUser" type="text" placeholder="Ingresa el nombre" value="' + convertedInfo['user'].name_user + '">'
                );

                $("#divPhoneEditUser").append(
                    '<input class="form-control" id="inputPhoneEditUser" name="inputPhoneEditUser" type="text" placeholder="Ingresa el número teléfonico" value="' + convertedInfo['user'].phone_user + '">'
                );

                $("#divPasswordEditUser").append(
                    '<input class="form-control" id="inputPasswordEditUser" name="inputPasswordEditUser" type="text" placeholder="Ingresa la contraseña" value="' + convertedInfo['user'].password_user + '">'
                );

                let roles = '';

                switch(convertedInfo['user'].role_id){
                    case 2:

                        roles += '<select class="form-select" id="selectRoleEditUser" name="selectRoleEditUser">' +
                                    '<option value="2" selected>ADMIN</option>' +
                                    '<option value="3">TÉCNICO</option>' +
                                 '</select>';

                        $("#divRoleEditUser").append(roles);

                        break;
                    case 3:

                        roles += '<select class="form-select" id="selectRoleEditUser" name="selectRoleEditUser">' +
                                    '<option value="2">ADMIN</option>' +
                                    '<option value="3" selected>TÉCNICO</option>' +
                                 '</select>';

                        $("#divRoleEditUser").append(roles);

                        break;
                }
                
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
                url: '../../Controllers/User/UserController.php', 
                type: 'POST', 
                data: petition, 
                success: function (response){
        
                    var convertedInfo = JSON.parse(response);
        
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
        $("#errorMessageContentAddUser").remove();

        formData = new FormData(document.getElementById('formAddUserModal'));
        formData.append('function', 'insertUser');

        $.ajax({ 
            url: '../../Controllers/User/UserController.php', 
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
                    $("#errorMessageAddUser").append(
                        '<h1 id="errorMessageContentAddUser" class="text-danger fw-bold fs-6 mb-3">' + convertedInfo['error'] + '</h1>'
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

        formData = new FormData(this);
        formData.append('function', 'updateUser');

        $.ajax({ 
            url: '../../Controllers/User/UserController.php', 
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