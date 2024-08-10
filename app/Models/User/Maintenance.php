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

                return $maintenance;

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

    function reassignMaintenance($id_maintenance, $number, $type, $dateNext){

        $query = "UPDATE maintenance SET number_maintenance = :number_maintenance, type_maintenance = :type_maintenance, dateNext_maintenance = :dateNext_maintenance WHERE id_maintenance = :id_maintenance";

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':number_maintenance', $number);
        $statement->bindParam(':type_maintenance', $type);
        $statement->bindParam(':dateNext_maintenance', $dateNext);
        $statement->bindParam(':id_maintenance', $id_maintenance);

        if($statement->execute()){
            return '';
        }else{
            return 'Error';
        }
    }

    function rebootMaintenance($id_machine){

        //Primero se obtienen los datos del registro de mantenimiento

        $query = "SELECT * FROM maintenance WHERE machine_id = :machine_id";

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':machine_id', $id_machine);

        $statement->execute();

        $maintenance_found = $statement->fetchAll();

        $dateInit = date('Y-m-d');
        $number = $maintenance_found[0]['number_maintenance'];
        $type = $maintenance_found[0]['type_maintenance'];
        $dateNext = date('Y-m-d', strtotime($dateInit.' + '.$number.' '.$type));

        //Se actualiza la fecha 

        $query = "UPDATE maintenance SET dateInit_maintenance = :dateInit_maintenance, dateNext_maintenance = :dateNext_maintenance WHERE machine_id = :machine_id";

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':dateInit_maintenance', $dateInit);
        $statement->bindParam(':dateNext_maintenance', $dateNext);
        $statement->bindParam(':machine_id', $id_machine);

        if($statement->execute()){
            return '';
        }else{
            return 'Las fechas del próximo mantenimiento no se actualizaron correctamente';
        }

    }

    function getMaintenance($id_machine){

        $query = "SELECT * FROM maintenance WHERE machine_id = :machine_id";

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':machine_id', $id_machine);
        
        if($statement->execute()){

            $maintenance = $statement->fetchAll();

            if(isset($maintenance[0]['id_maintenance'])){

                return $maintenance;

            }else{
                return 'Empty';
            }

        }else{
            return 'Error';
        }
    }

    function getAllMaintenances(){

        $currentDate = date('Y-m-d');

        $query = "SELECT * FROM maintenance WHERE dateNext_maintenance <= :dateNext_maintenance";

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':dateNext_maintenance', $currentDate);

        if($statement->execute()){

            $maintenances = $statement->fetchAll();

            //Se comprueba que haya registros
            if(isset($maintenances[0]['id_maintenance'])){

                return $maintenances;

            }else{
                return 'Empty';
            }

        }else{
            return 'Error';
        }

    }

    function getAllNextMaintenances(){

        $currentDate = date('Y-m-d');

        $query = "SELECT * FROM maintenance WHERE dateNext_maintenance > :dateNext_maintenance ORDER BY dateNext_maintenance";

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':dateNext_maintenance', $currentDate);

        if($statement->execute()){

            $maintenances = $statement->fetchAll();

            //Se comprueba que haya registros
            if(isset($maintenances[0]['id_maintenance'])){

                return $maintenances;

            }else{
                return 'Empty';
            }

        }else{
            return 'Error';
        }
    }

    
}

?>