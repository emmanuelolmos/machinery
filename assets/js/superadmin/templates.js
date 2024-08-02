//Variable template
let template_id = [];
let template_content = [];

//Funciones para eliminar mensajes
function deleteMessageAddCheck(){
    $("#errorMessageContentAddCheckModal").remove();
}
function deleteMessageAddCategory(){
    $("#errorMessageContentAddCategoryModal").remove();
}
function deleteMessageStatusAddTemplate(){
    $("#messageStatusTemplate").remove();
}

//Funciones para cargar la información

function loadCategories(){

    //Se remueven las categorias en caso de haberlas agregado
    $("#selectCategoryAddTemplate").remove();

    var petition = {function: 'getCategories'};
    
    $.ajax({ 
        url: '../../Controllers/Category/CategoryController.php', 
        type: 'POST', 
        data: petition, 
        success: function (response){

            var convertedInfo = JSON.parse(response);

            if(convertedInfo['success']){

                //Se imprime el select
                let selectCategories = '<select class="form-select" name="selectCategoryAddTemplate" id="selectCategoryAddTemplate"></select>';
                $("#divCategoryAddTemplate").append(selectCategories);

                let optionsCategories = '';

                for(let i = 0; i < convertedInfo['categories'].length; i++){

                    optionsCategories += '<option value="' + convertedInfo['categories'][i].id_category + '">' + convertedInfo['categories'][i].name_category + '</option>';
                }

                $("#selectCategoryAddTemplate").append(optionsCategories);
                
            }else{

                //Se imprime el select
                let selectCategories = '<select class="form-select" name="selectCategoryAddTemplate" id="selectCategoryAddTemplate"></select>';
                $("#divCategoryAddTemplate").append(selectCategories);

                switch(convertedInfo['error']){
                    case 'Error':
                        $("#selectCategoryAddTemplate").append(
                            '<option value="">No se cargaron correctamente las categorias</option>'
                        );
                        break;
                    case 'Empty':
                        $("#selectCategoryAddTemplate").append(
                            '<option value="">No hay categorias registradas</option>'
                        );
                        break;
                    default:
                        $("#selectCategoryAddTemplate").append(
                            '<option value="">Error desconocido</option>'
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

function loadTableChecks(){

    $("#tbodyChecks").remove();

    $("#tbodyChecksModal").remove();

    $("#tableChecks").append(
        '<tbody id="tbodyChecks"></tbody>'
    );

    $("#tableChecksModal").append(
        '<tbody id="tbodyChecksModal"></tbody>'
    );

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

                    let content_check = "'" + convertedInfo['checks'][i].content_check + "'";

                    tbody +=    '<tr>' +
                                    '<td style="padding: 10px;">' + convertedInfo['checks'][i].content_check + '</td>' +
                                    '<td class="text-center" style="padding: 10px;">' +
                                        '<button class="btn btn-success" onclick="addCheck(' + convertedInfo['checks'][i].id_check + ', ' + content_check + ');">' +
                                            '<i class="bi bi-plus-square"></i>' +
                                        '</button>' +
                                    '</td>' +
                                '</tr>';
                }

                $("#tbodyChecks").append(tbody);
                $("#tbodyChecksModal").append(tbody);
                
            }else{

                switch(convertedInfo['error']){
                    case 'Error':
                        $("#divMessageTableChecks").append(
                            '<h5 id="errorTableChecks" class="text-danger">Error en la conexión con la base de datos.</h5>'
                        );
                        $("#divMessageTableModal").append(
                            '<h5 id="errorTableChecks" class="text-danger">Error en la conexión con la base de datos.</h5>'
                        );
                        break;
                    case 'Empty':
                        $("#divMessageTableChecks").append(
                            '<h5 id="errorTableChecks" class="text-danger">Sin registros.</h5>'
                        );
                        $("#divMessageTableChecksModal").append(
                            '<h5 id="errorTableChecks" class="text-danger">Sin registros.</h5>'
                        );
                        break;
                    default:
                        $("#divMessageTableChecks").append(
                            '<h5 id="errorTableChecks" class="text-danger">Error desconocido.</h5>'
                        );
                        $("#divMessageTableChecksModal").append(
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

    $("#cardsCategories").remove();
    $("#divCardsCategories").append('<div id="cardsCategories" class="card-container"></div>');

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
                                        '<ul class="dropdown-menu" aria-labelledby="dropdownCategoriesBtn">'; 
                                        
                    if(convertedInfo['templates'] == 'Empty' || convertedInfo['templates'] == 'Error'){
                        cards += '<li class="dropdown-item">Sin plantillas</li>';
                    }else{

                        //let empty = true;

                        for(let j = 0; j < convertedInfo['templates'].length; j++){

                            if(convertedInfo['categories'][i].id_category == convertedInfo['templates'][j].category_id){
                                cards += '<li class="dropdown-item">' + convertedInfo['templates'][j].name_template + '</li>';
                                //empty = false;
                            }
                        }

                        cards += '<li class="dropdown-item" onclick="deleteCategory(' + convertedInfo['categories'][i].id_category + ')">Eliminar categoria</li>';

                    }                 
                    
                                        
                    cards +=             '</ul>' +
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

function loadTemplate(){

    if(template_id.length > 0){

        //Se remueve el mensaje de plantilla vacía y se agrega el botón para registrar

        $("#messageTemplateEmpty").remove();
        $("#btnAddTemplate").remove();
        $("#tbodyTemplate").remove();

        $("#tableTemplate").append(
            '<tbody id="tbodyTemplate"></tbody>'
        );

        $("#divDownAddTemplate").append(
            '<button id="btnAddTemplate" onclick="storeTemplate()" class="btn btn-primary">Registrar</button>'
        );

        let tbody = '';

        //Se imprimen los checks
        for(let i = 0; i < template_id.length; i++){
            tbody +=    '<tr>' +
                            '<td style="padding: 10px;">' + template_content[i] + '</td>' +
                            '<td style="padding: 10px;">' +
                                '<button class="btn btn-danger" onclick="deleteCheck(' + template_id[i] + ')">' +
                                    '<i class="bi bi-trash-fill"></i>' +
                                '</button>' +
                            '</td>'
                        '</tr>';
        }

        $("#tbodyTemplate").append(tbody);
        
    }else{

        $("#messageTemplateEmpty").remove();
        $("#btnAddTemplate").remove();
        $("#tbodyTemplate").remove();

        $("#tableTemplate").append(
            '<tbody id="tbodyTemplate"></tbody>'
        );

        $("#divDownAddTemplate").append(
            '<h5 id="messageTemplateEmpty" class="fs-4 mt-3">Agrega un check o comienza a partir de una plantilla</h5>'
        );
    }
}

function loadDeleteChecks(){

    $("#tbodyDeleteChecksModal").remove();
    $("#tableDeleteChecksModal").append('<tbody id="tbodyDeleteChecksModal"></tbody>');

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

                    let content_check = "'" + convertedInfo['checks'][i].content_check + "'";

                    tbody +=    '<tr>' +
                                    '<td style="padding: 10px;">' + convertedInfo['checks'][i].content_check + '</td>' +
                                    '<td class="text-center" style="padding: 10px;">' +
                                        '<button class="btn btn-danger" onclick="deleteCheckDB(' + convertedInfo['checks'][i].id_check + ', ' + content_check + ');">' +
                                            '<i class="bi bi-trash-fill"></i>' +
                                        '</button>' +
                                    '</td>' +
                                '</tr>';
                }

                $("#tbodyDeleteChecksModal").append(tbody);
                
            }else{

                switch(convertedInfo['error']){
                    case 'Error':
                        $("#divMessageDeleteTableChecks").append(
                            '<h5 id="errorDeleteTableChecks" class="text-danger">Error en la conexión con la base de datos.</h5>'
                        );
                        break;
                    default:
                        $("#divMessageDeleteTableChecks").append(
                            '<h5 id="errorDeleteTableChecks" class="text-danger">Error desconocido.</h5>'
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

function addCheck(id, content){

    deleteMessageStatusAddTemplate()

    //Se verifica que el check no haya sido ya agregado

    let confirmation = true;

    for(let i = 0; i < template_id.length; i++){

        if(template_id[i] == id){
            confirmation = false;
        }

    }

    //De no haber sido agregado se guarda en el array
    if(confirmation){

        template_id.push(id);
        template_content.push(content);
        //alert(template);
        loadTemplate();

    }else{

        Swal.fire({
            title: "Error",
            text: "Ya ingresaste el check",
            icon: "error"
          });

    }
    
}

function deleteCheck(id){

    let space;
    
    //Se busca el lugar del valor en el array
    for(let i = 0; i < template_id.length; i++){

        if(template_id[i] == id) space = i;

    }

    //Se borra el valor de los arrays
    template_id.splice(space, 1);
    template_content.splice(space, 1);
    
    loadTemplate();
}

function deleteCheckDB(id){

    var formData = {
        id_check: id,
        function: 'deleteCheck'
    }

    $.ajax({ 
        url: '../../Controllers/Check/CheckController.php', 
        type: 'POST', 
        data: formData, 
        success: function (data){

            var convertedInfo = JSON.parse(data);

            if(convertedInfo['success']){

                loadTableChecks();
                loadDeleteChecks();
                
            }else{

                $("#divMessageDeleteStatusChecksModal").append(
                    '<h5 class="text-danger fs-3">Ocurrió un error, el check no se eliminó</h5>'
                );
                
            }

        }, 
        error: function (jqXHR, textStatus, errorThrown) { 
            alert('Error'); 
        } 
    });
}

function deleteCategory(id){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: true
      });
      swalWithBootstrapButtons.fire({
        title: "Estás seguro de eliminar la categoría?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

            var formData = {
                id_category: id,
                function: 'deleteCategory'
            };

            $.ajax({ 
                url: '../../Controllers/Category/CategoryController.php', 
                type: 'POST', 
                data: formData, 
                success: function (data){
        
                    var convertedInfo = JSON.parse(data);
        
                    if(convertedInfo['success']){
        
                        swalWithBootstrapButtons.fire({
                            title: "Eliminada",
                            text: "La categoría se eliminó correctamente",
                            icon: "success"
                        });

                        loadCardsCategory();
                        
                    }else{

                        swalWithBootstrapButtons.fire({
                            title: "Cancelado",
                            text: "La categoría no se eliminó",
                            icon: "error"
                          });
                    }
        
                }, 
                error: function (jqXHR, textStatus, errorThrown) { 
                    alert('Error'); 
                } 
            });

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "La categoría no se eliminó",
            icon: "error"
          });
        }
      });
}

function storeTemplate(){

    $("#messageStatusTemplate").remove();

    var formData = {
        name: $("#inputNameAddTemplate").val(),
        category: $("#selectCategoryAddTemplate").val(),
        checks: template_id,
        function: 'storeTemplate'
    };

    $.ajax({ 
        url: '../../Controllers/Template/TemplateController.php', 
        type: 'POST', 
        data: formData, 
        success: function (data){

            var convertedInfo = JSON.parse(data);

            if(convertedInfo['success']){

                //Se elimina el nombre ingresado a la plantilla
                var inputName = document.getElementById("inputNameAddTemplate");
                inputName.value = "";

                //Se borran los valores de los arrays y se recarga la tabla
                template_id = [];
                template_content = [];

                loadTemplate();

                $("#divStatusTemplate").append(
                    '<h4 id="messageStatusTemplate" class="mt-2 fs-5 text-center text-success">Se registró la plantilla correctamente</h4>'
                );
                
            }else{
                $("#divStatusTemplate").append(
                    '<h4 id="messageStatusTemplate" class="mt-2 fs-5 text-center text-danger">' + convertedInfo['error'] + '</h4>'
                );
            }

        }, 
        error: function (jqXHR, textStatus, errorThrown) { 
            alert('Error'); 
        } 
    });
    
}

function showChecks(){

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

                    loadTableChecks();
                    $("#errorMessageAddCheckModal").append(
                        '<h1 id="errorMessageContentAddCheckModal" class="text-success fw-bold fs-6 mb-3">Check registrado correctamente</h1>'
                    );
                    
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
loadCategories();
loadTemplate();