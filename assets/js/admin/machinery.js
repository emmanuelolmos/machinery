//Funciones a utilizar
function loadData(){
    
    var petition = {
        function: 'getCompany'
    };
    
    $.ajax({ 
        url: '../../Controllers/Admin/MachineryController.php', 
        type: 'POST', 
        data: petition, 
        success: function (data){

            var convertedInfo = JSON.parse(data);

            if(convertedInfo['success']){

                $("#hNameCompany").remove();
                $("#itemCompanyAddMachineryModal").remove();

                $("#divNameCompany").append(
                    '<h1 id="hNameCompany" class="fs-3 ">Empresa: ' + convertedInfo['company'].nombre_empresa + '</h1>'
                );

                $("#selectCompanyAddMachineryModal").append(
                    '<option id="itemCompanyAddMachineryModal" value="' + convertedInfo['company'].ID_empresa + '" selected>' + convertedInfo['company'].nombre_empresa + '</option>'
                );

                $("#selectCompanyEditMachineryModal").append(
                    '<option id="itemCompanyEditMachineryModal" value="' + convertedInfo['company'].ID_empresa + '" selected>' + convertedInfo['company'].nombre_empresa + '</option>'
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

function loadMachinery(){

    var petition = {
        function: 'getMachinery'
    };

    $.ajax({ 
        url: '../../Controllers/Admin/MachineryController.php', 
        type: 'POST', 
        data: petition, 
        success: function (data){

            var convertedInfo = JSON.parse(data);

            if(convertedInfo['success']){

                //alert(convertedInfo['machinery']['0'].marca);
                let cards = '';

                //Se llena con el siguiente ciclo
                for(let i=0; i < convertedInfo['machinery'].length; i++){
                    cards += '<div class="col-md-4 mt-3 mb-3 mb-sm-0">' +
                                '<div class="card">' +
                                    '<img class="card-img-top" src="http://tallergeorgio.hopto.org:5613/tallergeorgio/imagenes/maquinas/' + convertedInfo['machinery'][i].foto_maquina + '" alt="">' +
                                    '<div class="card-body">' +
                                        //Nombre y opciones
                                        '<div class="d-flex justify-content-between mb-2">' +
                                            '<h5 class="card-title fs-6 mt-2">' + convertedInfo['machinery'][i].nombre_maquina.toUpperCase() + '</h5>' +
                                            '<button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-list"></i></button>' +
                                            '<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">' +
                                                '<li class="dropdown-item" data-bs-toggle="modal" data-bs-target="#editMachineryModal" onclick="loadDataMachinery(' + convertedInfo['machinery'][i].ID_maquina + ')">Editar maquina</li>' +
                                                '<li class="dropdown-item">Asignar mantenimiento</li>' +
                                                '<li class="dropdown-item">Crear checks</li>' +
                                                '<li class="dropdown-item">Generar revisiones</li>' +
                                                '<li class="dropdown-item" onclick="deleteMachinery(' + convertedInfo['machinery'][i].ID_maquina + ')">Eliminar maquinas</li>' +
                                            '</ul>' +
                                        '</div>' +
                                        //Descripción
                                        '<p class="card-text">' + convertedInfo['machinery'][i].observaciones +'</p>' +
                                        //Información adicional
                                        '<div class="d-flex justify-content-between mb-3">' +
                                            '<div class="bg-primary ms-1 me-2 w-50 rounded-2" style="color: #FEFEFE;">' +
                                                '<p class="mt-2 fw-bold text-center">Marca: ' + convertedInfo['machinery'][i].marca + '</p>' +
                                            '</div>' +
                                            '<div class="bg-primary ms-2 me-1 w-50 rounded-2" style="color: #FEFEFE;">' +
                                                '<p class="mt-2 fw-bold text-center">Modelo: ' + convertedInfo['machinery'][i].modelo + '</p>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="d-flex justify-content-between mb-3">' +
                                            '<div class="bg-secondary ms-1 me-2 w-50 rounded-2" style="color: #FEFEFE;">' +
                                                '<p class="mt-2 fw-bold text-center">Fecha de compra: ' + convertedInfo['machinery'][i].fecha_compra + '</p>' +
                                            '</div>' +
                                            '<div class="bg-secondary ms-2 me-1 w-50 rounded-2" style="color: #FEFEFE;">' +
                                                '<p class="mt-2 fw-bold text-center">N. Serie: ' + convertedInfo['machinery'][i].nserie + '</p>' +
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

function findMachinery(){

    var petitionData = {
        name: $("#inputNameMachinery").val(),
        function: 'findMachinery'
    };

    $.ajax({ 
        url: '../../Controllers/Admin/MachineryController.php', 
        type: 'POST', 
        data: petitionData, 
        success: function (data){

            $("#divRowTable").remove();

            $("#error").remove();

            $("#brCards").remove();

            $("#divPrincipalTable").append(
                '<div id="divRowTable" class="row"></div>'
            );

            var convertedInfo = JSON.parse(data);

            if(convertedInfo['success']){

                //alert(convertedInfo['machinery']['0'].marca);
                let cards = '';

                //Se llena con el siguiente ciclo
                for(let i=0; i < convertedInfo['machinery'].length; i++){
                    cards += '<div class="col-md-4 mt-3 mb-3 mb-sm-0">' +
                                '<div class="card">' +
                                    '<img class="card-img-top" src="http://tallergeorgio.hopto.org:5613/tallergeorgio/imagenes/maquinas/' + convertedInfo['machinery'][i].foto_maquina + '" alt="">' +
                                    '<div class="card-body">' +
                                        //Nombre y opciones
                                        '<div class="d-flex justify-content-between mb-2">' +
                                            '<h5 class="card-title fs-6 mt-2">' + convertedInfo['machinery'][i].nombre_maquina.toUpperCase() + '</h5>' +
                                            '<button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-list"></i></button>' +
                                            '<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">' +
                                                '<li class="dropdown-item" data-bs-toggle="modal" data-bs-target="#editMachineryModal" onclick="loadDataMachinery(' + convertedInfo['machinery'][i].ID_maquina + ')">Editar maquina</li>' +
                                                '<li class="dropdown-item">Asignar mantenimiento</li>' +
                                                '<li class="dropdown-item">Crear checks</li>' +
                                                '<li class="dropdown-item">Generar revisiones</li>' +
                                                '<li class="dropdown-item" onclick="deleteMachinery(' + convertedInfo['machinery'][i].ID_maquina + ')">Eliminar maquinas</li>' +
                                            '</ul>' +
                                        '</div>' +
                                        //Descripción
                                        '<p class="card-text">' + convertedInfo['machinery'][i].observaciones +'</p>' +
                                        //Información adicional
                                        '<div class="d-flex justify-content-between mb-3">' +
                                            '<div class="bg-primary ms-1 me-2 w-50 rounded-2" style="color: #FEFEFE;">' +
                                                '<p class="mt-2 fw-bold text-center">Marca: ' + convertedInfo['machinery'][i].marca + '</p>' +
                                            '</div>' +
                                            '<div class="bg-primary ms-2 me-1 w-50 rounded-2" style="color: #FEFEFE;">' +
                                                '<p class="mt-2 fw-bold text-center">Modelo: ' + convertedInfo['machinery'][i].modelo + '</p>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="d-flex justify-content-between mb-3">' +
                                            '<div class="bg-secondary ms-1 me-2 w-50 rounded-2" style="color: #FEFEFE;">' +
                                                '<p class="mt-2 fw-bold text-center">Fecha de compra: ' + convertedInfo['machinery'][i].fecha_compra + '</p>' +
                                            '</div>' +
                                            '<div class="bg-secondary ms-2 me-1 w-50 rounded-2" style="color: #FEFEFE;">' +
                                                '<p class="mt-2 fw-bold text-center">N. Serie: ' + convertedInfo['machinery'][i].nserie + '</p>' +
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

function loadDataMachinery(id){

    var petition = {
        id: id,
        function: 'getDataMachinery'
    };

    $.ajax({ 
        url: '../../Controllers/Admin/MachineryController.php', 
        type: 'POST', 
        data: petition, 
        success: function (data){

            var convertedInfo = JSON.parse(data);

            if(convertedInfo['success']){

                //Se borran los datos en caso de ya haber sido solicitados
                $("#inputIdEditMachineryModal").remove();
                $("#inputNameEditMachineryModal").remove();
                $("#inputMarkEditMachineryModal").remove();
                $("#inputModelEditMachineryModal").remove();
                $("#inputSerieEditMachineryModal").remove();
                $("#inputDescriptionEditMachineryModal").remove();
                $("#inputDateEditMachineryModal").remove();
                $("#imageEditMachineryModal").remove();

                //Para el caso que el usuario haya enviado el form con datos erróneos
                 $("#errorMessageContentEditMachineryModal").remove();

                //Se borra la alerta de error en el caso de que se hayan ingresado los datos incorrectos
                $('#errorMessageContentEditUser').remove();

                //Se imprime la información

                $("#divIdEditMachineryModal").append(
                    '<input id="inputIdEditMachineryModal" name="inputIdEditMachineryModal" type="hidden" value="' + id + '">'
                );

                $("#divNameEditMachineryModal").append(
                    '<input id="inputNameEditMachineryModal" name="inputNameEditMachineryModal" type="text" placeholder="Ingresa el nombre" style="margin-left: 8px; width: 250px;" value="' + convertedInfo['machinery'].nombre_maquina + '">'
                );

                $("#divMarkEditMachineryModal").append(
                    '<input id="inputMarkEditMachineryModal" name="inputMarkEditMachineryModal" type="text" placeholder="Ingresa la marca" style="margin-left: 8px; width: 250px;" value="' + convertedInfo['machinery'].marca + '">'
                );

                $("#divModelEditMachineryModal").append(
                    '<input id="inputModelEditMachineryModal" name="inputModelEditMachineryModal" type="text" placeholder="Ingresa el modelo" style="margin-left: 8px; width: 250px;" value="' + convertedInfo['machinery'].modelo + '">'
                );

                $("#divSerieEditMachineryModal").append(
                    '<input id="inputSerieEditMachineryModal" name="inputSerieEditMachineryModal" type="text" placeholder="Ingresa el número de serie" style="margin-left: 8px; width: 250px;" value="' + convertedInfo['machinery'].nserie + '">'
                );

                $("#divDescriptionEditMachineryModal").append(
                    '<textarea id="inputDescriptionEditMachineryModal" name="inputDescriptionEditMachineryModal" style="margin-left: 8px; width:250px" placeholder="Ingresa las observaciones">' + convertedInfo['machinery'].observaciones + '</textarea>'
                );

                $("#divDateEditMachineryModal").append(
                    '<input id="inputDateEditMachineryModal" name="inputDateEditMachineryModal" type="date" required pattern="\d{4}-\d{2}-\d{2}" style="margin-left: 8px; width: 250px;" value="' + convertedInfo['machinery'].fecha_compra + '">'
                );

                $("#divImageEditMachineryModal").append(
                    '<img id="imageEditMachineryModal" class="mx-auto" src="http://tallergeorgio.hopto.org:5613/tallergeorgio/imagenes/maquinas/' + convertedInfo['machinery'].foto_maquina + '" style="width: 350px; height:auto;" alt="">'
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

function deleteMachinery(id){
    
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
                function: 'deleteMachinery',
                id: id
            };
            
            $.ajax({ 
                url: '../../Controllers/Admin/MachineryController.php', 
                type: 'POST', 
                data: petition, 
                success: function (data){
        
                    var convertedInfo = JSON.parse(data);
        
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


//Formularios de los modales

//Nueva maquina
$(document).ready(function () { 
    $('#formAddMachineryModal').submit(function (e) { 
        e.preventDefault(); 

        //Para el caso que el usuario haya enviado el form con datos erróneos
        $("#errorMessageContentAddMachineryModal").remove();

        var formElement = document.getElementById("formAddMachineryModal");
        formData = new FormData(formElement);
        formData.append("function", 'insertMachinery');

        $.ajax({
            url: '../../Controllers/Admin/MachineryController.php', 
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
                    $("#errorMessageAddMachineryModal").append(
                        '<h1 id="errorMessageContentAddMachineryModal" class="text-danger fw-bold fs-6 mb-3">' + convertedInfo['error'] + '</h1>'
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
    $('#formEditMachineryModal').submit(function (e) { 
        e.preventDefault(); 

        //Para el caso que el usuario haya enviado el form con datos erróneos
        $("#errorMessageContentEditMachineryModal").remove();

        var formElement = document.getElementById("formEditMachineryModal");
        formData = new FormData(formElement);
        formData.append("function", 'updateMachinery');

        $.ajax({
            url: '../../Controllers/Admin/MachineryController.php', 
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
                    $("#errorMessageEditMachineryModal").append(
                        '<h1 id="errorMessageContentEditMachineryModal" class="text-danger fw-bold fs-6 mb-3">' + convertedInfo['error'] + '</h1>'
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
loadMachinery();