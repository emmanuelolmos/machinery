//Funciones a utilizar
function loadData(){
    
    var petition = {
        function: 'getCompany'
    };
    
    $.ajax({ 
        url: '../../Controllers/User/MachineController.php', 
        type: 'POST', 
        data: petition, 
        success: function (response){

            var convertedInfo = JSON.parse(response);

            if(convertedInfo['success']){

                $("#hNameCompany").remove();

                $("#divNameCompany").append(
                    '<h1 id="hNameCompany" class="fs-3 ">Empresa: ' + convertedInfo['company'].name_company + '</h1>'
                );
                
            }else{

                $("#divRowTable").remove();

                switch(convertedInfo['error']){
                    case 'Error':
                        $("#divPrincipalTable").append(
                            '<h1 id="error" class="error text-center text-danger fw-bold mt-1 mb-5 fs-2">Error en la conexión con la base de datos.</h3>'
                        );
                        break;
                    case 'Empty':
                        $("#divPrincipalTable").append(
                            '<h1 id="error" class="error text-center text-danger fw-bold mt-1 mb-5 fs-2">Sin registros.</h3>'
                        );
                        break;
                    default:
                        $("#divPrincipalTable").append(
                            '<h1 id="error" class="error text-center text-danger fw-bold mt-1 mb-5 fs-2">Error desconocido.</h3>'
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

function loadMachines(){

    var petition = {
        function: 'getMachines'
    };

    $.ajax({ 
        url: '../../Controllers/User/MachineController.php', 
        type: 'POST', 
        data: petition, 
        success: function (response){

            var convertedInfo = JSON.parse(response);

            if(convertedInfo['success']){

                //alert(convertedInfo['machinery']['0'].marca);
                let cards = '';

                //Se llena con el siguiente ciclo
                for(let i=0; i < convertedInfo['machines'].length; i++){
                    cards += '<div class="col-xl-3 col-lg-4 col-md-6 mt-3 mb-3 mb-sm-0">' +
                                '<div class="card">' +
                                    '<img class="card-img-top" src="http://tallergeorgio.hopto.org:5613/tallergeorgio/imagenes/maquinas/' + convertedInfo['machines'][i].image_machine + '" alt="" style="height: 300px">' +
                                    '<div class="card-body">' +
                                        //Nombre y opciones
                                        '<div class="d-flex justify-content-between mb-2">' +
                                            '<h5 class="card-title fs-6 mt-2">' + convertedInfo['machines'][i].name_machine.toUpperCase() + '</h5>' +
                                            '<button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-list"></i></button>' +
                                            '<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">' +
                                                '<li class="dropdown-item" data-bs-toggle="modal" data-bs-target="#editMachineModal" onclick="loadDataMachine(' + convertedInfo['machines'][i].id_machine + ')">Editar maquina</li>' +
                                                '<li class="dropdown-item" onclick="loadMaintenance(' + convertedInfo['machines'][i].id_machine + ')">Asignar mantenimiento</li>' +
                                                '<li class="dropdown-item" onclick="redirectChecks(' + convertedInfo['machines'][i].id_machine + ')">Asignar checks</li>' +
                                                '<li class="dropdown-item" onclick="deleteMachine(' + convertedInfo['machines'][i].id_machine + ')">Eliminar maquinas</li>' +
                                            '</ul>' +
                                        '</div>' +
                                        //Descripción
                                        '<p class="card-text">' + convertedInfo['machines'][i].observation_machine +'</p>' +
                                        //Información adicional
                                        '<div class="d-flex justify-content-between mb-3">' +
                                            '<div class="bg-primary ms-1 me-2 w-50 rounded-2" style="color: #FEFEFE;">' +
                                                '<p class="mt-2 fw-bold text-center">Marca: ' + convertedInfo['machines'][i].mark_machine + '</p>' +
                                            '</div>' +
                                            '<div class="bg-primary ms-2 me-1 w-50 rounded-2" style="color: #FEFEFE;">' +
                                                '<p class="mt-2 fw-bold text-center">Modelo: ' + convertedInfo['machines'][i].model_machine + '</p>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="d-flex justify-content-between mb-3">' +
                                            '<div class="bg-secondary ms-1 me-2 w-50 rounded-2" style="color: #FEFEFE;">' +
                                                '<p class="mt-2 fw-bold text-center">Fecha de compra: ' + convertedInfo['machines'][i].date_machine + '</p>' +
                                            '</div>' +
                                            '<div class="bg-secondary ms-2 me-1 w-50 rounded-2" style="color: #FEFEFE;">' +
                                                '<p class="mt-2 fw-bold text-center">N. Serie: ' + convertedInfo['machines'][i].serie_machine + '</p>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                             '</div>';
                }

                $("#divRowTable").append(cards);
                
            }else{

                $("#divRowTable").remove();

                switch(convertedInfo['error']){
                    case 'Error':
                        $("#divPrincipalTable").append(
                            '<h1 id="error" class="error text-center text-danger fw-bold mt-1 mb-5 fs-2">Error en la conexión con la base de datos.</h3>'
                        );
                        break;
                    case 'Empty':
                        $("#divPrincipalTable").append(
                            '<h1 id="error" class="error text-center text-danger fw-bold mt-1 mb-5 fs-2">Sin registros.</h3>'
                        );
                        break;
                    default:
                        $("#divPrincipalTable").append(
                            '<h1 id="error" class="error text-center text-danger fw-bold mt-1 mb-5 fs-2">Error desconocido.</h3>'
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

function findMachine(){

    var petitionData = {
        name: $("#inputNameMachine").val(),
        function: 'findMachine'
    };

    $.ajax({ 
        url: '../../Controllers/User/MachineController.php', 
        type: 'POST', 
        data: petitionData, 
        success: function (response){

            $("#divRowTable").remove();

            $("#error").remove();

            $("#brCards").remove();

            $("#divPrincipalTable").append(
                '<div id="divRowTable" class="row"></div>'
            );

            var convertedInfo = JSON.parse(response);

            if(convertedInfo['success']){

                //alert(convertedInfo['machinery']['0'].marca);
                let cards = '';

                //Se llena con el siguiente ciclo
                for(let i=0; i < convertedInfo['machines'].length; i++){
                    cards += '<div class="col-xl-3 col-lg-4 col-md-6 mt-3 mb-3 mb-sm-0">' +
                                '<div class="card">' +
                                    '<img class="card-img-top" src="http://tallergeorgio.hopto.org:5613/tallergeorgio/imagenes/maquinas/' + convertedInfo['machines'][i].image_machine + '" alt="" style="height: 300px">' +
                                    '<div class="card-body">' +
                                        //Nombre y opciones
                                        '<div class="d-flex justify-content-between mb-2">' +
                                            '<h5 class="card-title fs-6 mt-2">' + convertedInfo['machines'][i].name_machine.toUpperCase() + '</h5>' +
                                            '<button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-list"></i></button>' +
                                            '<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">' +
                                                '<li class="dropdown-item" data-bs-toggle="modal" data-bs-target="#editMachineModal" onclick="loadDataMachine(' + convertedInfo['machines'][i].id_machine + ')">Editar maquina</li>' +
                                                '<li class="dropdown-item" onclick="loadMaintenance(' + convertedInfo['machines'][i].id_machine + ')">Asignar mantenimiento</li>' +
                                                '<li class="dropdown-item" onclick="redirectChecks(' + convertedInfo['machines'][i].id_machine + ')">Asignar checks</li>' +
                                                '<li class="dropdown-item" onclick="deleteMachine(' + convertedInfo['machines'][i].id_machine + ')">Eliminar maquinas</li>' +
                                            '</ul>' +
                                        '</div>' +
                                        //Descripción
                                        '<p class="card-text">' + convertedInfo['machines'][i].observation_machine +'</p>' +
                                        //Información adicional
                                        '<div class="d-flex justify-content-between mb-3">' +
                                            '<div class="bg-primary ms-1 me-2 w-50 rounded-2" style="color: #FEFEFE;">' +
                                                '<p class="mt-2 fw-bold text-center">Marca: ' + convertedInfo['machines'][i].mark_machine + '</p>' +
                                            '</div>' +
                                            '<div class="bg-primary ms-2 me-1 w-50 rounded-2" style="color: #FEFEFE;">' +
                                                '<p class="mt-2 fw-bold text-center">Modelo: ' + convertedInfo['machines'][i].model_machine + '</p>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="d-flex justify-content-between mb-3">' +
                                            '<div class="bg-secondary ms-1 me-2 w-50 rounded-2" style="color: #FEFEFE;">' +
                                                '<p class="mt-2 fw-bold text-center">Fecha de compra: ' + convertedInfo['machines'][i].date_machine + '</p>' +
                                            '</div>' +
                                            '<div class="bg-secondary ms-2 me-1 w-50 rounded-2" style="color: #FEFEFE;">' +
                                                '<p class="mt-2 fw-bold text-center">N. Serie: ' + convertedInfo['machines'][i].serie_machine + '</p>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                             '</div>';
                }

                $("#divRowTable").append(cards);
                $("#divPrincipalTable").append('<br id="brCards">');
                
            }else{

                $("#divRowTable").remove();
                
                $("#error").remove();

                $("#brCards").remove();

                $("#divPrincipalTable").append(
                    '<div id="divRowTable" class="row"></div>'
                );

                switch(convertedInfo['error']){
                    case 'Error':
                        $("#divPrincipalTable").append(
                            '<h1 id="error" class="error text-center text-danger fw-bold mt-1 mb-5 fs-2">Error en la conexión con la base de datos.</h3>'
                        );
                        break;
                    case 'Empty':
                        $("#divPrincipalTable").append(
                            '<h1 id="error" class="error text-center text-danger fw-bold mt-1 mb-5 fs-2">Sin registros.</h3>'
                        );
                        break;
                    default:
                        $("#divPrincipalTable").append(
                            '<h1 id="error" class="error text-center text-danger fw-bold mt-1 mb-5 fs-2">Error desconocido.</h3>'
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

function loadDataMachine(id){

    var petition = {
        id: id,
        function: 'getDataMachine'
    };

    $.ajax({ 
        url: '../../Controllers/User/MachineController.php', 
        type: 'POST', 
        data: petition, 
        success: function (data){

            var convertedInfo = JSON.parse(data);

            if(convertedInfo['success']){

                //Se borran los datos en caso de ya haber sido solicitados
                $("#inputIdEditMachineModal").remove();
                $("#inputNameEditMachineModal").remove();
                $("#inputMarkEditMachineModal").remove();
                $("#inputModelEditMachineModal").remove();
                $("#inputSerieEditMachineModal").remove();
                $("#inputDescriptionEditMachineModal").remove();
                $("#inputDateEditMachineModal").remove();
                $("#imageEditMachineModal").remove();

                //Para el caso que el usuario haya enviado el form con datos erróneos
                 $("#errorMessageContentEditMachineModal").remove();

                //Se borra la alerta de error en el caso de que se hayan ingresado los datos incorrectos
                $('#errorMessageContentEditUser').remove();

                //Se imprime la información

                $("#divIdEditMachineModal").append(
                    '<input class="form-control" id="inputIdEditMachineModal" name="inputIdEditMachineModal" type="hidden" value="' + id + '">'
                );

                $("#divNameEditMachineModal").append(
                    '<input class="form-control" id="inputNameEditMachineModal" name="inputNameEditMachineModal" type="text" placeholder="Ingresa el nombre" value="' + convertedInfo['machine'].name_machine + '">'
                );

                $("#divMarkEditMachineModal").append(
                    '<input class="form-control" id="inputMarkEditMachineModal" name="inputMarkEditMachineModal" type="text" placeholder="Ingresa la marca" value="' + convertedInfo['machine'].mark_machine + '">'
                );

                $("#divModelEditMachineModal").append(
                    '<input class="form-control" id="inputModelEditMachineModal" name="inputModelEditMachineModal" type="text" placeholder="Ingresa el modelo" value="' + convertedInfo['machine'].model_machine + '">'
                );

                $("#divSerieEditMachineModal").append(
                    '<input class="form-control" id="inputSerieEditMachineModal" name="inputSerieEditMachineModal" type="text" placeholder="Ingresa el número de serie" value="' + convertedInfo['machine'].serie_machine + '">'
                );

                $("#divDescriptionEditMachineModal").append(
                    '<textarea class="form-control" id="inputDescriptionEditMachineModal" name="inputDescriptionEditMachineModal" placeholder="Ingresa las observaciones">' + convertedInfo['machine'].observation_machine + '</textarea>'
                );

                $("#divDateEditMachineModal").append(
                    '<input class="form-control" id="inputDateEditMachineModal" name="inputDateEditMachineModal" type="date" required pattern="\d{4}-\d{2}-\d{2}" value="' + convertedInfo['machine'].date_machine + '">'
                );

                $("#divImageEditMachineModal").append(
                    '<img id="imageEditMachineModal" class="mx-auto" src="http://tallergeorgio.hopto.org:5613/tallergeorgio/imagenes/maquinas/' + convertedInfo['machine'].image_machine + '" style="width: 350px; height:auto;" alt="">'
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

function deleteMachine(id){
    
    //Alerta de SweetAlert
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: true
      });
      swalWithBootstrapButtons.fire({
        title: "Estás seguro de eliminar el registro de maquina?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

            //Se confirmó la eliminación
            var petition = {
                function: 'deleteMachine',
                id: id
            };
            
            $.ajax({ 
                url: '../../Controllers/User/MachineController.php', 
                type: 'POST', 
                data: petition, 
                success: function (response){
        
                    var convertedInfo = JSON.parse(response);
        
                    if(convertedInfo['success']){
                        
                        swalWithBootstrapButtons.fire({
                            title: "Eliminada",
                            text: "La maquina se ha eliminado.",
                            icon: "success"
                        });

                        location.reload();
                        
                    }else{

                        switch(convertedInfo['error']){
                            case 'unknown':
                                swalWithBootstrapButtons.fire({
                                    title: "Error",
                                    text: "El registro de la maquina no se eliminó correctamente.",
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
            text: "No se borró el registro de la maquina",
            icon: "error"
          });
        }
      });
}

//Función para redirigir a la vista de checks junto con el id de la maquina
function redirectChecks(id){
    location.href = 'checks.php?id_machine=' + id;
}

//Función para mostrar el contenido del modal Maintenance de acuerdo a si ya se había establecido o no
function loadMaintenance(id){

    $("#inputIdAddMaintenanceModal").remove();
    $("#selectEditMaintenanceModal").remove();
    $("#inputNumberEditMaintenanceModal").remove();
    $("#inputIdEditMaintenanceModal").remove();
    $("#inputDateInitEditMaintenanceModal").remove();
    $("#h1DateNextEditMaintenanceModal").remove();
    $("#errorMessageContentMaintenanceModal").remove();
    $("#errorMessageContentEditMaintenanceModal").remove();

    var petition = {
        id_machine: id,
        function: 'verifyMaintenance'
    }

    $.ajax({ 
        url: '../../Controllers/User/MaintenanceController.php', 
        type: 'POST', 
        data: petition, 
        success: function (data){

            var convertedInfo = JSON.parse(data);

            if(convertedInfo['success']){

                //Se muestra el modal en base a si la frecuencia ya fue registrada o no
                if(convertedInfo['result'] == 'Empty'){

                    if(convertedInfo['checks']){

                        $('#formAddMaintenanceModal').append(
                            '<input class="form-control" id="inputIdAddMaintenanceModal" name="inputIdAddMaintenanceModal" type="hidden" value="' + id + '">'
                        );
    
                        $('#addMaintenanceModal').modal('show');

                    }else{

                        Swal.fire({
                            title: "Sin checks asignados",
                            text: "Para establecer la frecuencia del mantenimiento es necesario ingresar la lista de checks a la maquina.",
                            icon: "warning",
                            iconColor: "#ffdb00",
                            confirmButtonColor: '#0d6efd'
                          });

                    }

                }else{

                    //Se obtiene el componente select
                    let select = '<select class="form-select" id="selectEditMaintenanceModal" name="selectEditMaintenanceModal">';

                    let types = ['days', 'weeks', 'years'];
                    let tipos = ['Dia(s)', 'Semana(s)', 'Mes(es)'];

                    for(let i = 0; i < 3; i++){
                        if(convertedInfo['result'][0].type_maintenance == types[i]){
                            select += '<option value="' + types[i] + '" selected>' + tipos[i] + '</option>';
                        }else{
                            select += '<option value="' + types[i] + '">' + tipos[i] + '</option>';
                        }
                    }

                    select += '</select>';

                    $('#divSelectEditMaintenanceModal').append(select);

                    //Se obtiene el number
                    $('#divInputNumberEditMaintenanceModal').append(
                        '<input class="form-control" id="inputNumberEditMaintenanceModal" name="inputNumberEditMaintenanceModal" type="number" min="1" value="' + convertedInfo['result'][0].number_maintenance + '">'
                    );

                    //Se coloca el id
                    $('#formEditMaintenanceModal').append(
                        '<input class="form-control" id="inputIdEditMaintenanceModal" name="inputIdEditMaintenanceModal" type="hidden" value="' + id + '">'
                    );

                    //Se coloca la fecha inicial
                    $('#formEditMaintenanceModal').append(
                        '<input class="form-control" id="inputDateInitEditMaintenanceModal" name="inputDateInitEditMaintenanceModal" type="hidden" value="' + convertedInfo['result'][0].dateInit_maintenance + '">'
                    );

                    //Se coloca la fecha del próximo mantenimiento
                    $('#divDateNextEditMaintenanceModal').append(
                        '<h1 id="h1DateNextEditMaintenanceModal" class="fs-5">Próxima fecha de mantenimiento: ' + convertedInfo['result'][0].dateNext_maintenance + '</h1>'
                    );

                    $('#editMaintenanceModal').modal('show');

                }
                
            }else{
                alert('Error');
            }

        }, 
        error: function (jqXHR, textStatus, errorThrown) { 
            alert('Error'); 
        } 
    }); 
}


//Formularios de los modales

//Nueva maquina
$(document).ready(function () { 
    $('#formAddMachineModal').submit(function (e) { 
        e.preventDefault(); 

        //Para el caso que el usuario haya enviado el form con datos erróneos
        $("#errorMessageContentAddMachineModal").remove();

        formData = new FormData(this);
        formData.append("function", 'insertMachine');

        $.ajax({
            url: '../../Controllers/User/MachineController.php', 
            type: 'POST', 
            data: formData, 
            cache: false,
            contentType: false,
            processData: false,
            success: function (data){

                var convertedInfo = JSON.parse(data);

                if(convertedInfo['success']){

                    location.reload();
                    
                }else{
                    $("#errorMessageAddMachineModal").append(
                        '<h1 id="errorMessageContentAddMachineModal" class="text-danger fw-bold fs-6 mb-3">' + convertedInfo['error'] + '</h1>'
                    );
                }

            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                alert('Error'); 
            } 
        });
    }); 
}); 

//Editar maquina
$(document).ready(function () { 
    $('#formEditMachineModal').submit(function (e) { 
        e.preventDefault(); 

        //Para el caso que el usuario haya enviado el form con datos erróneos
        $("#errorMessageContentEditMachineModal").remove();

        formData = new FormData(this);
        formData.append("function", 'updateMachine');

        $.ajax({
            url: '../../Controllers/User/MachineController.php', 
            type: 'POST', 
            data: formData, 
            cache: false,
            contentType: false,
            processData: false,
            success: function (data){

                var convertedInfo = JSON.parse(data);

                if(convertedInfo['success']){

                    location.reload();
                    
                }else{
                    $("#errorMessageEditMachineModal").append(
                        '<h1 id="errorMessageContentEditMachineModal" class="text-danger fw-bold fs-6 mb-3">' + convertedInfo['error'] + '</h1>'
                    );
                }

            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                alert('Error'); 
            } 
        });
    }); 
}); 

//Establecer frecuencia de mantenimiento
$(document).ready(function () { 
    $('#formAddMaintenanceModal').submit(function (e) { 
        e.preventDefault(); 

        //Para el caso que el usuario haya enviado el form con datos erróneos
        $("#errorMessageContentMaintenanceModal").remove();

        formData = new FormData(this);
        formData.append("function", "assignDateMaintenance")

        $.ajax({
            url: '../../Controllers/SuperUser/MaintenanceController.php', 
            type: 'POST', 
            data: formData, 
            cache: false,
            contentType: false,
            processData: false,
            success: function (data){

                var convertedInfo = JSON.parse(data);

                if(convertedInfo['success']){

                    location.reload();
                    
                }else{
                    $("#errorMessageMaintenanceModal").append(
                        '<h1 id="errorMessageContentMaintenanceModal" class="text-danger fw-bold fs-6 mb-3">' + convertedInfo['error'] + '</h1>'
                    );
                }

            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                alert('Error'); 
            } 
        });
    }); 
}); 

//Editar la frecuencia de mantenimiento
$(document).ready(function () { 
    $('#formEditMaintenanceModal').submit(function (e) { 
        e.preventDefault(); 

        //Para el caso que el usuario haya enviado el form con datos erróneos
        $("#errorMessageContentEditMaintenanceModal").remove();

        formData = new FormData(this);
        formData.append("function", "reassignDateMaintenance")

        $.ajax({
            url: '../../Controllers/SuperUser/MaintenanceController.php', 
            type: 'POST', 
            data: formData, 
            cache: false,
            contentType: false,
            processData: false,
            success: function (data){

                var convertedInfo = JSON.parse(data);

                if(convertedInfo['success']){

                    location.reload();
                    
                }else{
                    $("#errorMessageEditMaintenanceModal").append(
                        '<h1 id="errorMessageContentEditMaintenanceModal" class="text-danger fw-bold fs-6 mb-3">' + convertedInfo['error'] + '</h1>'
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
loadMachines();