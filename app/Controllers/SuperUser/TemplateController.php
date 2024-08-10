<?php 

session_start();

require "../../Models/SuperUser/Template.php";
require "../../Models/SuperUser/Check.php";

//Se obtiene la función a realizar
if(isset($_POST['function'])){
    $function = $_POST['function'];
}

if(isset($_REQUEST['function'])){
    $function = $_REQUEST['function'];
}

//Variables
$response = [];

switch($function){
    case 'storeTemplate':

        //Obtención de valores
        $name = isset($_POST['name']) ? $_POST['name'] : '';
        $category = isset($_POST['category']) ? $_POST['category'] : '';
        $checks = isset($_POST['checks']) ? $_POST['checks'] : '';

        //Se verifica que tengan información
        if(empty($name) || empty($category) || empty($checks)){
            $error = 'Es necesario llenar todos los campos';
        }else{

            //Se mandan los datos al modelo
            $template = new Template();

            $result = $template->insertTemplate($name, $category, $checks);

            if(empty($result)){
                $error = '';
            }else{
                $error = $result;
            }
        }

        //Condición en caso de error
        if(empty($error)){
            $response['success'] = true;
        }else{
            $response['success'] = false;
            $response['error'] = $error;
        }
        
        echo json_encode($response);
        
        break;
    
    case 'getTemplates':

        $id_category = $_POST['id_category'];

        $template = new Template();

        $result = $template->getTemplates($id_category);

        if($result == 'Empty' || $result == 'Error'){
            $response['success'] = false;
            $response['error'] = $result;
        }else{
            $response['success'] = true;
            $response['templates'] = $result;
        }

        echo json_encode($response);

        break;

    case 'getChecksOfTemplate':

        //Se obtiene la variable id
        $id_category = $_POST['id_template'];

        //Se obtienen los modelos
        $template = new Template();
        $check = new Check();

        //Se obtienen los registros
        $checks_ids = $template->getChecksOfTemplate($id_category);
        $checks = $check->getChecksAll();

        if($checks == 'Empty' || $checks == 'Error' || $checks_ids == 'Error'){
            $response['success'] = false;
            $response['error'] = 'Error en las consulta de datos';
        }else{
            $response['success'] = true;
            $response['checks_ids'] = $checks_ids;
            $response['checks'] = $checks;
        }

        echo json_encode($response);

        break;

    case 'editTemplate':

        //Se reciben los datos enviados
        $id_template = $_POST['id_template'];
        $name_template = isset($_POST['name_template']) ? $_POST['name_template'] : '';
        $category_template = $_POST['category_template'];
        $check_ids = $_POST['check_ids'];

        if(empty($name_template)){

            $error = 'Es necesario ingresar el nombre de la plantilla';

        }else{

            //Los datos son correctos, se mandan al modelo
            $template = new Template();

            $error = $template->updateTemplate($id_template, $name_template, $category_template, $check_ids);
            
        }

        if(empty($error)){

            $response['success'] = true;

        }else{

            $response['success'] = false;
            $response['error'] = $error;
    
        }

        echo json_encode($response);

        break;

    case 'deleteTemplate':

        //Se recibe el id
        $id_template = $_POST['id_template'];

        //Los datos son correctos, se mandan al modelo
        $template = new Template();

        $error = $template->deleteTemplate($id_template);

        if(empty($error)){

            $response['success'] = true;

        }else{

            $response['success'] = false;
            $response['error'] = $error;
    
        }

        echo json_encode($response);

        break;
    
    default:

        echo '
        <br><br><br>
        <h1 style="text-align: center;">Error en la petición</h1>';

        break;
}

?>