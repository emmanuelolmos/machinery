<?php 

session_start();

require "../../Models/Check.php";
require "../../Models/Maintenance.php";

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

    case 'verifyMaintenance':

        $id_machine = $_POST['id_machine'];

        $maintenance = new Maintenance();
        
        $result = $maintenance->verifyMaintenance($id_machine);

        switch($result){
            case 'Error':
                $response['success'] = false;
                break;

            case 'Empty':
                $response['success'] = true;
                $response['result'] = 'Empty';
                break;

            default:
                $response['success'] = true;
                $response['result'] = $result;
        }

        echo json_encode($response);

        break;

    case 'assignDateMaintenance':

        //Se obtienen las variables
        $id_machine = $_POST['inputIdAddMaintenanceModal'];
        $number = $_POST['inputNumberAddMaintenanceModal'];
        $type = $_POST['selectAddMaintenanceModal'];

        //Se obtienen la fecha actual y la próxima
        $dateInit = date('Y-m-d');
        $dateNext = date('Y-m-d', strtotime($dateInit.' + '.$number.' '.$type));
        
        //Se mandan los datos al modelo
        $maintenance = new Maintenance();
        $result = $maintenance->assignMaintenance($number, $type, $dateInit, $dateNext, $id_machine);

        if(empty($result)){
            $response['success'] = true;
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