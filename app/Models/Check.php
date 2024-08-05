<?php 

require_once "../../../config/Connection.php";

class Check{

    //Variable pública
    public $connection;

    function __construct()
    {
        $this->connection = Connection::ConnectDB();
    }

    function verifyCheckListRegister($id_machine){

        //Se comprueba que no haya checks 
        $query = "SELECT content_assigned_check FROM assigned_checks WHERE machine_id = :machine_id AND active_assigned_check = '1' ORDER BY content_assigned_check";

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':machine_id', $id_machine);

        if($statement->execute()){
            $checks = $statement->fetchAll();
            
            if(isset($checks[0])){
                
                return $checks;

            }else{
                return 'NotFound';
            }
        }else{
            return 'Error';
        }

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

    function insertCheckList($id_machine, $check_ids, $check_contents){

        //Se comprueba que no haya checks 
        $query = "SELECT id_assigned_check FROM assigned_checks WHERE machine_id = :machine_id";

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':machine_id', $id_machine);

        if($statement->execute()){
            $checks = $statement->fetchAll();

            if(isset($checks[0])){

                $query = "UPDATE assigned_checks SET active_assigned_check = '0' WHERE machine_id = :machine_id";

                $statement = $this->connection->prepare($query);
                $statement->bindParam(':machine_id', $id_machine);
                $statement->execute();

            }

            //Se guardan los checks
            for($i = 0; $i < count($check_ids); $i++){

                $query = "INSERT INTO assigned_checks (content_assigned_check, active_assigned_check, status_assigned_check, check_id, machine_id) VALUES (:content_assigned_check, '1', '0', :check_id, :machine_id)";

                $statement = $this->connection->prepare($query);
                $statement->bindParam(':content_assigned_check', $check_contents[$i]);
                $statement->bindParam(':check_id', $check_ids[$i]);
                $statement->bindParam(':machine_id', $id_machine);

                $statement->execute();
            }

            return '';

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

    function getChecksAssigned($id_machine){

        $query = "SELECT * FROM assigned_checks WHERE machine_id = :machine_id AND active_assigned_check = '1' ORDER BY content_assigned_check";

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':machine_id', $id_machine);
        
        if($statement->execute()){

            $checks = $statement->fetchAll();

            //Se comprueba que no tenga datos vacíos
            if(isset($checks[0]['id_assigned_check'])){

                return $checks;

            }else{
                return 'Empty';
            }

        }else{
            return 'Error';
        }

    }

    function getChecksAll(){

        //Se prepara el query
        $query = "SELECT * FROM checks ORDER BY content_check";

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

    function deleteCheck($id_check){

        $query = "UPDATE checks SET status_check = '0' WHERE id_check = :id_check";

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':id_check', $id_check);

        return $statement->execute();
    }

    
}

?>