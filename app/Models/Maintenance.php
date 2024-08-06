<?php 

require_once "../../../config/Connection.php";

class Maintenance{

    //Variable pública
    public $connection;

    function __construct()
    {
        $this->connection = Connection::ConnectDB();
    }

    function verifyMaintenance($id_machine){

        $query = 'SELECT * FROM maintenance WHERE machine_id = :machine_id';

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':machine_id', $id_machine);

        if($statement->execute()){
            
            $maintenance = $statement->fetchAll();

            if(isset($maintenance[0]['id_maintenance'])){

                return '';

            }else{
                return 'Empty';
            }

        }else{
            return 'Error';
        }
    }

    function assignMaintenance($number, $type, $dateInit, $dateNext, $machine_id){

        $query = "INSERT INTO maintenance (number_maintenance, type_maintenance, dateInit_maintenance, dateNext_maintenance, machine_id) 
        VALUES (:number_maintenance, :type_maintenance, :dateInit_maintenance, :dateNext_maintenance, :machine_id)";

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':number_maintenance', $number);
        $statement->bindParam(':type_maintenance', $type);
        $statement->bindParam(':dateInit_maintenance', $dateInit);
        $statement->bindParam(':dateNext_maintenance', $dateNext);
        $statement->bindParam(':machine_id', $machine_id);

        if($statement->execute()){
            return '';
        }else{
            return 'Error';
        }

    }

    
}

?>