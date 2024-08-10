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

//Imprime las opciones del select de categorias en el espacio para crear una plantilla nueva
function loadCategories(){

    //Se remueven las categorias en caso de haberlas agregado
    $("#selectCategoryAddTemplate").remove();

    var petition = {function: 'getCategories'};
    
    $.ajax({ 
        url: '../../Controllers/User/CategoryController.php', 
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

//Es la misma función que la anterior con la diferencia de que está es para imprimir las opciones en el espacio para editar una plantilla
function loadCategoriesEdit(id_category){

    //Se remueven las categorias en caso de haberlas agregado
    $("#selectCategoryAddTemplateEdit").remove();

    var petition = {function: 'getCategories'};
    
    $.ajax({ 
        url: '../../Controllers/User/CategoryController.php', 
        type: 'POST', 
        data: petition, 
        success: function (response){

            var convertedInfo = JSON.parse(response);

            if(convertedInfo['success']){

                //Se imprime el select
                let selectCategories = '<select class="form-select" name="selectCategoryAddTemplateEdit" id="selectCategoryAddTemplateEdit"></select>';
                $("#divCategoryAddTemplateEdit").append(selectCategories);

                let optionsCategories = '';

                for(let i = 0; i < convertedInfo['categories'].length; i++){

                    if(convertedInfo['categories'][i].id_category == id_category){
                        optionsCategories += '<option value="' + convertedInfo['categories'][i].id_category + '" selected>' + convertedInfo['categories'][i].name_category + '</option>';
                    }else{
                        optionsCategories += '<option value="' + convertedInfo['categories'][i].id_category + '">' + convertedInfo['categories'][i].name_category + '</option>';
                    }
                }

                $("#selectCategoryAddTemplateEdit").append(optionsCategories);
                
            }else{

                //Se imprime el select
                let selectCategories = '<select class="form-select" name="selectCategoryAddTemplateEdit" id="selectCategoryAddTemplateEdit"></select>';
                $("#divCategoryAddTemplateEdit").append(selectCategories);

                switch(convertedInfo['error']){
                    case 'Error':
                        $("#selectCategoryAddTemplateEdit").append(
                            '<option value="">No se cargaron correctamente las categorias</option>'
                        );
                        break;
                    case 'Empty':
                        $("#selectCategoryAddTemplateEdit").append(
                            '<option value="">No hay categorias registradas</option>'
                        );
                        break;
                    default:
                        $("#selectCategoryAddTemplateEdit").append(
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

//Función para obtener los datos de la tabla checks e imprimirlos en una tabla gráfica
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
        url: '../../Controllers/User/CheckController.php', 
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

//Función para obtener las categorias e imprimirlas en forma de cards
function loadCardsCategory(){

    $("#cardsCategories").remove();
    $("#divCardsCategories").append('<div id="cardsCategories" class="card-container"></div>');

    var petition = {function: 'getCategories'};
    
    $.ajax({ 
        url: '../../Controllers/User/CategoryController.php', 
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
                                let nameTemplate = "'" + convertedInfo['templates'][j].name_template + "'";
                                cards += '<li class="dropdown-item" onclick="editTemplate(' + convertedInfo['templates'][j].id_template + ', ' + nameTemplate +', ' + convertedInfo['templates'][j].category_id + ')">' + convertedInfo['templates'][j].name_template + '</li>';
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

//Función para imprimir la plantilla a partir de los arrays con los datos de los checks
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

//Misma función que la anterior con la diferencia que esta función es para editar una plantilla ya registrada
function loadTemplateEdit(){

    if(template_id.length > 0){

        //Se remueve el mensaje de plantilla vacía y se agrega el botón para registrar

        $("#messageTemplateEmptyEdit").remove();
        $("#messageTemplateErrorEdit").remove();
        $("#btnAddTemplateEdit").remove();
        $("#btnAddTemplateRestore").remove();
        $("#btnAddTemplateDelete").remove();
        $("#tbodyTemplateEdit").remove();

        $("#tableTemplateEdit").append(
            '<tbody id="tbodyTemplateEdit"></tbody>'
        );

        $("#divDownAddTemplateEdit").append(
            '<button id="btnAddTemplateEdit" onclick="storeEditTemplate()" class="btn btn-success mb-1">Editar plantilla</button>' +
            '<button id="btnAddTemplateRestore" onclick="restoreTemplate()" class="btn btn-primary ms-2 mb-1">Guardar como nuevo</button>' +
            '<button id="btnAddTemplateDelete" onclick="deleteTemplate()" class="btn btn-danger ms-2 mb-1">Eliminar plantilla</button>'
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

        $("#tbodyTemplateEdit").append(tbody);
        
    }else{

        $("#messageTemplateEmptyEdit").remove();
        $("#btnAddTemplateEdit").remove();
        $("#btnAddTemplateRestore").remove();
        $("#btnAddTemplateDelete").remove();
        $("#tbodyTemplateEdit").remove();

        $("#tableTemplateEdit").append(
            '<tbody id="tbodyTemplateEdit"></tbody>'
        );

        $("#divDownAddTemplateEdit").append(
            '<h5 id="messageTemplateEmptyEdit" class="fs-4 mt-3">Agrega un check o comienza a partir de una plantilla</h5>'
        );
    }
}

//Función para cargar los cambios de los checks en caso de eliminar alguno
function loadDeleteChecks(){

    $("#tbodyDeleteChecksModal").remove();
    $("#tableDeleteChecksModal").append('<tbody id="tbodyDeleteChecksModal"></tbody>');

    var petition = {function: 'getChecks'};
    
    $.ajax({ 
        url: '../../Controllers/User/CheckController.php', 
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

//Función para agregar los datos de un check en los arrays template
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
        loadTemplateEdit()
        

    }else{

        Swal.fire({
            title: "Advertencia",
            text: "Ya ingresaste el check",
            icon: "warning",
            iconColor: "#ffdb00",
            confirmButtonColor: '#0d6efd'
          });

    }
    
}

//Función para eliminar los datos de un check en los arrays template
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
    loadTemplateEdit()
}

//Función para eliminar un registro check de la base de datos
function deleteCheckDB(id){

    var formData = {
        id_check: id,
        function: 'deleteCheck'
    }

    $.ajax({ 
        url: '../../Controllers/User/CheckController.php', 
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

//Función para eliminar una categoria de la base de datos
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
                url: '../../Controllers/User/CategoryController.php', 
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

//Función para guardar los datos de una nueva plantilla
function storeTemplate(){

    $("#messageStatusTemplate").remove();

    var formData = {
        name: $("#inputNameAddTemplate").val(),
        category: $("#selectCategoryAddTemplate").val(),
        checks: template_id,
        function: 'storeTemplate'
    };

    $.ajax({ 
        url: '../../Controllers/User/TemplateController.php', 
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

//Función para guardar los cambios hechos a una plantilla ya registrada
function storeEditTemplate(){

    $("#messageTemplateErrorEdit").remove();

    //Se obtienen los datos ingresados

    var formData = {
        id_template: $("#inputIdAddTemplateEdit").val(),
        name_template: $("#inputNameAddTemplateEdit").val(),
        category_template: $("#selectCategoryAddTemplateEdit").val(),
        check_ids: template_id,
        function: 'editTemplate'
    }

    $.ajax({ 
        url: '../../Controllers/User/TemplateController.php', 
        type: 'POST', 
        data: formData, 
        success: function (data){

            var convertedInfo = JSON.parse(data);

            if(convertedInfo['success']){

                $("#divStatusTemplateEdit").append(
                    '<h5 id="messageTemplateErrorEdit" class="fs-5 mt-3 text-success text-center">Plantilla actualizada correctamente</h5>'
                );

                loadCardsCategory();
                
            }else{
                
                $("#divStatusTemplateEdit").append(
                    '<h5 id="messageTemplateErrorEdit" class="fs-5 mt-3 text-danger text-center">' + convertedInfo['error'] + '</h5>'
                );

            }

        }, 
        error: function (jqXHR, textStatus, errorThrown) { 
            alert('Error'); 
        } 
    });

}

//Función para realizar un nuevo registro de plantilla a partir de una ya registrada
function restoreTemplate(){

    $("#messageTemplateErrorEdit").remove();

    //Se obtienen los datos ingresados

    var formData = {
        name: $("#inputNameAddTemplateEdit").val(),
        category: $("#selectCategoryAddTemplateEdit").val(),
        checks: template_id,
        function: 'storeTemplate'
    }

    $.ajax({ 
        url: '../../Controllers/User/TemplateController.php', 
        type: 'POST', 
        data: formData, 
        success: function (data){

            var convertedInfo = JSON.parse(data);

            if(convertedInfo['success']){

                $("#divStatusTemplateEdit").append(
                    '<h5 id="messageTemplateErrorEdit" class="fs-5 mt-3 text-success text-center">Nueva plantilla registrada correctamente</h5>'
                );

                loadCardsCategory();
                
            }else{
                
                $("#divStatusTemplateEdit").append(
                    '<h5 id="messageTemplateErrorEdit" class="fs-5 mt-3 text-danger text-center">' + convertedInfo['error'] + '</h5>'
                );

            }

        }, 
        error: function (jqXHR, textStatus, errorThrown) { 
            alert('Error'); 
        } 
    });

}

//Función para eliminar una plantilla
function deleteTemplate(){

    $("#messageTemplateErrorEdit").remove();

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: true
      });
      swalWithBootstrapButtons.fire({
        title: "Estás seguro de eliminar la plantilla?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

            var formData = {
                id_template: $("#inputIdAddTemplateEdit").val(),
                function: 'deleteTemplate'
            };

            $.ajax({ 
                url: '../../Controllers/User/TemplateController.php', 
                type: 'POST', 
                data: formData, 
                success: function (data){
        
                    var convertedInfo = JSON.parse(data);
        
                    if(convertedInfo['success']){
        
                        swalWithBootstrapButtons.fire({
                            title: "Eliminada",
                            text: "La plantilla se eliminó correctamente",
                            icon: "success"
                        });

                        newTemplate();
                        
                    }else{

                        swalWithBootstrapButtons.fire({
                            title: "Cancelado",
                            text: "La plantilla no se eliminó",
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
            text: "La plantilla no se eliminó",
            icon: "error"
          });
        }
      });
}

//Función para imprimir el espacio para crear una nueva plantilla
function newTemplate(){
    template_id = [];
    template_content = [];

    $("#spaceTemplateAdd").remove();
    $("#spaceTemplateEdit").remove();

    $("#spaceTemplate").append(
        '<div id="spaceTemplateAdd">' +
            '<h3 class="mt-3 fs-4 text-center">Nueva plantilla</h3>' +
            '<div id="divStatusTemplate"></div>' +
            '<div class="mt-1 mb-5 mx-5">' +
                '<div id="divNameAddTemplate">' +
                    '<label class="form-label" for="inputNameAddTemplate">Nombre</label>' +
                    '<input class="form-control" type="text" name="inputNameAddTemplate" id="inputNameAddTemplate" placeholder="Ingresa el nombre de la plantilla">' +
                '</div>' +
                '<div id="divCategoryAddTemplate" class="mt-2">' +
                    '<label class="form-label" for="selectCategoryAddTemplate">Categoria</label>' +
                    '<select class="form-select" name="selectCategoryAddTemplate" id="selectCategoryAddTemplate"></select>' +
                '</div>' +
                '<div class="table-responsive mt-2">' +
                    '<table id="tableTemplate" class="text-center" style="width:100%;">' +
                        '<thead>' +
                            '<tr>' +
                                '<th class="col-8 p-2 bg-secondary text-white" scope="col">CHECKS</th>' +
                                '<th class="col-4 p-2 bg-secondary text-white" scope="col">OPCIONES</th>' +
                            '</tr>' +
                        '</thead>' +
                    '</table>' +
                '</div>' +
                '<div id="divDownAddTemplate" class="mt-2 text-center"></div>' +
            '</div>' +
        '</div>'
    );

    $("#divDownAddTemplate").append(
        '<h5 id="messageTemplateEmpty" class="fs-4 mt-3">Agrega un check o comienza a partir de una plantilla</h5>'
    );

    loadCategories();

}

//Función para imprimir el espacio para editar una plantilla
function editTemplate(id, name, category){

    $("#spaceTemplateAdd").remove();
    $("#spaceTemplateEdit").remove();

    $("#spaceTemplate").append(
        '<div id="spaceTemplateEdit">' +
            '<button class="btn btn-primary ms-5 mt-3" onclick="newTemplate()">Nueva plantilla</button>' +
            '<h3 class="mt-2 fs-4 text-center">Plantilla: ' + name + '</h3>' +
            '<div id="divStatusTemplateEdit"></div>' +
            '<div class="mt-1 mb-5 mx-5">' +
                '<input class="form-control" id="inputIdAddTemplateEdit" name="inputIdAddTemplateEdit" type="hidden" value="' + id + '">' +
                '<div id="divNameAddTemplateEdit">' +
                    '<label class="form-label" for="inputNameAddTemplateEdit">Nombre</label>' +
                    '<input class="form-control" type="text" name="inputNameAddTemplateEdit" id="inputNameAddTemplateEdit" placeholder="Ingresa el nombre de la plantilla" value="' + name + '">' +
                '</div>' +
                '<div id="divCategoryAddTemplateEdit" class="mt-2">' +
                    '<label class="form-label" for="selectCategoryAddTemplateEdit">Categoria</label>' +
                    '<select class="form-select" name="selectCategoryAddTemplateEdit" id="selectCategoryAddTemplateEdit"></select>' +
                '</div>' +
                '<div class="table-responsive mt-2">' +
                    '<table id="tableTemplateEdit" class="text-center" style="width:100%;">' +
                        '<thead>' +
                            '<tr>' +
                                '<th class="col-8 p-2 bg-secondary text-white" scope="col">CHECKS</th>' +
                                '<th class="col-4 p-2 bg-secondary text-white" scope="col">OPCIONES</th>' +
                            '</tr>' +
                        '</thead>' +
                    '</table>' +
                '</div>' +
                '<div id="divDownAddTemplateEdit" class="mt-2 text-center"></div>' +
            '</div>' +
        '</div>'
    );

    loadCategoriesEdit(category);

    var formData = {
        id_template: id,
        function: 'getChecksOfTemplate' 
    }

    $.ajax({ 
        url: '../../Controllers/User/TemplateController.php', 
        type: 'POST', 
        data: formData, 
        success: function (data){

            var convertedInfo = JSON.parse(data);

            if(convertedInfo['success']){

                //alert(convertedInfo['checks_ids'].length);
                template_id = [];
                template_content = [];

                let cont = 0;

                //alert(convertedInfo['checks_ids'][0].check_id);

                for(let i = 0; i < convertedInfo['checks_ids'].length; i++){
                    
                    for(let j = 0; j < convertedInfo['checks'].length; j++){
                        
                        if(convertedInfo['checks_ids'][i].check_id == convertedInfo['checks'][j].id_check){
                            template_id.push(convertedInfo['checks'][j].id_check);
                            template_content.push(convertedInfo['checks'][j].content_check);
                        }
                    }
                }

                loadTemplateEdit();
                
            }else{
                
                $("#divDownAddTemplateEdit").append(
                    '<h5 id="messageTemplateErrorEdit" class="fs-4 mt-3 text-danger">' + convertedInfo['error'] + '</h5>'
                );

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
            url: '../../Controllers/User/CheckController.php', 
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
            url: '../../Controllers/User/CategoryController.php', 
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