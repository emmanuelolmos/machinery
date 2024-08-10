//Funciones para imprimir listas
function showListReports(){

    let tbody = '';
    //Pendiente

}

function showListMaintenance(){

    //Se eliminan los valores anteriores
    $("#tbodyTableMaintenance").remove();
    $("#messageEmptyListMaintenance").remove();

    //Se solicitan los datos de las maquinas que necesitan mantenimiento
    var petition = {function: 'getListMaintenance'};

    $.ajax({ 
        url: '../../Controllers/User/MaintenanceController.php', 
        type: 'POST', 
        data: petition, 
        success: function (data){

            var convertedInfo = JSON.parse(data);

            if(convertedInfo['success']){

                //Se obtiene la información en variables más cortas
                let machines = convertedInfo['machines'];
                let maintenances = convertedInfo['maintenances'];

                //Se imprime la lista de maquinas con mantenimiento pendientes

                let tbody = '<tbody id="tbodyTableMaintenance">';

                //Número de mantenimientos
                for(let i = 0; i < maintenances.length; i++){

                    //Se recorren todas las maquinas registradas
                    for(let j = 0; j < machines.length; j++){

                        if(maintenances[i].machine_id == machines[j].id_machine){

                            let date = "'" + maintenances[i].dateNext_maintenance + "'";
                            let machine = "'" + machines[j].name_machine + "'";

                            //Se imprime la información de la maquina encontrada
                            tbody +=    '<tr style="border: 1px solid black;">' +
                                            '<td>' +
                                                '<div class="col-12">' +
                                                    '<img class="mt-2" src="http://tallergeorgio.hopto.org:5613/tallergeorgio/imagenes/maquinas/' + machines[j].image_machine + '" alt="" style="width: 150px; height: 100px;">' +
                                                '</div>' +
                                                machines[j].name_machine +
                                            '</td>' +
                                            '<td>' + maintenances[i].dateNext_maintenance + '</td>' +
                                            '<td>' +
                                                '<button class="btn btn-dark" onclick="loadDataListMaintenance(' + machines[j].id_machine + ', ' + date + ', ' + machine + ')">' +
                                                    '<i class="bi bi-card-checklist"></i>' +
                                                '</button>' +
                                            '</td>' +
                                        '</tr>';
                        }
                    }
                }

                tbody += '</tbody>';

                $("#tableMaintenance").append(tbody);

            }else{

                //Se vacían los datos
                let machines = convertedInfo['machines'];
                let maintenances = convertedInfo['maintenances'];

                //Se muestran mensajes

                if(machines == 'Error' || maintenances == 'Error'){
                    alert('Ocurrió un problema en la consulta de datos para la lista de mantenimientos pendientes.');
                }else{
                    $("#divMessageEmptyListMaintenance").append(
                        '<h5 id="messageEmptyListMaintenance" class="text-center mt-5 fs-3">Sin mantenimientos pendientes</h5>'
                    );
                }
                
            }

        }, 
        error: function (jqXHR, textStatus, errorThrown) { 
            alert('Error'); 
        } 
    }); 
}

function showListNextMaintenance(){

    //Se eliminan los valores anteriores
    $("#tbodyTableNextMaintenance").remove();
    $("#messageEmptyListNextMaintenance").remove();

    //Se solicitan los datos al controlador

    var petition = {function: 'getListNextMaintenance'}

    $.ajax({ 
        url: '../../Controllers/User/MaintenanceController.php', 
        type: 'POST', 
        data: petition, 
        success: function (data){

            var convertedInfo = JSON.parse(data);

            if(convertedInfo['success']){

                //Se obtiene la información en variables más cortas
                let machines = convertedInfo['machines'];
                let maintenances = convertedInfo['maintenances'];

                //Se imprime la lista de maquinas con mantenimiento pendientes

                let tbody = '<tbody id="tbodyTableNextMaintenance">';

                //Número de mantenimientos
                for(let i = 0; i < maintenances.length; i++){

                    //Se recorren todas las maquinas registradas
                    for(let j = 0; j < machines.length; j++){

                        if(maintenances[i].machine_id == machines[j].id_machine){

                            let date = "'" + maintenances[i].dateNext_maintenance + "'";
                            let machine = "'" + machines[j].name_machine + "'";

                            //Se imprime la información de la maquina encontrada
                            tbody +=    '<tr>' +
                                            '<td>' +
                                                '<div class="col-12">' +
                                                    '<img class="mt-2" src="http://tallergeorgio.hopto.org:5613/tallergeorgio/imagenes/maquinas/' + machines[j].image_machine + '" alt="" style="width: 150px; height: 100px;">' +
                                                '</div>' +
                                                machines[j].name_machine +
                                            '</td>' +
                                            '<td>' + maintenances[i].dateNext_maintenance + '</td>' +
                                            '<td>' +
                                                '<button class="btn btn-dark" onclick="loadDataListMaintenance(' + machines[j].id_machine + ', ' + date + ', ' + machine + ')">' +
                                                    '<i class="bi bi-card-checklist"></i>' +
                                                '</button>' +
                                            '</td>' +
                                        '</tr>';
                        }
                    }
                }

                tbody += '</tbody>';

                $("#tableNextMaintenance").append(tbody);

            }else{

                //Se vacían los datos
                let machines = convertedInfo['machines'];
                let maintenances = convertedInfo['maintenances'];

                //Se muestran mensajes

                if(machines == 'Error' || maintenances == 'Error'){
                    alert('Ocurrió un problema en la consulta de datos para la lista de mantenimientos pendientes.');
                }else{
                    $("#divMessageEmptyNextMaintenance").append(
                        '<h5 id="messageEmptyListNextMaintenance" class="text-center mt-5 fs-3">Sin mantenimientos pendientes</h5>'
                    );
                }
                
            }

        }, 
        error: function (jqXHR, textStatus, errorThrown) { 
            alert('Error'); 
        } 
    }); 
}

function showNextMaintenancesModal(){

    //Se eliminan los valores anteriores
    $("#tbodyTableShowNextMaintenance").remove();
    $("#messageEmptyListShowNextMaintenance").remove();

    //Se solicitan los datos al controlador

    var petition = {function: 'getListNextMaintenance'}

    $.ajax({ 
        url: '../../Controllers/User/MaintenanceController.php', 
        type: 'POST', 
        data: petition, 
        success: function (data){

            var convertedInfo = JSON.parse(data);

            if(convertedInfo['success']){

                //Se obtiene la información en variables más cortas
                let machines = convertedInfo['machines'];
                let maintenances = convertedInfo['maintenances'];

                //Se imprime la lista de maquinas con mantenimiento pendientes

                let tbody = '<tbody id="tbodyTableShowNextMaintenance">';

                //Número de mantenimientos
                for(let i = 0; i < maintenances.length; i++){

                    //Se recorren todas las maquinas registradas
                    for(let j = 0; j < machines.length; j++){

                        if(maintenances[i].machine_id == machines[j].id_machine){

                            let date = "'" + maintenances[i].dateNext_maintenance + "'";
                            let machine = "'" + machines[j].name_machine + "'";

                            //Se imprime la información de la maquina encontrada
                            tbody +=    '<tr>' +
                                            '<td>' +
                                                '<div class="col-12">' +
                                                    '<img class="mt-2" src="http://tallergeorgio.hopto.org:5613/tallergeorgio/imagenes/maquinas/' + machines[j].image_machine + '" alt="" style="width: 150px; height: 100px;">' +
                                                '</div>' +
                                                machines[j].name_machine +
                                            '</td>' +
                                            '<td>' + maintenances[i].dateNext_maintenance + '</td>' +
                                            '<td>' +
                                                '<button class="btn btn-dark" data-bs-dismiss="modal" onclick="loadDataListMaintenance(' + machines[j].id_machine + ', ' + date + ', ' + machine + ')">' +
                                                    '<i class="bi bi-card-checklist"></i>' +
                                                '</button>' +
                                            '</td>' +
                                        '</tr>';
                        }
                    }
                }

                tbody += '</tbody>';

                $("#tableShowNextMaintenance").append(tbody);

            }else{

                //Se vacían los datos
                let machines = convertedInfo['machines'];
                let maintenances = convertedInfo['maintenances'];

                //Se muestran mensajes

                if(machines == 'Error' || maintenances == 'Error'){
                    alert('Ocurrió un problema en la consulta de datos para la lista de mantenimientos pendientes.');
                }else{
                    $("#divMessageEmptyShowNextMaintenance").append(
                        '<h5 id="messageEmptyListShowNextMaintenance" class="text-center mt-5 fs-3">Sin mantenimientos pendientes</h5>'
                    );
                }
                
            }

        }, 
        error: function (jqXHR, textStatus, errorThrown) { 
            alert('Error'); 
        } 
    }); 

    $('#showNextMaintenanceModal').modal('show');
}

//Funciones para cargar la información de los modales
function loadDataListMaintenance(id, establishedDate, name){

    $("#tbodyTableShowListMaintenanceModal").remove();
    $("#messageEmptyShowListMaintenanceModal").remove();
    $("#inputIdShowListMaintenanceModal").remove();
    $("#errorMessageContentShowListMaintenanceModal").remove();
    $("#divImageShowListMaintenanceModal").remove();
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
        url: '../../Controllers/User/CheckController.php', 
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

                //checksready es una comprobación de que todos los checks fueron completados
                if(convertedInfo['checksready']){
                    $("#spacedivImageShowListMaintenanceModal").append(
                        '<div id="divImageShowListMaintenanceModal">' +
                            '<label class="form-label mt-2" for="inputImageShowListMaintenanceModal">Imagenes de evidencia</label>' +
                            '<div class="d-flex">' +
                                '<div style="width: 90%;">' +
                                    '<input class="form-control" id="inputImageShowListMaintenanceModal" name="inputImageShowListMaintenanceModal[]" type="file" accept="image/*" multiple>' +
                                '</div>' +
                                '<div style="width: 10%;">' +
                                    '<button onclick="sendImagesOfMaintenance(' + id + ', ' + date + ')" class="btn btn-dark ms-1" type="button"><i class="bi bi-file-earmark-arrow-up-fill"></i></button>' +
                                '</div>' +
                            '</div>' +
                        '</div>'
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
        url: '../../Controllers/User/CheckController.php', 
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
function sendImagesOfMaintenance(id_machine, establishedDate){

    $("#errorMessageContentShowListMaintenanceModal").remove();
    
    //Se manda la información del formulario
    var formElement = document.getElementById("formShowListMaintenanceModal");

    formData = new FormData(formElement);
    formData.append("id_machine", id_machine);
    formData.append("establishedDate", establishedDate);
    formData.append("function", 'storeReport');

    $.ajax({
        url: '../../Controllers/User/MaintenanceController.php', 
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

//Llamada a las funciones
showListReports();
showListMaintenance();
showListNextMaintenance();