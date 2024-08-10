<?php 

require_once "../../../config/Connection.php";

class User{

    //Variable pública
    public $connection;

    function __construct()
    {
        $this->connection = Connection::ConnectDB();
    }

    //Función para validar que las credenciales correspondan a un usuario registrado
    function authenticate($phone, $password){

        //Consulta
        $query = "SELECT * FROM users WHERE phone_user = :phone AND status_user = '1'";

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':phone', $phone);

        //Manejo de errores

        //Error en la ejecución del query
        if($statement->execute()){

            $user = $statement->fetch(PDO::FETCH_ASSOC);

            //El telefono ingresado no se encuentra registrado o no tiene el estatus requerido
            if(isset($user['name_user'])){

                //La contraseña no coincide
                if($user['password_user'] == $password){

                    //Los datos son correctos, se inicia sesión
                    $_SESSION['id_user'] = $user['id_user'];
                    $_SESSION['name_user'] = $user['name_user'];
                    $_SESSION['phone_user'] = $user['phone_user'];
                    $_SESSION['role_id'] = $user['role_id'];
                    $_SESSION['company_id'] = $user['company_id'];
                    
                    return '';

                }else{
                    return 'Contraseña incorrecta';
                }
            }else{
                return 'No encontrado o no autorizado';
            }
        }else{
            return 'Error';
        }

    }
    
}

?>