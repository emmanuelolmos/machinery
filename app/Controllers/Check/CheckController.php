<?php 

session_start();

require "../../Models/Check.php";

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
    case 'insertCheck':

        //Se obtiene el check ingresado
        $content = isset($_POST['inputContentAddCheck']) ? $_POST['inputContentAddCheck'] : '';

        //Se verifica que no se encuentre vacío
        if(!empty($content)){

            //Se manda al modelo
            $check = new Check();
            $result = $check->insertCheck($content);

            switch($result){
                case 'Success':
                    $error = '';
                    break;

                case 'CheckFound':
                    $error = 'Ya se encuentra registrado';
                    break;

                case 'Error':
                    $error = 'Ocurrió un error en el registro';
                    break;
            }

        }else{
            $error = 'Es necesario ingresar el contenido del check';
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

    case 'getChecks':

        //Se manda al modelo
        $check = new Check();

        $result = $check->getChecks();
        
        //Si hay un error se manda por la variable data
        if($result != 'Empty' && $result != 'Error'){

            $response['success'] = true;
            $response['checks'] = $result;

        }else{

            $response['success'] = false;
            $response['error'] = $result;

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