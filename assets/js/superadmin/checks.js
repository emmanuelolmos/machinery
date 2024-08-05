//Dentro de la URL se incluye el id de la maquina, se obtiene y guarda en una variable

//Declaración de la variable
var id_machine = 0;

//Función para obtener valores de la URL
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//Asignación a la variable
function obtenerId_machine(){
    id_machine = getParameterByName('id_machine');
}


//Variables para la asignación de checks
let template_id = [];
let template_content = [];

//Funciones para eliminar mensajes
function deleteMessageAddCheck(){
    $("#errorMessageContentAddCheckModal").remove();
    var inputContentAddCheck = document.getElementById("inputContentAddCheck");
    inputContentAddCheck.value = "";
}

function deleteMessageStatusAddTemplate(){
    $("#messageStatusTemplate").remove();
}

//Funciones para cargar la información

//Función para verificar que el usuario no hay 
function verifyCheckListRegister(){
    var petition = {
        id_machine: id_machine,
        function: 'verifyCheckListRegister'
    };

    $.ajax({
        url: '../../Controllers/Check/CheckController.php', 
        type: 'POST', 
        data: petition, 
        success: function (response){

            var convertedInfo = JSON.parse(response);

            if(convertedInfo['success']){

                $("#divCheckListNew").remove();
                $("#divCheckListEdit").remove();

                let checklist = 
                '<div id="divShowCheckList" class="card shadow mt-4 mb-5 mx-5">' +
                    '<div class="mt-4">' +
                        '<h1 class="fs-2 text-center">Checks asignados</h1>' +
                        '<button class="btn btn-primary mt-4 ms-5" onclick="loadViewEditChecks()">Editar checks</button>' +
                    '</div>' +
                    '<div class="mt-1 mb-5 mx-5">' +
                        '<div class="table-responsive mt-4 d-flex justify-content-center">' +
                            '<table id="tableCheckList" class="text-center table table-bordered" style="width:80%;">' +
                                '<thead>' +
                                    '<tr>' +
                                        '<th class="col-8 p-2 bg-success text-white" scope="col">CHECKS</th>' +
                                    '</tr>' +
                                '</thead>' +
                                '<tbody>';

                for(let i = 0; i < convertedInfo['checks'].length; i++){
                    checklist +=    '<tr>' +
                                        '<td style="padding: 10px;">' + convertedInfo['checks'][i].content_assigned_check + '</td>' +
                                    '</tr>';
                }

                checklist +=    '</tbody>'+
                            '</table>' +
                        '</div>' +
                        '<div id="divDownAddTemplate" class="mt-2 text-center"></div>' +
                    '</div>' +
                '</div>'

                $("#divPrimary").append(checklist);

            }else{

                switch(convertedInfo['error']){
                    case 'Error':
                        alert('Error en la consulta de checks registrados');
                        break;
                }

            }

        }, 
        error: function (jqXHR, textStatus, errorThrown) { 
            alert('Error'); 
        } 
    }); 
}

function loadViewEditChecks(){

    $("#divShowCheckList").remove();

    let divEdit = 
    '<div id="divCheckListEdit" class="card shadow mt-4 mb-5 mx-5">' +
        '<div class="mt-3">' +
            '<h1 class="fs-2 text-center">Editar lista de checks</h1>' +
            '<button class="btn btn-primary mt-4 ms-5" onclick="verifyCheckListRegister()">Regresar</button>' +
        '</div>' +
        '<div class="d-flex">' +
            '<div class="divCategories" style="width: 100%;">' +
                '<div class="mt-2 mx-5">' +
                    '<div class="d-flex">' +
                        '<h2 class="fs-4 mt-1">Categorias</h2>' +
                    '</div>' +
                    '<div id="divCardsCategories">' +
                        '<div id="cardsCategories" class="card-container"></div>' +
                    '</div>' +
                    '<div id="divMessageCardsCategories" class="text-danger"></div>' +
                '</div>' +
                '<div class="divShowChecks mt-3 mx-5">' +
                    '<div class="d-flex">' +
                        '<h4 class="mt-1">Checks</h4>' +
                        '<button class="ms-2 btn btn-dark" data-bs-toggle="modal" data-bs-target="#showChecksModal" onclick="showChecks()">Mostrar</button>' +
                    '</div>' +
                '</div>' +
                '<div id="spaceTemplate">' +
                    '<div id="spaceTemplateAdd">' +
                        '<h3 class="mt-3 fs-4 text-center">Checks seleccionados</h3>' +
                        '<div id="divStatusTemplate"></div>' +
                        '<div class="mt-1 mb-5 mx-5">' +
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
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="divChecks" style="width: 35%;">' +
                '<div class="mt-2 me-3">' +
                    '<div class="d-flex">' +
                        '<h4 class="ms-2 fs-5">Checks</h4>' +
                        '<button class="btn btn-dark btn-sm ms-2 mb-1" type="button" data-bs-toggle="modal" data-bs-target="#addCheckModal"><i class="bi bi-plus-circle"></i></button>' +
                    '</div>' +
                    '<div class="table-responsive">' +
                        '<table id="tableChecks" class="text-center" style="width:100%;">' +
                            '<thead>' +
                                '<tr>' +
                                    '<th class="col-8 p-2 bg-black text-white" scope="col">CHECK</th>' +
                                    '<th class="col-4 p-2 bg-black text-white" scope="col">AGREGAR</th>' +
                                '</tr>' +
                           '</thead>' +
                            '<tbody id="tbodyChecks"></tbody>' +
                        '</table>' +
                        '<div id="divMessageTableChecks" class="mt-2 text-center text-danger"></div>' +      
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' + 
    '</div>';

    $("#divPrimary").append(divEdit);

    loadCardsCategory();
    loadTableChecks();
    loadTemplate();
    loadChecksAssigned()
}

function loadChecksAssigned(){
    var formData = {
        id_machine: id_machine,
        function: 'getChecksAssigned' 
    }

    $.ajax({ 
        url: '../../Controllers/Check/CheckController.php', 
        type: 'POST', 
        data: formData, 
        success: function (data){

            var convertedInfo = JSON.parse(data);

            if(convertedInfo['success']){

                template_id = [];
                template_content = [];

                for(let i = 0; i < convertedInfo['checks'].length; i++){
                    
                    template_id.push(convertedInfo['checks'][i].check_id);
                    template_content.push(convertedInfo['checks'][i].content_assigned_check);
                }

                //alert('Array de ids: ' + template_id + '/nArray de contents: ' + template_content);

                loadTemplate();
                
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

//Función para obtener las categorias e imprimirlas en forma de cards
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

                        let empty = true;

                        for(let j = 0; j < convertedInfo['templates'].length; j++){

                            if(convertedInfo['categories'][i].id_category == convertedInfo['templates'][j].category_id){
                                let nameTemplate = "'" + convertedInfo['templates'][j].name_template + "'";
                                cards += '<li class="dropdown-item" onclick="editTemplate(' + convertedInfo['templates'][j].id_template + ', ' + nameTemplate +', ' + convertedInfo['templates'][j].category_id + ')">' + convertedInfo['templates'][j].name_template + '</li>';
                                empty = false;
                            }
                        }

                        if(empty){
                            cards += '<li class="dropdown-item">Sin plantillas</li>';
                        }

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

//Funciones locales para los checks

//Función para imprimir la plantilla a partir de los arrays con los datos de los checks
function loadTemplate(){

    if(template_id.length > 0){

        let state = "'new'";

        //Se remueve el mensaje de plantilla vacía y se agrega el botón para registrar

        $("#messageTemplateEmpty").remove();
        $("#btnAddTemplate").remove();
        $("#tbodyTemplate").remove();

        $("#tableTemplate").append(
            '<tbody id="tbodyTemplate"></tbody>'
        );

        $("#divDownAddTemplate").append(
            '<button id="btnAddTemplate" onclick="storeCheckList(' + state + ')" class="btn btn-primary">Registrar</button>'
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

        let state = "'template'";

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
            '<button id="btnAddTemplateRestore" onclick="storeCheckList(' + state + ')" class="btn btn-primary ms-2 mb-1">Registrar checks</button>'
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
        
        loadTemplate();
        loadTemplateEdit()
        

    }else{

        Swal.fire({
            title: "Error",
            text: "Ya ingresaste el check",
            icon: "error"
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

}

//Función para imprimir el espacio para editar una plantilla
function editTemplate(id, name, category){

    $("#spaceTemplateAdd").remove();
    $("#spaceTemplateEdit").remove();

    $("#spaceTemplate").append(
        '<div id="spaceTemplateEdit">' +
            '<h3 class="mt-2 fs-4 text-center">Checks de la plantilla: ' + name + '</h3>' +
            '<div id="divStatusTemplateEdit"></div>' +
            '<div class="mt-1 mb-5 mx-5">' +
                '<input class="form-control" id="inputIdAddTemplateEdit" name="inputIdAddTemplateEdit" type="hidden" value="' + id + '">' +
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

    var formData = {
        id_template: id,
        function: 'getChecksOfTemplate' 
    }

    $.ajax({ 
        url: '../../Controllers/Template/TemplateController.php', 
        type: 'POST', 
        data: formData, 
        success: function (data){

            var convertedInfo = JSON.parse(data);

            if(convertedInfo['success']){

                template_id = [];
                template_content = [];

                let cont = 0;

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


//Funciones para realizar operaciones
function storeCheckList(state){

    var formData = {

        id_machine: id_machine,
        check_ids: template_id,
        check_contents: template_content, 
        function: 'storeCheckList'

    };

    $.ajax({ 
        url: '../../Controllers/Check/CheckController.php', 
        type: 'POST', 
        data: formData, 
        success: function (data){

            var convertedInfo = JSON.parse(data);

            if(convertedInfo['success']){

               location.reload();
                
            }else{
                
                if(state == 'new'){
                    $("#divStatusTemplate").append(
                        '<h4 id="messageStatusTemplate" class="mt-2 fs-5 text-center text-danger">' + convertedInfo['error'] + '</h4>'
                    );
                }else{
                    $("#divStatusTemplateEdit").append(
                        '<h5 id="messageTemplateErrorEdit" class="fs-5 mt-3 text-danger text-center">' + convertedInfo['error'] + '</h5>'
                    );
                }

            }

        }, 
        error: function (jqXHR, textStatus, errorThrown) { 
            alert('Error'); 
        } 
    });
}

function redirectToEDitChecks(){
    location.href = 'editChecks.php?id_machine=' + id_machine;
}


//Formularios

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


//Ejecución de métodos
obtenerId_machine();
verifyCheckListRegister();
loadCardsCategory();
loadTableChecks();
loadTemplate();