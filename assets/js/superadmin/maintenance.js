//Funciones para imprimir listas
function showListReports(){

    let tbody = '';
    //Pendiente

}

function showListNexts(){

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
                                                '<button class="btn btn-dark">' +
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

//Llamada a las funciones
showListReports();
showListNexts();
showListMaintenance();