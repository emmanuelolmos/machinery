<?php 

session_start();

require "../../Models/User.php";
require "../../Models/Company.php";
require "../../Models/Role.php";

if(isset($_POST['function'])){
    $function = $_POST['function'];
}

if(isset($_REQUEST['function'])){
    $function = $_REQUEST['function'];
}

//Variables
$response = [];

switch($function){
    case 'getUsers':

        //Se obtiene el modelo
        $user = new User();

        //Obtención de usuarios
        $users = $user->getUsers();

        //Obtención de empresas
        $company = new Company();
        $companies = $company->getCompanies();

        //Condición en caso de error o no haya registros
        if($users == 'Error' || $users == 'Empty'){
            $response['success'] = false;
            $response['error'] = $users;
        }else{
            $response['success'] = true;
            $response['users'] = $users;
            $response['companies'] = $companies;
        }
        
        echo json_encode($response);
        
        break;
    
    case 'insertUser':

        //Se guardan los datos enviados
        $name = isset($_POST['nameAddUser']) ? $_POST['nameAddUser'] : '';
        $phone = isset($_POST['phoneAddUser']) ? $_POST['phoneAddUser'] : '';
        $password = isset($_POST['passwordAddUser']) ? $_POST['passwordAddUser'] : '';
        $role = isset($_POST['roleAddUser']) ? $_POST['roleAddUser'] : '';
        $company = isset($_POST['selectCompanyAddUser']) ? $_POST['selectCompanyAddUser'] : '';

        //Se comprueba que los datos se hayan ingresado correctamente
        if(empty($name) || empty($phone) || empty($password) || empty($role) || empty($company)){

            $error = 'Es necesario ingresar los datos completos';

        }else{
            
            if(!is_numeric($phone) || strlen($phone)!=10){

                $error = 'El número ingresado no es valido';

            }else{

                //Se obtiene el modelo
                $user = new User();

                //Los campos son correctos, se manda al método addUserAdmin del modelo User
                $error = $user->addUser($name, $phone, $password, $company, $role);

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

    case 'updateUser':

        //Se guardan los datos enviados
        $id = isset($_POST['inputIdEditUser']) ? $_POST['inputIdEditUser'] : '';
        $name = isset($_POST['inputNameEditUser']) ? $_POST['inputNameEditUser'] : '';
        $phone = isset($_POST['inputPhoneEditUser']) ? $_POST['inputPhoneEditUser'] : '';
        $password = isset($_POST['inputPasswordEditUser']) ? $_POST['inputPasswordEditUser'] : '';
        $company = isset($_POST['selectCompanyEditUser']) ? $_POST['selectCompanyEditUser'] : '';
        $role = isset($_POST['selectRoleEditUser']) ? $_POST['selectRoleEditUser'] : '';

        //Se comprueba que los datos se hayan ingresado correctamente
        if(empty($name) || empty($phone) || empty($password) || empty($company) || empty($role)){

            $error = 'Es necesario ingresar los datos completos';

        }else{
            
            if(!is_numeric($phone) || strlen($phone)!=10){

                $error = 'El número ingresado no es valido';

            }else{

                //Se obtiene el modelo
                $user = new User();

                //Los campos son correctos, se manda al método updateUser del modelo User
                $error = $user->updateUser($id , $name, $phone, $password, $company, $role);

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

    case 'removeUser':

        $id = $_POST['id'];

        //Comprobación de que el ID no sea el mismo de la sesión
        if($_SESSION['id_user'] == $id){
            $response['success'] = false;
            $response['error'] = 'ownAccount';
        }else{

            //Se obtiene el modelo
            $user = new User();

            $result = $user->removeUser($id);

            //Eliminación de usuario
            if(empty($result)){
                $response['success'] = true;
            }else{
                $response['success'] = false;
                $response['error'] = $result;
            }
            
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
            $data['success'] = false;
            $data['error'] = $companies;
        }else{
            $data['success'] = true;
            $data['companies'] = $companies;
        }
        
        echo json_encode($data);

        break;
    
    case 'getDataUser':

        $id = $_POST['id'];

        $user = new User();

        $result = $user->getUser($id);

        //Obtención de empresas
        $company = new Company();
        $companies = $company->getCompanies();

        //Obtención de roles
        $role = new Role();
        $roles = $role->getRoles();

        //Se verifica que la consulta se haya realizado correctamente
        if($result != 'Error'){

            $response['success'] = true;
            $response['user'] = $result;
            $response['companies'] = $companies;
            $response['roles'] = $roles;

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