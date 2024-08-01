<?php 

require_once "../../../config/Connection.php";

class Check{

    //Variable pública
    public $connection;

    function __construct()
    {
        $this->connection = Connection::ConnectDB();
    }

    function insertCheck($content){

        //Antes se verifica que no se encuentre registrado
        $query = 'SELECT * FROM checks WHERE content_check = :content_check';

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':content_check', $content);

        if($statement->execute()){

            $checks = $statement->fetchAll();

            if(!isset($checks[0]['id_check'])){

                //No se encuentra en la bdd
                $query = "INSERT INTO checks (content_check, status_check) VALUES (:content_check, '1')";

                $statement = $this->connection->prepare($query);
                $statement->bindParam(':content_check', $content);

                if($statement->execute()){

                    return 'Success';
                    
                }else{
                    return 'Error';
                }

            }else{
                return 'CheckFound';
            }

        }else{
            return 'Error';
        }
        
    }

    function getChecks(){

        //Se prepara el query
        $query = "SELECT * FROM checks WHERE status_check = '1' ORDER BY content_check";

        $statement = $this->connection->prepare($query);
        
        if($statement->execute()){

            $checks = $statement->fetchAll();

            //Se comprueba que no tenga datos vacíos
            if(isset($checks[0]['id_check'])){

                return $checks;

            }else{
                return 'Empty';
            }

        }else{
            return 'Error';
        }
    }

    
}

?>