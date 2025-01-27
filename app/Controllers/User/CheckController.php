<?php 

session_start();

require "../../Models/User/Check.php";
require "../../Models/User/Report.php";

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

    case 'verifyCheckListRegister':

        $id_machine = $_POST['id_machine'];

        $check = new Check();
        $verify = $check->verifyCheckListRegister($id_machine);

        if($verify == 'NotFound' || $verify == 'Error'){
            $response['success'] = false;
            $response['error'] = $verify;
        }else{
            $response['success'] = true;
            $response['checks'] = $verify;
        }

        echo json_encode($response);

        break;

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

    case 'storeCheckList':

        //Se reciben las variables
        $id_machine = $_POST['id_machine'];
        $check_ids = $_POST['check_ids'];
        $check_contents = $_POST['check_contents'];

        //Se manda al modelo
        $check = new Check();
        $error = $check->insertCheckList($id_machine, $check_ids, $check_contents);

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

    case 'getChecksAssigned':

        $id_machine = $_POST['id_machine'];
        $establishedDate_report = $_POST['establishedDate_report'];

        $check = new Check();

        $checks = $check->getChecksAssigned($id_machine);

        $result = $check->comprobateStatusChecksAssigned($id_machine);

        if($checks != 'Empty' && $checks != 'Error'){

            $response['success'] = true;
            $response['checks'] = $checks;
            $response['checksready'] = $result;

        }else{

            $response['success'] = false;
            $response['error'] = $checks;

        }

        echo json_encode($response);

        break;

    case 'changeStatusOfCheck':

        $id_assigned_check = $_POST['id_assigned_check'];
        $status_assigned_check = $_POST['status_assigned_check'];

        //Se llama al modelo
        $check = new Check;

        $result = $check->changeStatusOfCheck($id_assigned_check, $status_assigned_check);

        //Se comprueba que los checks estén completos para realizar el reporte

        if($result){
            $response['success'] = true;
        }else{
            $response['success'] = false;
        }

        echo json_encode($response);

        break;

    case 'deleteCheck':

        $id_check = $_POST['id_check'];

        $check = new Check();

        $result = $check->deleteCheck($id_check);

        if($result){
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