//Funciones para eliminar mensajes
function deleteMessageAddCheck(){
    $("#errorMessageContentAddCheckModal").remove();
}
function deleteMessageAddCategory(){
    $("#errorMessageContentAddCategoryModal").remove();
}

//Funciones para cargar la información

function loadTableChecks(){

    var petition = {function: 'getChecks'};
    
    $.ajax({ 
        url: '../../Controllers/Check/CheckController.php', 
        type: 'POST', 
        data: petition, 
        success: function (response){

            var convertedInfo = JSON.parse(response);

            if(convertedInfo['success']){

                let tbody = '';

                for(let i = 0; i < convertedInfo['checks'].length; i++){
                    tbody +=    '<tr>' +
                                    '<td style="padding: 10px;">' + convertedInfo['checks'][i].content_check + '</td>' +
                                    '<td class="text-center" style="padding: 10px;">' +
                                        '<button class="btn btn-success" onclick="">' +
                                            '<i class="bi bi-plus-square"></i>' +
                                        '</button>' +
                                    '</td>' +
                                '</tr>';
                }

                $("#tbodyChecks").append(tbody);
                
            }else{

                switch(convertedInfo['error']){
                    case 'Error':
                        $("#divMessageTableChecks").append(
                            '<h5 id="errorTableChecks" class="text-danger">Error en la conexión con la base de datos.</h5>'
                        );
                        break;
                    case 'Empty':
                        $("#divMessageTableChecks").append(
                            '<h5 id="errorTableChecks" class="text-danger">Sin registros.</h5>'
                        );
                        break;
                    default:
                        $("#divMessageTableChecks").append(
                            '<h5 id="errorTableChecks" class="text-danger">Error desconocido.</h5>'
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

function loadCardsCategory(){
    var petition = {function: 'getCategories'};
    
    $.ajax({ 
        url: '../../Controllers/Category/CategoryController.php', 
        type: 'POST', 
        data: petition, 
        success: function (response){

            var convertedInfo = JSON.parse(response);

            if(convertedInfo['success']){

                let cards = '';

                for(let i = 0; i < convertedInfo['categories'].length; i++){
                    cards +=    '<div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 mt-2 mb-2">' +
                                    '<div class="card">' +
                                        '<img class="mx-auto mt-1" src="http://tallergeorgio.hopto.org:5613/tallergeorgio/imagenes/maquinas/' + convertedInfo['categories'][i].image_category + '" style="width: 120px; height:100px;" alt="">' +
                                        '<button class="btn btn-primary btn-sm dropdown-toggle" type="button" id="dropdownCategoriesBtn" data-bs-toggle="dropdown" aria-expanded="false">' + convertedInfo['categories'][i].name_category + '</button>' +
                                        '<ul class="dropdown-menu" aria-labelledby="dropdownCategoriesBtn">' +
                                        '</ul>' +
                                    '</div>' +
                                '</div>';
                }

                $("#cardsCategories").append(cards);

            }else{

                switch(convertedInfo['error']){
                    case 'Error':
                        $("#divMessageCardsCategories").append(
                            '<h5 id="errorTableChecks" class="text-danger">Error en la conexión con la base de datos.</h5>'
                        );
                        break;
                    case 'Empty':
                        $("#divMessageCardsCategories").append(
                            '<h5 id="errorTableChecks" class="text-danger">Sin registros.</h5>'
                        );
                        break;
                    default:
                        $("#divMessageCardsCategories").append(
                            '<h5 id="errorTableChecks" class="text-danger">Error desconocido.</h5>'
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

//Formularios de los modales

//Nuevo check
$(document).ready(function () { 
    $('#formAddCheckModal').submit(function (e) { 
        e.preventDefault(); 

        //Para el caso que el usuario haya enviado el form con datos erróneos
        $("#errorMessageContentAddCheckModal").remove();

        formData = new FormData(this);
        formData.append("function", 'insertCheck');

        $.ajax({
            url: '../../Controllers/Check/CheckController.php', 
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
                    $("#errorMessageAddCheckModal").append(
                        '<h1 id="errorMessageContentAddCheckModal" class="text-danger fw-bold fs-6 mb-3">' + convertedInfo['error'] + '</h1>'
                    );
                }

            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                alert('Error'); 
            } 
        });
    }); 
}); 

//Nueva categoria
$(document).ready(function () { 
    $('#formAddCategory').submit(function (e) { 
        e.preventDefault(); 

        //Para el caso que el usuario haya enviado el form con datos erróneos
        $("#errorMessageContentAddCategoryModal").remove();

        formData = new FormData(this);
        formData.append("function", 'insertCategory');

        $.ajax({
            url: '../../Controllers/Category/CategoryController.php', 
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
                    $("#errorMessageAddCategoryModal").append(
                        '<h1 id="errorMessageContentAddCategoryModal" class="text-danger fw-bold fs-6 mb-3">' + convertedInfo['error'] + '</h1>'
                    );
                }

            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                alert('Error'); 
            } 
        });
    }); 
}); 

//Llamado de funciones al iniciar
loadTableChecks();
loadCardsCategory();