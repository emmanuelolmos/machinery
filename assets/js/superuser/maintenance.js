//Funciones para imprimir listas
function showListReports(){

    $("#messageEmptyListReportsMaintenance").remove();
    $("#tbodyTableReportsMaintenance").remove();

    //Se solicitan los datos de las maquinas
    var petition = {function: 'getMachines'};

    $.ajax({
        url: '../../Controllers/SuperUser/MachineController.php', 
        type: 'POST', 
        data: petition, 
        success: function (data){

            var convertedInfo = JSON.parse(data);

            if(convertedInfo['success']){

                let machines = convertedInfo['machines'];

                //Se imprime la lista de maquinas
                let tbody = '<tbody id="tbodyTableReportsMaintenance">';

                //Número de maquinas
                for(let i = 0; i < machines.length; i++){

                    let machine = "'" + machines[i].name_machine + "'";

                    //Se imprime la información de la maquina encontrada
                    tbody +=    '<tr style="border: 1px solid black;">' +
                                    '<td>' +
                                        '<div class="col-12">' +
                                            '<img class="mt-2" src="http://tallergeorgio.hopto.org:5613/tallergeorgio/imagenes/maquinas/' + machines[i].image_machine + '" alt="" style="width: 150px; height: 100px;">' +
                                        '</div>' +
                                        machines[i].name_machine +
                                    '</td>' +
                                    '<td>' +
                                        '<button class="btn btn-dark" onclick="showReportOptionsModal(' + machines[i].id_machine + ')">' +
                                            '<i class="bi bi-filetype-pdf"></i>' +
                                        '</button>' +
                                    '</td>' +
                                '</tr>';
                }

                tbody += '</tbody>';

                $("#tableReportsMaintenance").append(tbody);

            }else{

                $("#divMessageEmptyListReportsMaintenance").append(
                    '<h5 id="messageEmptyListReportsMaintenance" class="text-center mt-5 fs-3">Sin maquinas registradas</h5>'
                );
                
            }

        }, 
        error: function (jqXHR, textStatus, errorThrown) { 
            alert('Error'); 
        } 
    });

}

function showListMaintenance(){

    //Se eliminan los valores anteriores
    $("#tbodyTableMaintenance").remove();
    $("#messageEmptyListMaintenance").remove();

    //Se solicitan los datos de las maquinas que necesitan mantenimiento
    var petition = {function: 'getListMaintenance'};

    $.ajax({ 
        url: '../../Controllers/SuperUser/MaintenanceController.php', 
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
        url: '../../Controllers/SuperUser/MaintenanceController.php', 
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
        url: '../../Controllers/SuperUser/MaintenanceController.php', 
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

function showReportOptionsModal(id){

    $("#inputIdMachineShowReportOptionsModal").remove();

    $("#divIdMachineShowReportOptionsModal").append(
        '<input id="inputIdMachineShowReportOptionsModal" type="text" value="' + id + '" hidden></input>'
    );

    $("#showReportOptionsModal").modal('show');

}

function showListReportsModal(){

    $("#messageEmptyListReportsMaintenanceModal").remove();
    $("#tbodyTableReportsMaintenanceModal").remove();

    //Se solicitan los datos de las maquinas
    var petition = {function: 'getMachines'};

    $.ajax({
        url: '../../Controllers/SuperUser/MachineController.php', 
        type: 'POST', 
        data: petition, 
        success: function (data){

            var convertedInfo = JSON.parse(data);

            if(convertedInfo['success']){

                let machines = convertedInfo['machines'];

                //Se imprime la lista de maquinas
                let tbody = '<tbody id="tbodyTableReportsMaintenanceModal">';

                //Número de maquinas
                for(let i = 0; i < machines.length; i++){

                    let machine = "'" + machines[i].name_machine + "'";

                    //Se imprime la información de la maquina encontrada
                    tbody +=    '<tr style="border: 1px solid black;">' +
                                    '<td>' +
                                        '<div class="col-12">' +
                                            '<img class="mt-2" src="http://tallergeorgio.hopto.org:5613/tallergeorgio/imagenes/maquinas/' + machines[i].image_machine + '" alt="" style="width: 150px; height: 100px;">' +
                                        '</div>' +
                                        machines[i].name_machine +
                                    '</td>' +
                                    '<td>' +
                                        '<button class="btn btn-dark" onclick="showReportOptionsModal(' + machines[i].id_machine + ')">' +
                                            '<i class="bi bi-filetype-pdf"></i>' +
                                        '</button>' +
                                    '</td>' +
                                '</tr>';
                }

                tbody += '</tbody>';

                $("#tableReportsMaintenanceModal").append(tbody);

            }else{

                $("#divMessageEmptyListReportsMaintenanceModal").append(
                    '<h5 id="messageEmptyListReportsMaintenanceModal" class="text-center mt-5 fs-3">Sin maquinas registradas</h5>'
                );
                
            }

        }, 
        error: function (jqXHR, textStatus, errorThrown) { 
            alert('Error'); 
        } 
    });

    $('#showListReportsModal').modal('show');
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

function deleteAlertMaintenance(){
    $("#alertMaintenances").remove();
}

//Llamada a las funciones
showListReports();
showListMaintenance();
showListNextMaintenance();
deleteAlertMaintenance();