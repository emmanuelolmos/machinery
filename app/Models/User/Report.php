<?php 

require_once "../../../config/Connection.php";

class Report{

    //Variable pública
    public $connection;

    function __construct()
    {
        $this->connection = Connection::ConnectDB();
    }

    function getReport($machine_id, $establishedDate_report){

        $query = 'SELECT * FROM reports WHERE machine_id = :machine_id AND establishedDate_report = :establishedDate_report';

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':machine_id', $machine_id);
        $statement->bindParam(':establishedDate_report', $establishedDate_report);

        if($statement->execute()){
            //Se comprueba que exista el registro
            $reports = $statement->fetchAll();

            if(isset($reports[0]['id_report'])){
                return '';
            }else{
                return 'Empty';
            }
        }else{
            return 'Error';
        }
    }

    function getLastReport($id_machine){

        $query = 'SELECT * FROM reports WHERE machine_id = :machine_id ORDER BY madeDate_report DESC';

        $statement = $this->connection->prepare($query);
        $statement->bindParam('machine_id', $id_machine);

        if($statement->execute()){

            //Se comprueba que exista el registro
            $reports = $statement->fetchAll();

            if(isset($reports[0]['id_report'])){
                return $reports;
            }else{
                return 'Empty';
            }

        }else{
            return 'Error';
        }
    }

    function getReportsForDates($start_date, $end_date, $id_machine){

        $query = 'SELECT * FROM reports WHERE machine_id = :machine_id AND madeDate_report >= :startdate AND madeDate_report <= :enddate';

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':startdate', $start_date);
        $statement->bindParam(':enddate', $end_date);
        $statement->bindParam(':machine_id', $id_machine);

        if($statement->execute()){

            $reports = $statement->fetchAll();
            
            //Se verifica que tenga registros
            if(isset($reports[0]['id_report'])){

                //Se verifica que tenga más de un registro
                if(count($reports) > 1){

                    return $reports;
                    
                }else{
                    return 'One';
                }
            }else{
                return 'Empty';
            }
        }else{
            return 'Error';
        }
    }

    function getReportContent($id_report){

        $query = 'SELECT * FROM reports_contents WHERE report_id = :report_id ORDER BY assigned_check_content';

        $statement = $this->connection->prepare($query);
        $statement->bindParam('report_id', $id_report);

        if($statement->execute()){

            //Se comprueba que exista el registro
            $reports_contents = $statement->fetchAll();

            if(isset($reports_contents[0]['id_report_content'])){
                return $reports_contents;
            }else{
                return 'Empty';
            }

        }else{
            return 'Error';
        }
    }

    function insertReport($establishedDate_report, $observation_report, $machine_id){

        //Se agregan las variables faltantes
        $madeDate_report = date('Y-m-d');
        $user_id = $_SESSION['id_user'];

        $query = "INSERT INTO reports (establishedDate_report, madeDate_report, observation_report, user_id, machine_id) VALUES (:establishedDate_report, :madeDate_report, :observation_report, :user_id, :machine_id)";

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':establishedDate_report', $establishedDate_report);
        $statement->bindParam(':madeDate_report', $madeDate_report);
        $statement->bindParam(':observation_report', $observation_report);
        $statement->bindParam(':user_id', $user_id);
        $statement->bindParam(':machine_id', $machine_id);

        if($statement->execute()){

            //Se creó el registro del reporte, ahora se guarda la información

            //Se obtiene el id
            $query = "SELECT * FROM reports WHERE establishedDate_report = :establishedDate_report AND machine_id = :machine_id ORDER BY id_report DESC";

            $statement = $this->connection->prepare($query);
            $statement->bindParam(':establishedDate_report', $establishedDate_report);
            $statement->bindParam(':machine_id', $machine_id);

            $statement->execute();

            $report_found = $statement->fetchAll();
            $id_report = $report_found[0]['id_report'];

            //Se obtienen los checks asignados al mantenimiento actual

            $query = "SELECT * FROM assigned_checks WHERE active_assigned_check = '1' AND status_assigned_check = '1' AND machine_id = :machine_id";

            $statement = $this->connection->prepare($query);
            $statement->bindParam(':machine_id', $machine_id);

            $statement->execute();

            $checks_assigned = $statement->fetchAll();

            //Los datos obtenidos se vacían en la tabla reports_contents

            for($i = 0; $i < count($checks_assigned); $i++){
                
                $query = "INSERT INTO reports_contents (assigned_check_content, assigned_check_id, report_id) VALUES (:assigned_check_content, :assigned_check_id, :report_id)";

                $statement = $this->connection->prepare($query);
                $statement->bindParam(':assigned_check_content', $checks_assigned[$i]['content_assigned_check']);
                $statement->bindParam(':assigned_check_id', $checks_assigned[$i]['id_assigned_check']);
                $statement->bindParam(':report_id', $id_report);

                $statement->execute();
                
            }

            return $id_report;

        }else{
            return 'Error';
        }

    }

    
}

?>