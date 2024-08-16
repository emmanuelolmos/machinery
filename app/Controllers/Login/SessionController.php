<?php 

session_start();

require "../../Models/User.php";

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
    case 'startSession':

        //Se verifica que los datos se hayan ingresado correctamente

        $phone = isset($_POST['inputPhoneLogin']) ? $_POST['inputPhoneLogin'] : '';
        $password = isset($_POST['inputPasswordLogin']) ? $_POST['inputPasswordLogin'] : '';

        if(empty($phone) || empty($password)){

            $error = 'Es necesario ingresar los datos';

        }else{

            if(!is_numeric($phone) || strlen($phone)!=10){

                $error = 'El número ingresado no es valido';

            }else{

                //Se obtiene el modelo
                $user = new User();

                //Los campos son correctos, se manda al método de autenticar del modelo User
                $result = $user->authenticate($phone, $password);

                if(empty($result)){

                    $error = '';

                }else{

                    $error = $result;

                }

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

    case 'exitSession':

        //Desconfigurar todas las variables de sesión
        $_SESSION = array();

        //Borrar la cookie de sesión si está configurada
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(
                session_name(),
                '',
                time() - 42000,
                $params["path"],
                $params["domain"],
                $params["secure"],
                $params["httponly"]
            );
        }

        //Finalmente, destruir la sesión
        session_destroy();
        header("location:../../../");

        break;

    default:

        echo '
        <br><br><br>
        <h1 style="text-align: center;">Error en la petición</h1>';

        break;
}

?>