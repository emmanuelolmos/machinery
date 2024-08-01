<?php 

session_start();

require "../../Models/Template.php";

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
    
    default:

        echo '
        <br><br><br>
        <h1 style="text-align: center;">Error en la petición</h1>';

        break;
}

?>