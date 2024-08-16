//Funciones a utilizar

//Función para cargar los datos de compañias al modal addMachine
function loadCompaniesAddMachine(){
    
    var petition = {function : 'getCompanies'};
    
    $.ajax({ 
        url: '../../Controllers/SuperUser/MachineController.php', 
        type: 'POST', 
        data: petition, 
        success: function (response){

            var convertedInfo = JSON.parse(response);

            if(convertedInfo['success']){

                $("#selectCompanyAddMachine").remove();

                //Se imprime el select para los nombres de empresas
                $("#divCompanyAddMachine").append(
                    '<select class="form-select" name="selectCompanyAddMachine" id="selectCompanyAddMachine"></select>'
                );

                //Se obtienen las opciones de empresas
                let optionsCompanies = '';

                for(let i = 0; i < convertedInfo['companies'].length; i++){
                    optionsCompanies += '<option value="' + convertedInfo['companies'][i].id_company + '">' + convertedInfo['companies'][i].name_company + '</option>';
                }

                //Se imprime la información
                $("#selectCompanyAddMachine").append(
                    optionsCompanies
                );
                
            }else{
                alert('Error');
            }
        }, 
        error: function (jqXHR, textStatus, errorThrown) { 
            alert('Error'); 
        } 
    }); 
}

//Función para cargar los items de las maquinas registradas
function loadMachines(){

    var petition = {function: 'getMachines'};

    $.ajax({ 
        url: '../../Controllers/SuperUser/MachineController.php', 
        type: 'POST', 
        data: petition, 
        success: function (response){

            var convertedInfo = JSON.parse(response);

            if(convertedInfo['success']){

                let cards = '';

                //Se llena con el siguiente ciclo
                for(let i=0; i < convertedInfo['machines'].length; i++){

                    let nameCompany = '';

                    for(let j=0; j < convertedInfo['companies'].length; j++){

                        if(convertedInfo['machines'][i].company_id == convertedInfo['companies'][j].id_company){
                            nameCompany = convertedInfo['companies'][j].name_company;
                        }

                    }

                    $nameMachine = "'" + convertedInfo['machines'][i].name_machine.toUpperCase() + "'";

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
                                                '<li class="dropdown-item" onclick="showListChecksMaintenance(' + convertedInfo['machines'][i].id_machine + ', ' + $nameMachine + ')">Ver mantenimiento</li>' +
                                                '<li class="dropdown-item" onclick="showReportOptionsModal(' + convertedInfo['machines'][i].id_machine + ')">Generar reporte</li>' +
                                                '<li class="dropdown-item" onclick="deleteMachine(' + convertedInfo['machines'][i].id_machine + ')">Eliminar maquinas</li>' +
                                            '</ul>' +
                                        '</div>' +
                                        //Descripción
                                        '<p class="card-text">' + convertedInfo['machines'][i].observation_machine +'</p>' +
                                        '<p class="card-text">Empresa: ' + nameCompany +'</p>' +
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

//Función para buscar una maquina especifica
function findMachine(){

    var petitionData = {
        name: $("#inputNameMachine").val(),
        function: 'findMachine'
    };

    $.ajax({ 
        url: '../../Controllers/SuperUser/MachineController.php', 
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

                let cards = '';

                //Se llena con el siguiente ciclo
                for(let i=0; i < convertedInfo['machines'].length; i++){

                    let nameCompany = '';

                    for(let j=0; j < convertedInfo['companies'].length; j++){

                        if(convertedInfo['machines'][i].company_id == convertedInfo['companies'][j].id_company){
                            nameCompany = convertedInfo['companies'][j].name_company;
                        }

                    }

                    $nameMachine = "'" + convertedInfo['machines'][i].name_machine.toUpperCase() + "'";

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
                                                '<li class="dropdown-item" onclick="showListChecksMaintenance(' + convertedInfo['machines'][i].id_machine + ', ' + $nameMachine + ')">Ver mantenimiento</li>' +
                                                '<li class="dropdown-item" onclick="showReportOptionsModal(' + convertedInfo['machines'][i].id_machine + ')">Generar reporte</li>' +
                                                '<li class="dropdown-item" onclick="deleteMachine(' + convertedInfo['machines'][i].id_machine + ')">Eliminar maquinas</li>' +
                                            '</ul>' +
                                        '</div>' +
                                        //Descripción
                                        '<p class="card-text">' + convertedInfo['machines'][i].observation_machine +'</p>' +
                                        '<p class="card-text">Empresa: ' + nameCompany + '</p>' +
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

//Función para obtener los datos de la maquina para el modal editMachine
function loadDataMachine(id){

    var petition = {
        id: id,
        function: 'getDataMachine'
    };

    $.ajax({ 
        url: '../../Controllers/SuperUser/MachineController.php', 
        type: 'POST', 
        data: petition, 
        success: function (data){

            var convertedInfo = JSON.parse(data);

            if(convertedInfo['success']){

                
                $("#selectCompanyEditMachineModal").remove();

                //Se imprime el select para los nombres de empresas
                $("#divCompanyEditMachine").append(
                    '<select class="form-select" name="selectCompanyEditMachineModal" id="selectCompanyEditMachineModal"></select>'
                );

                //Se obtienen las opciones de empresas
                let optionsCompanies = '';

                for(let i = 0; i < convertedInfo['companies'].length; i++){

                    if(convertedInfo['machine'].company_id == convertedInfo['companies'][i].id_company){
                        optionsCompanies += '<option value="' + convertedInfo['companies'][i].id_company + '" selected>' + convertedInfo['companies'][i].name_company + '</option>';
                    }else{
                        optionsCompanies += '<option value="' + convertedInfo['companies'][i].id_company + '">' + convertedInfo['companies'][i].name_company + '</option>';
                    }

                }

                //Se imprime la información

                $("#selectCompanyEditMachineModal").append(
                    optionsCompanies
                );

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

//Función para eliminar una maquina
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
        iconColor: "#ffdb00",
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
                url: '../../Controllers/SuperUser/MachineController.php', 
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
            icon: "success"
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
        url: '../../Controllers/SuperUser/MaintenanceController.php', 
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

function showListChecksMaintenance(id_machine, name){

    //Se debe comprobar que haya un mantenimiento registrado

    var petition = {
        id_machine: id_machine,
        function: 'verifyMaintenance'
    };

    $.ajax({
        url: '../../Controllers/SuperUser/MaintenanceController.php', 
        type: 'POST', 
        data: petition, 
        success: function (data){

            var convertedInfo = JSON.parse(data);

            if(convertedInfo['success']){

                if(convertedInfo['result'] != 'Empty'){

                    //Se muestran los checks
                    loadDataListMaintenance(id_machine, convertedInfo['result'][0].dateNext_maintenance, name);

                }else{
                    $("#messageMaintenanceModal").modal("show");
                }

            }else{
                alert('Error en la consulta de mantenimientos');
            }

        }, 
        error: function (jqXHR, textStatus, errorThrown) { 
            alert('Error'); 
        } 
    });

}

//Funciones para cargar la información de los modales
function loadDataListMaintenance(id, establishedDate, name){

    $("#tbodyTableShowListMaintenanceModal").remove();
    $("#messageEmptyShowListMaintenanceModal").remove();
    $("#inputIdShowListMaintenanceModal").remove();
    $("#errorMessageContentShowListMaintenanceModal").remove();
    $("#divImageShowListMaintenanceModal").remove();
    $("#divObservationShowListMaintenanceModal").remove();
    $("#buttonStoreMaintenance").remove();
    $("#titleShowListMaintenanceModal").remove();

    $("#divInputIdShowListMaintenanceModal").append(
        '<input id="inputIdShowListMaintenanceModal" value="' + id + '" hidden></input>'
    );

    //Se coloca el nombre de la maquina
    $("#divTitleShowListMaintenanceModal").append(
        '<h1 id="titleShowListMaintenanceModal" class="fs-5 text-center">' + name + '</h1>'
    );

    //Se obtienen la información de los checks asignados a la maquina
    var petition = {
        id_machine: id,
        establishedDate_report: establishedDate,
        function: 'getChecksAssigned'
    };
    
    $.ajax({ 
        url: '../../Controllers/SuperUser/CheckController.php', 
        type: 'POST', 
        data: petition, 
        success: function (data){

            var convertedInfo = JSON.parse(data);

            if(convertedInfo['success']){

                let checks = convertedInfo['checks'];
                let date = "'" + establishedDate + "'";
                let machine_name = "'" + name + "'";

                //Se imprime la lista de maquinas con mantenimiento pendientes

                let tbody = '<tbody id="tbodyTableShowListMaintenanceModal">';

                for(let i = 0; i < checks.length; i++){
                    tbody +=    '<tr>' +
                                    '<td>' + checks[i].content_assigned_check + '</td>' +
                                    '<td>';

                    if(checks[i].status_assigned_check == '1'){
                        //Check completo
                        tbody += '<button type="button" class="btn text-success" onclick="changeStatusOfCheck(' + id + ', ' + machine_name + ', ' + date + ', ' + checks[i].id_assigned_check + ', ' + checks[i].status_assigned_check + ')"><i class="bi bi-check-circle-fill"></i></button>';
                    }else{
                        //Check incompleto
                        tbody += '<button type="button" class="btn" onclick="changeStatusOfCheck(' + id + ', ' + machine_name + ', ' + date + ', ' + checks[i].id_assigned_check + ', ' + checks[i].status_assigned_check + ')"><i class="bi bi-circle"></i></button>';
                    }

                    tbody +=        '</td>' +
                                '</tr>';
                }

                tbody += '</tbody>';

                $("#tableShowListMaintenanceModal").append(tbody);

                //Checksready es una comprobación de que todos los checks fueron completados
                if(convertedInfo['checksready']){

                    //Se muestra el input para subir imagenes
                    $("#spacedivImageShowListMaintenanceModal").append(
                        '<div id="divImageShowListMaintenanceModal">' +
                            '<label class="form-label mt-2" for="inputImageShowListMaintenanceModal">Imagenes de evidencia</label>' +
                            '<input class="form-control" id="inputImageShowListMaintenanceModal" name="inputImageShowListMaintenanceModal[]" type="file" accept="image/*" multiple>' +
                        '</div>'
                    );

                    //Se muestra el textarea para ingresar observaciones
                    $("#spacedivObservationShowListMaintenanceModal").append(
                        '<div id="divObservationShowListMaintenanceModal">' +
                            '<label class="mt-2" class="form-label" for="inputObservationShowListMaintenanceModal">Observaciones</label>' +
                            '<textarea class="form-control" name="inputObservationShowListMaintenanceModal" id="inputObservationShowListMaintenanceModal"></textarea>' +
                        '</div>'
                    );

                    //Se muestra el botón
                    $("#divButtonStoreMaintenance").append(
                        '<button id="buttonStoreMaintenance" class="btn btn-dark mt-3" type="button" onclick="storeReport(' + id + ', ' + date + ')">Registrar</button>'
                    );
                }

            }else{

                let error = convertedInfo['error'];

                //Se muestran mensajes

                if(error == 'Error'){
                    alert('Ocurrió un problema en la consulta de datos.');
                }else{
                    $("#divMessageEmptyShowListMaintenanceModal").append(
                        '<h5 id="messageEmptyShowListMaintenanceModal" class="text-center mt-5 fs-3">No hay checks asignados</h5>'
                    );
                }
                
            }

        }, 
        error: function (jqXHR, textStatus, errorThrown) { 
            alert('Error'); 
        } 
    }); 

    $('#showListMaintenanceModal').modal('show');
}

//Función para cambiar el estatus de un check
function changeStatusOfCheck(id_machine, name, establishedDate, id_assigned_check, status_assigned_check){

    $("#errorMessageContentShowListMaintenanceModal").remove();
    
    //Se manda al controlador
    var petition = {
        id_assigned_check: id_assigned_check,
        status_assigned_check: status_assigned_check,
        function: 'changeStatusOfCheck'
    };

    $.ajax({ 
        url: '../../Controllers/SuperUser/CheckController.php', 
        type: 'POST', 
        data: petition, 
        success: function (data){

            loadDataListMaintenance(id_machine, establishedDate, name);

            var convertedInfo = JSON.parse(data);

            if(convertedInfo['success']){
                $("#errorMessageShowListMaintenanceModal").append(
                    '<h4 id="errorMessageContentShowListMaintenanceModal" class="mt-2 fs-5 text-center text-success">Se registró correctamente el cambio</h4>'
                );

            }else{
                $("#errorMessageShowListMaintenanceModal").append(
                    '<h4 id="errorMessageContentShowListMaintenanceModal" class="mt-2 fs-5 text-center text-danger">No se registró correctamente el cambio</h4>'
                );
            }

        }, 
        error: function (jqXHR, textStatus, errorThrown) { 
            alert('Error'); 
        } 
    }); 
}

//Función para subir imagenes del mantenimiento
function storeReport(id_machine, establishedDate){ //sendImagesOfMaintenance(id_machine, establishedDate){

    $("#errorMessageContentShowListMaintenanceModal").remove();
    
    //Se manda la información del formulario
    var formElement = document.getElementById("formShowListMaintenanceModal");

    formData = new FormData(formElement);
    formData.append("id_machine", id_machine);
    formData.append("establishedDate", establishedDate);
    formData.append("function", 'storeReport');

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
                $("#errorMessageShowListMaintenanceModal").append(
                    '<h4 id="errorMessageContentShowListMaintenanceModal" class="mt-2 fs-5 text-center text-danger">' + convertedInfo['error'] + '</h4>'
                );
            }

        }, 
        error: function (jqXHR, textStatus, errorThrown) { 
            alert('Error'); 
        } 
    });
}

//Para la generación de reportes

function showReportOptionsModal(id){

    $("#inputIdMachineShowReportOptionsModal").remove();

    $("#divIdMachineShowReportOptionsModal").append(
        '<input id="inputIdMachineShowReportOptionsModal" type="text" value="' + id + '" hidden></input>'
    );

    $("#showReportOptionsModal").modal('show');

}

function generateLastReport(){

    $("#divMessageErrorContentMachineShowReportOptionsModal").remove();

    let id_machine = $("#inputIdMachineShowReportOptionsModal").val();

    //Se verifica que haya se hayan registrado mantenimientos

    let petition = {
        id_machine: id_machine,
        function: 'verifyMaintenance'
    }

    $.ajax({
        url: '../../Controllers/SuperUser/MaintenanceController.php', 
        type: 'POST', 
        data: petition, 
        success: function (data){

            var convertedInfo = JSON.parse(data);

            if(convertedInfo['success']){

                if(convertedInfo['result'] != 'Empty'){

                    deleteMessageReportOptions();

                    //Se crea un formulario
                    var form = document.createElement("form");
                    form.method = "POST";
                    form.action = "report.php";
                    form.target = "_blank";

                    //Se crea un input
                    var input = document.createElement("input");
                    input.type = "hidden";
                    input.name = "id_machine";
                    input.value = $("#inputIdMachineShowReportOptionsModal").val();

                    //Se agrega el input al formulario
                    form.appendChild(input);

                    //Se manda el formulario y redirige
                    document.body.appendChild(form);
                    form.submit();

                }else{

                    //No se ha registrado algún mantenimiento
                    $("#divMessageErrorMachineShowReportOptionsModal").append(
                        '<h3 id="divMessageErrorContentMachineShowReportOptionsModal" class="text-center text-danger mt-1 fs-5">No se ha realizado mantenimiento aún.</h3>'
                    );

                }

            }else{

                //Ocurrió un error en la consulta
                $("#divMessageErrorMachineShowReportOptionsModal").append(
                    '<h3 id="divMessageErrorContentMachineShowReportOptionsModal" class="text-center text-danger mt-1 fs-5">Ocurrió un error en la consulta a la base de datos.</h3>'
                );
                
            }

        }, 
        error: function (jqXHR, textStatus, errorThrown) { 
            alert('Error'); 
        } 
    });

}

function generateGeneralReport(){

    $("#divMessageErrorContentMachineShowReportOptionsModal").remove();

    var formData = {
        start_date: $("#inputStartDateShowReportOptionsModal").val(),
        end_date: $("#inputEndDateShowReportOptionsModal").val(),
        id_machine: $("#inputIdMachineShowReportOptionsModal").val(),
        function: 'verifyReportForDates'
    };

    $.ajax({
        url: '../../Controllers/SuperUser/MaintenanceController.php', 
        type: 'POST', 
        data: formData, 
        success: function (data){

            var convertedInfo = JSON.parse(data);

            if(convertedInfo['success']){

                if(convertedInfo['one']){
                    
                    //Se hace uso del método para el último mantenimiento
                    generateLastReport();

                }else{

                    //Se guardan los datos que se enviarán
                    let data = {
                        start_date: $("#inputStartDateShowReportOptionsModal").val(),
                        end_date: $("#inputEndDateShowReportOptionsModal").val(),
                        id_machine: $("#inputIdMachineShowReportOptionsModal").val()
                    }

                    //Se crea un formulario
                    var form = document.createElement("form");
                    form.method = "POST";
                    form.action = "reports.php";
                    form.target = "_blank";

                    //Se crean los inputs
                    for (var key in data){
                        if (data.hasOwnProperty(key)) {
                            var input = document.createElement("input");
                            input.type = "hidden";
                            input.name = key;
                            input.value = data[key];
                            form.appendChild(input);
                        }
                    }

                    deleteMessageReportOptions();

                    //Se manda el formulario y redirige
                    document.body.appendChild(form);
                    form.submit();
                }

            }else{
                $("#divMessageErrorMachineShowReportOptionsModal").append(
                    '<h3 id="divMessageErrorContentMachineShowReportOptionsModal" class="text-center text-danger mt-1 fs-5">' + convertedInfo['error'] + '</h3>'
                );
            }

        }, 
        error: function (jqXHR, textStatus, errorThrown) { 
            alert('Error'); 
        } 
    });
}

function deleteMessageReportOptions(){

    $("#divMessageErrorContentMachineShowReportOptionsModal").remove();

    var inputStartDate = document.getElementById("inputStartDateShowReportOptionsModal");
    inputStartDate.value = "";

    var inputEndDate = document.getElementById("inputEndDateShowReportOptionsModal");
    inputEndDate.value = "";
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
            url: '../../Controllers/SuperUser/MachineController.php', 
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
            url: '../../Controllers/SuperUser/MachineController.php', 
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

loadMachines();