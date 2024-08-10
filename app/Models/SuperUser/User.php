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

    function getUsers(){

        $query = "SELECT * FROM users WHERE status_user = '1' ORDER BY name_user";

        $statement = $this->connection->prepare($query);
        
        if($statement->execute()){

            $users = $statement->fetchAll();
            
            if(isset($users)){

                return $users;

            }else{
                return 'Empty';
            }

        }else{
            return 'Error';
        }
    }

    function getUsersAdmin(){
        
        //Se obtiene el id de la empresa del administrador
        $company_id = $_SESSION['company_id'];

        $query = "SELECT * FROM users WHERE company_id = :company_id AND status_user = '1'";

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':company_id', $company_id);
        
        if($statement->execute()){

            $users = $statement->fetchAll();
            
            if(isset($users)){

                return $users;

            }else{
                return 'Empty';
            }

        }else{
            return 'Error';
        }
    }

    function getUser($id){

        //Consulta para obtener el usuario
        $query = 'SELECT * FROM users WHERE id_user = :id_user';

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':id_user', $id);

        if($statement->execute()){

            $userFound = $statement->fetch(PDO::FETCH_ASSOC);

            return $userFound;
        }else{
            return 'Error';
        }
    }

    function addUser($name, $phone, $password, $company, $role){

        //Antes de generar el registro se comprueba que no haya un registro con el mismo nombre o número teléfonico
        $query = 'SELECT * FROM users WHERE name_user = :name_user OR phone_user = :phone_user';
        
        $statement = $this->connection->prepare($query);
        $statement->bindParam(':name_user', $name);
        $statement->bindParam(':phone_user', $phone);

        if($statement->execute()){

            $users = $statement->fetchAll();

            //Se comprueba que el query haya obtenido registros o no
            if(!isset($users[0]['phone_user'])){

                $status = '1';

                //Se procede a crear el usuario
                $query = 'INSERT INTO users (name_user, phone_user, password_user, status_user, role_id, company_id) 
                VALUES (:name_user, :phone_user, :password_user, :status_user, :role_id, :company_id)';

                $statement = $this->connection->prepare($query);
                $statement->bindParam(':name_user', $name);
                $statement->bindParam(':phone_user', $phone);
                $statement->bindParam(':password_user', $password);
                $statement->bindParam(':status_user', $status);
                $statement->bindParam(':role_id', $role);
                $statement->bindParam(':company_id', $company);

                if($statement->execute()){

                    return '';

                }else{
                    return 'Error';
                }

            }else{
                return 'El nombre o teléfono ingresado ya se encuentra registrado';
            }

        }else{
            return 'Error';
        }

    }

    function updateUser($id, $name, $phone, $password, $company, $role){

        //Se verifica que el nombre o telefono no se encuentre ya registrado
        $query = 'SELECT * FROM users WHERE id_user != :id_user AND name_user = :name_user 
        OR id_user != :id_user AND phone_user = :phone_user';
        
        $statement = $this->connection->prepare($query);

        $statement->bindParam('id_user', $id);
        $statement->bindParam('name_user', $name);
        $statement->bindParam('phone_user', $phone);

        if($statement->execute()){
            
            $users = $statement->fetchAll();

            if(!isset($users[0]['name_user'])){

                $status = '1';

                //Ya se verificó

                //Se realiza el query para actualizar usuario
                $query = 'UPDATE users SET name_user = :name_user, phone_user = :phone_user, 
                password_user = :password_user, status_user = :status_user, role_id = :role_id, 
                company_id = :company_id WHERE id_user = :id_user';

                $statement = $this->connection->prepare($query);

                $statement->bindParam('name_user', $name);
                $statement->bindParam('phone_user', $phone);
                $statement->bindParam('password_user', $password);
                $statement->bindParam('status_user', $status);
                $statement->bindParam('role_id', $role);
                $statement->bindParam('company_id', $company);
                $statement->bindParam('id_user', $id);

                if($statement->execute()){
                    return '';
                }else{
                    return 'Error';
                }
                
            }else{
                return 'El nombre o teléfono ingresado ya se encuentra registrado';
            }
        }else{
            return 'Error';
        }

    }

    function removeUser($id){

        $query = "UPDATE users SET status_user = '0' WHERE id_user = :id_user";

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':id_user', $id);

        if($statement->execute()){
            return '';
        }else{
            return 'unknown';
        }

    }

    
}

?>