<?php 

session_start();

require "../../Models/SuperUser/User.php";
require "../../Models/SuperUser/Company.php";
require "../../Models/SuperUser/Machine.php";

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
    case 'getCompany':

        //Se obtiene el modelo
        $company = new Company();

        //Obtención de los datos de la empresa
        $result = $company->getCompany();

        //Condición en caso de error o no haya registros
        if($result == 'Error' || $result == 'Empty'){
            $response['success'] = false;
            $response['error'] = $result;
        }else{
            $response['success'] = true;
            $response['company'] = $result;
        }
        
        echo json_encode($response);
        
        break;
    
    case 'getMachines':

        //Se obtiene el modelo
        $machine = new Machine();

        //Obtención de la lista de maquinaria
        $result = $machine->getMachinesSA();

        //Obtención de empresas
        $company = new Company();
        $companies = $company->getCompanies();

        //Condición en caso de error o no haya registros
        if($result == 'Error' || $result == 'Empty'){
            $response['success'] = false;
            $response['error'] = $result;
        }else{
            $response['success'] = true;
            $response['machines'] = $result;
            $response['companies'] = $companies;
        }

        echo json_encode($response);

        break;

    case 'findMachine':

        //Se obtiene el modelo
        $machine = new Machine();

        //Se obtiene el nombre a buscar
        $name = $_POST['name'];

        if($name == ''){

            //Obtención de la lista de maquinaria
            $result = $machine->getMachinesSA();

        }else{

            //Obtención de la lista de maquinaria
            $result = $machine->findMachineSA($name);

        }

        //Obtención de empresas
        $company = new Company();
        $companies = $company->getCompanies();

        //Condición en caso de error o no haya registros
        if($result == 'Error' || $result == 'Empty'){
            $response['success'] = false;
            $response['error'] = $result;
        }else{
            $response['success'] = true;
            $response['machines'] = $result;
            $response['companies'] = $companies;
        }

        echo json_encode($response);

        break;

    case 'insertMachine':

        //Se guardan los datos enviados

        $name = isset($_POST['inputNameAddMachineModal']) ? $_POST['inputNameAddMachineModal'] : '';
        $mark = isset($_POST['inputMarkAddMachineModal']) ? $_POST['inputMarkAddMachineModal'] : '';
        $model = isset($_POST['inputModelAddMachineModal']) ? $_POST['inputModelAddMachineModal'] : '';
        $serie = isset($_POST['inputSerieAddMachineModal']) ? $_POST['inputSerieAddMachineModal'] : '';
        $description = isset($_POST['inputDescriptionAddMachineModal']) ? $_POST['inputDescriptionAddMachineModal'] : '';
        $date = isset($_POST['inputDateAddMachineModal']) ? $_POST['inputDateAddMachineModal'] : '';
        $status = '1';
        $company = isset($_POST['selectCompanyAddMachine']) ? $_POST['selectCompanyAddMachine'] : '';
        $image = isset($_FILES['inputImageAddMachineModal']) ? $_FILES['inputImageAddMachineModal'] : '';

        //Se comprueba que los datos se hayan ingresado correctamente
        if(empty($name) || empty($mark) || empty($model) || empty($serie) || empty($description) || empty($date) || empty($image['tmp_name']) || empty($company)){

            $error = 'Es necesario ingresar los datos completos';

        }else{

            //Se comprueba que no haya una maquina con el mismo nombre
            $machine = new Machine();

            $result = $machine->findMachineToStore($name, $company);

            switch($result){

                case 'Empty':

                    //No se repite el nombre, se inserta el registro

                    //Se guarda la imagen con la API
                    $option = 13;
                    $nameImage = $machine->sendImageWithApi($image, $option);
                
                    //Se guarda el registro
                    $result = $machine->storeMachine($name, $mark, $model, $serie, $description, $date, $status, $company, $nameImage);

                    if($result){

                        $error = '';
                    
                    }else{
                        $error = 'Error en la inserción del registro';
                    }

                    break;

                case 'Error':

                    $error = 'Ocurrió un error en la consulta del nombre en los registros';
                    break;

                default:
                    $error = 'Ya se encuentra una maquina registrada con el mismo nombre';
                    break;

            }

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

    case 'getDataMachine':

        $id = $_POST['id'];

        $machine = new Machine;

        $result = $machine->getMachineItem($id);

        //Obtención de empresas
        $company = new Company();
        $companies = $company->getCompanies();

        if($result == 'Error' || $result == 'Empty'){
            $error = $result;
        }else{
            $error = '';
        }

        //Si hay un error se manda por la variable data
        if(empty($error)){
            $response['success'] = true;
            $response['machine'] = $result;
            $response['companies'] = $companies;
        }else{
            $response['success'] = false;
            $response['error'] = $error;
        }

        echo json_encode($response);

        break;

    case 'updateMachine':

        //Se guardan los datos enviados

        $id = isset($_POST['inputIdEditMachineModal']) ? $_POST['inputIdEditMachineModal'] : '';
        $name = isset($_POST['inputNameEditMachineModal']) ? $_POST['inputNameEditMachineModal'] : '';
        $mark = isset($_POST['inputMarkEditMachineModal']) ? $_POST['inputMarkEditMachineModal'] : '';
        $model = isset($_POST['inputModelEditMachineModal']) ? $_POST['inputModelEditMachineModal'] : '';
        $serie = isset($_POST['inputSerieEditMachineModal']) ? $_POST['inputSerieEditMachineModal'] : '';
        $description = isset($_POST['inputDescriptionEditMachineModal']) ? $_POST['inputDescriptionEditMachineModal'] : '';
        $date = isset($_POST['inputDateEditMachineModal']) ? $_POST['inputDateEditMachineModal'] : '';
        $status = '1';
        $company = isset($_POST['selectCompanyEditMachineModal']) ? $_POST['selectCompanyEditMachineModal'] : '';
        $image = isset($_FILES['inputImageEditMachineModal']) ? $_FILES['inputImageEditMachineModal'] : '';

        //Se comprueba que los datos se hayan ingresado correctamente
        if(empty($name) || empty($mark) || empty($model) || empty($serie) || empty($description) || empty($date) || empty($company)){

            $error = 'Es necesario ingresar los datos completos';

        }else{

            //Los datos se agregaron correctamente 

            //Se comprueba que no haya una maquina con el mismo nombre
            $machine = new Machine();

            $result = $machine->findMachineToUpdate($id, $name);

            if($result == 'Empty'){

                //Se comprueba que haya imagen
                if(empty($image['tmp_name'])){

                    $nameImage = '';

                }else{

                    //Se guarda la imagen con la API
                    $machine = new Machine();
                    $option = 13;
                    $nameImage = $machine->sendImageWithApi($image, $option);

                }

                //Se manda al modelo
                $error = $machine->updateMachine($id, $name, $mark, $model, $serie, $description, $date, $status, $company, $nameImage);

            }else{
                $error = $result;
            }

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

    case 'deleteMachine':

        $id = $_POST['id'];

        //Se manda el id al modelo
        $machine = new Machine();

        $error = $machine->deleteMachine($id);

        //Si hay un error se manda por la variable data
        if(empty($error)){
            $response['success'] = true;
        }else{
            $response['success'] = false;
            $response['error'] = $error;
        }

        echo json_encode($response);

        break;

    
    case 'getCompanies':

        //Se obtiene el modelo
        $company = new Company();

        //Obtención de empresas
        $companies = $company->getCompanies();

        //Condición en caso de error o no haya registros
        if($companies == 'Error' || $companies == 'Empty'){
            $response['success'] = false;
            $response['error'] = $companies;
        }else{
            $response['success'] = true;
            $response['companies'] = $companies;
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