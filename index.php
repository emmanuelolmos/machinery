<?php 

    session_start();

    //Verificar que el usuario haya iniciado sesión
    if(isset($_SESSION['id_user'])){

        /* El usuario inició sesión
           Se dirige a la vista correspondiente */
           
        switch($_SESSION['role_id']){
            case '1':
                header('Location: ./app/Views/SuperAdmin/init.php');
                break;

            case '2':
                header('Location: ./app/Views/Admin/init.php');
                break;

            case '3':
                header('Location: ./app/Views/Technical/init.php');
                break;

            default:
                break;
        }

    }else{

        //Se direcciona al login
        header('Location: ./app/Views/Login/login.php');

    }

?>