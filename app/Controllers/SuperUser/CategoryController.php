<?php 

session_start();

require "../../Models/SuperUser/Category.php";
require "../../Models/SuperUser/Template.php";

//Se obtiene la función
if(isset($_POST['function'])){
    $function = $_POST['function'];
}

if(isset($_REQUEST['function'])){
    $function = $_REQUEST['function'];
}


//Variable
$response = [];

switch($function){
    case 'insertCategory':

        //Se obtienen los datos
        $name = isset($_POST['inputNameAddCategory']) ? $_POST['inputNameAddCategory'] : '';
        $image = isset($_FILES['inputImageAddCategory']) ? $_FILES['inputImageAddCategory'] : '';

        //Se verifica que se hayan ingresado los datos
        if(empty($name) || empty($image['tmp_name'])){

            $error = 'Es necesario ingresar ambos datos';

        }else{
            
            //Se mandan los datos al modelo
            $category = new Category();
            $error = $category->insertCategory($name, $image);
        }

        //Si hay un error se manda por la variable data
        if(empty($error)){

            $response['success'] = true;

        }else{

            $response['success'] = false;
            $response['error'] = $error;

        }

        echo json_encode($response);

        break;

    case 'getCategories':

        //Se manda al modelo
        $category = new Category();

        $result = $category->getCategories();

        //Se obtienen las plantillas
        $template = new Template();

        $templates = $template->getTemplatesAll();
        
        //Si hay un error se manda por la variable data
        if($result != 'Empty' && $result != 'Error'){

            $response['success'] = true;
            $response['categories'] = $result;
            $response['templates'] = $templates;

        }else{

            $response['success'] = false;
            $response['error'] = $result;

        }

        echo json_encode($response);

        break;

    case 'deleteCategory':

        $id_category = $_POST['id_category'];

        $category = new Category();

        $result = $category->deleteCategory($id_category);

        if(empty($result)){
            $response['success'] = true;
        }else{
            $response['success'] = false;
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