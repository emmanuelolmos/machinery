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
        url: '../../Controllers/Maintenance/MaintenanceController.php', 
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
                                                '<button class="btn btn-dark" onclick="loadDataListMaintenance(' + machines[j].id_machine + ')">' +
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
        url: '../../Controllers/Maintenance/MaintenanceController.php', 
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
                                                '<button class="btn btn-primary">' +
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

//Funciones para cargar la información de los modales
function loadDataListMaintenance(id){

    $("#tbodyTableNextMaintenance").remove();
    $("#messageEmptyShowListMaintenanceModal").remove();


    //Se obtienen la información de los checks asignados a la maquina
    var petition = {
        id_machine: id,
        function: 'getChecksAssigned'
    };
    
    $.ajax({ 
        url: '../../Controllers/Check/CheckController.php', 
        type: 'POST', 
        data: petition, 
        success: function (data){

            var convertedInfo = JSON.parse(data);

            if(convertedInfo['success']){

                let checks = convertedInfo['checks'];

                //Se imprime la lista de maquinas con mantenimiento pendientes

                let tbody = '<tbody id="tbodyTableNextMaintenance">';

                for(let i = 0; i < checks.length; i++){
                    tbody +=    '<tr>' +
                                    '<td>' + checks[i].content_assigned_check + '</td>' +
                                    '<td>';

                    if(checks[i].status_assigned_check == '1'){
                        //Check completo
                        tbody += '<button type="button" class="btn text-success" onclick="changeStatusOfCheck(' + id + ', ' + checks[i].id_assigned_check + ', ' + checks[i].status_assigned_check + ')"><i class="bi bi-check-circle-fill"></i></button>';
                    }else{
                        //Check incompleto
                        tbody += '<button type="button" class="btn" onclick="changeStatusOfCheck(' + id + ', ' + checks[i].id_assigned_check + ', ' + checks[i].status_assigned_check + ')"><i class="bi bi-circle"></i></button>';
                    }

                    tbody +=        '</td>' +
                                '</tr>';
                }

                tbody += '</tbody>';

                $("#tableShowListMaintenanceModal").append(tbody);

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
function changeStatusOfCheck(id_machine, id_assigned_check, status_assigned_check){

    $("#errorMessageContentShowListMaintenanceModal").remove();
    
    //Se manda al controlador
    var petition = {
        id_assigned_check: id_assigned_check,
        status_assigned_check: status_assigned_check,
        function: 'changeStatusOfCheck'
    };

    $.ajax({ 
        url: '../../Controllers/Check/CheckController.php', 
        type: 'POST', 
        data: petition, 
        success: function (data){

            loadDataListMaintenance(id_machine);

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

//Llamada a las funciones
showListReports();
showListMaintenance();
showListNextMaintenance();