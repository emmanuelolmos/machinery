<?php 

session_start();

require "../../Models/SuperUser/Check.php";
require "../../Models/SuperUser/Maintenance.php";
require "../../Models/SuperUser/Machine.php";
require "../../Models/SuperUser/Report.php";
require "../../Models/SuperUser/Image.php";

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

        //Se verifica que se tengan checks asignados
        $check = new Check();

        $verifyCheck = $check->verifyChecksAssigned($id_machine);

        switch($result){
            case 'Error':
                $response['success'] = false;
                break;

            case 'Empty':
                $response['success'] = true;
                $response['result'] = 'Empty';
                $response['checks'] = $verifyCheck;
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

    case 'reassignDateMaintenance':

        //Se obtienen las variables
        $id_maintenance  = $_POST['inputIdEditMaintenanceModal'];
        $number  = $_POST['inputNumberEditMaintenanceModal'];
        $type  = $_POST['selectEditMaintenanceModal'];
        $dateInit  = $_POST['inputDateInitEditMaintenanceModal'];

        //Se obtiene la siguiente fecha
        $dateNext = date('Y-m-d', strtotime($dateInit.' + '.$number.' '.$type));

        //Se mandan los datos al modelo
        $maintenance = new Maintenance();
        $result = $maintenance->reassignMaintenance($id_maintenance, $number, $type, $dateNext);

        if(empty($result)){
            $response['success'] = true;
        }else{
            $response['success'] = false;
            $response['error'] = $result;
        }

        echo json_encode($response);
        
        break;

    case 'getMaintenance':

        //Se obtiene el id de la maquina
        $id_machine = $_POST['id_machine'];

        //Se manda al modelo
        $maintenance = new Maintenance();
        $result = $maintenance->getMaintenance($id_machine);

        if($result = 'Empty' || $result = 'Error'){
            $response['success'] = false;
            $response['error'] = $result;
        }else{
            $response['success'] = true;
            $response['maintenance'] = $result;
        }

        echo json_encode($response);

        break;

    case 'getListMaintenance':

        //Llamadas a los modelos

        $maintenance = new Maintenance();
        $machine = new Machine();

        $machines = $machine->getMachinesSA();
        $maintenances = $maintenance->getAllMaintenances();

        //Se preparan los datos obtenidos
        if($machines == 'Error' || $machines == 'Empty' || $maintenances == 'Error' || $maintenances == 'Empty'){
            $response['success'] = false;
            $response['machines'] = $machines;
            $response['maintenances'] = $maintenances; 
        }else{
            $response['success'] = true;
            $response['machines'] = $machines;
            $response['maintenances'] = $maintenances;
        }

        echo json_encode($response);

        break;

    case 'getListNextMaintenance':

        //Llamadas a los modelos
        $maintenance = new Maintenance();
        $machine = new Machine();

        $machines = $machine->getMachinesSA();
        $maintenances = $maintenance->getAllNextMaintenances();

        //Se preparan los datos obtenidos
        if($machines == 'Error' || $machines == 'Empty' || $maintenances == 'Error' || $maintenances == 'Empty'){
            $response['success'] = false;
            $response['machines'] = $machines;
            $response['maintenances'] = $maintenances; 
        }else{
            $response['success'] = true;
            $response['machines'] = $machines;
            $response['maintenances'] = $maintenances;
        }

        echo json_encode($response);

        break;
    
    case 'storeReport':

        //Se obtienen los datos
        $machine_id = $_POST['id_machine'];
        $establishedDate = $_POST['establishedDate'];
        $images = $_FILES['inputImageShowListMaintenanceModal'];
        $observation = $_POST['inputObservationShowListMaintenanceModal'];

        //Se verifica que no esté vacía
        if(empty($images['name'][0]) || empty($observation)){

            $response['success'] = false;
            $response['error'] = 'Es necesario ingresar las imagenes de evidencia y las observaciones';

        }else{
            
            //Se crea el reporte
            $report = new Report();
            $id_report = $report->insertReport($establishedDate, $observation, $machine_id);

            if($id_report == 'Error'){
                
                $response['success'] = false;
                $response['error'] = $report_register;

            }else{

                //Ya generado el reporte se suben las imagenes
                $image = new Image();
                $confirmSendImages = $image->sendEvidenceImages($id_report, $images);

                if(!empty($confirmSendImages)){

                    $response['success'] = false;
                    $response['error'] = $confirmSendImages;

                }else{

                    //Las imagenes se subieron correctemente

                    //Ahora se reinician las horas del registro de mantenimiento
                    $maintenance = new Maintenance();
                    $maintenance_reboot = $maintenance->rebootMaintenance($machine_id);

                    if(!empty($maintenance_reboot)){

                        $response['success'] = false;
                        $response['error'] = $maintenance_reboot;

                    }else{

                        //Se reinician los estatus de los checks

                        $check = new Check();
                        $checks_reboot = $check->rebootStatusChecks($machine_id);

                        if(!empty($checks_reboot)){

                            $response['success'] = false;
                            $response['error'] = $checks_reboot;

                        }else{

                            $response['success'] = true;

                        }

                    }

                }

            }
            
        }

        echo json_encode($response);

        break;

    case 'sendImagesOfMaintenance':

        //Se reciben los datos
        $images = $_FILES['inputImageShowListMaintenanceModal'];

        //Se verifica que no esté vacía
        if(empty($images['name'][0])){
            $error = 'Sin imagenes para guardar';
        }else{
            
            //Se guardan las imagenes
            
        }

        //Se comprueban las imagenes

        //$images = $_FILES['inputImageShowListMaintenanceModal'];

        //$response['success'] = true;
        //$response['message'] = $message; //$images['name'][0];

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