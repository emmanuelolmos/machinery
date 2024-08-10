<?php 

require_once "../../../config/Connection.php";

class Machine{

    //Variable pública
    public $connection;

    function __construct()
    {
        $this->connection = Connection::ConnectDB();
    }

    function getMachines(){
        
        //Se obtiene el id de empresa
        $company_id = $_SESSION['company_id'];

        //Se obtiene el listado de maquinas pertenecientes a la empresa
        $query = "SELECT * FROM machines WHERE company_id = :company_id AND status_machine = '1' ORDER BY name_machine";

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':company_id', $company_id);

        if($statement->execute()){
            
            $machines = $statement->fetchAll();

            if(isset($machines[0]['name_machine'])){

                return $machines;

            }else{
                return 'Empty';
            }

        }else{
            return 'Error';
        }
    }

    function getMachinesSA(){

        //Se obtiene el listado de maquinas pertenecientes a la empresa
        $query = "SELECT * FROM machines WHERE status_machine = '1' ORDER BY name_machine";

        $statement = $this->connection->prepare($query);

        if($statement->execute()){
            
            $machines = $statement->fetchAll();

            if(isset($machines[0]['name_machine'])){

                return $machines;

            }else{
                return 'Empty';
            }

        }else{
            return 'Error';
        }
    }

    function findMachine($name, $company_id){

        $name_machine = '%' . $name . '%';

        //Se obtiene el listado de maquinas pertenecientes a la empresa
        $query = "SELECT * FROM machines WHERE company_id = :company_id AND name_machine LIKE :name_machine AND status_machine = '1' ORDER BY name_machine";

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':company_id', $company_id);
        $statement->bindParam(':name_machine', $name_machine);

        if($statement->execute()){
            
            $machines = $statement->fetchAll();

            if(isset($machines[0]['name_machine'])){

                return $machines;

            }else{
                return 'Empty';
            }

        }else{
            return 'Error';
        }

    }

    function findMachineSA($name){

        $name_machine = '%' . $name . '%';

        //Se obtiene el listado de maquinas pertenecientes a la empresa
        $query = "SELECT * FROM machines WHERE name_machine LIKE :name_machine AND status_machine = '1' ORDER BY name_machine";

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':name_machine', $name_machine);

        if($statement->execute()){
            
            $machines = $statement->fetchAll();

            if(isset($machines[0]['name_machine'])){

                return $machines;

            }else{
                return 'Empty';
            }

        }else{
            return 'Error';
        }

    }

    function findMachineToStore($name_machine, $company_id){

        $query = "SELECT * FROM machines WHERE company_id = :company_id AND name_machine = :name_machine";

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':company_id', $company_id);
        $statement->bindParam(':name_machine', $name_machine);

        if($statement->execute()){
            
            $machines = $statement->fetchAll();

            if(isset($machines[0]['name_machine'])){

                return $machines;

            }else{
                return 'Empty';
            }

        }else{
            return 'Error';
        }

    }

    function findMachineToUpdate($id, $name_machine){

        //Se comprueba que no haya otro registro con el mismo nombre
        $query = 'SELECT * FROM machines WHERE name_machine = :name_machine AND id_machine != :id_machine';

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':name_machine', $name_machine);
        $statement->bindParam(':id_machine', $id);

        if($statement->execute()){

            $machines = $statement->fetchAll();

            if(!isset($machines[0]['name_machine'])){

                return 'Empty';

            }else{
                return 'Ya se encuentra una maquina registrada con el mismo nombre';
            }

        }else{
            return 'Error';
        }
    }

    function sendImageWithApi($image, $option){

        $urlApi = 'http://tallergeorgio.hopto.org:5613/tallergeorgio/api/subirimagenes.php';
        $method = 'post';

        $postData = array(
            'method' => $method,
            'opcion' => $option,
            'image' => new CURLFile($image['tmp_name'])
        );

        $curl = curl_init();

        curl_setopt($curl, CURLOPT_URL, $urlApi);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

        $response = curl_exec($curl);

        //Error en la subida de imagenes
        if (curl_errno($curl)) {
            $error = curl_error($curl);
            return false;
        }

        curl_close($curl);

        // Procesar la respuesta de la API y obtener el nombre del archivo subido
        $uploadedFileName = $response;
        return $uploadedFileName;

    }

    function storeMachine($name, $mark, $model, $serie, $description, $date, $status, $company, $image){

        $query = 'INSERT INTO machines
        (name_machine, mark_machine, model_machine, serie_machine, observation_machine, date_machine, status_machine, image_machine, company_id) 
        VALUES (:name_machine, :mark_machine, :model_machine, :serie_machine, :observation_machine, :date_machine, :status_machine, :image_machine, :company_id)';

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':name_machine', $name);
        $statement->bindParam(':mark_machine', $mark);
        $statement->bindParam(':model_machine', $model);
        $statement->bindParam(':serie_machine', $serie);
        $statement->bindParam(':observation_machine', $description);
        $statement->bindParam(':date_machine', $date);
        $statement->bindParam(':status_machine', $status);
        $statement->bindParam(':image_machine', $image);
        $statement->bindParam(':company_id', $company);

        return $statement->execute();

    }

    function getMachineItem($id){
        
        $query = 'SELECT * FROM machines WHERE id_machine = :id_machine';

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':id_machine', $id);

        if($statement->execute()){

            $machine = $statement->fetch(PDO::FETCH_ASSOC);

            if(isset($machine['name_machine'])){
                return $machine;
            }else{
                return 'Empty';
            }

        }else{
            return 'Error';
        }

    }

    function updateMachine($id, $name, $mark, $model, $serie, $description, $date, $status, $company, $image){

        //Se comprueba que haya una imagen nueva
        if(empty($image)){

            //Actualización sin imagen
            $query = 'UPDATE machines SET name_machine = :name_machine, mark_machine = :mark_machine, model_machine = :model_machine, serie_machine = :serie_machine, observation_machine = :observation_machine, date_machine = :date_machine, status_machine = :status_machine, company_id = :company_id WHERE id_machine = :id_machine';

            $statement = $this->connection->prepare($query);
            $statement->bindParam(':id_machine', $id);
            $statement->bindParam(':name_machine', $name);
            $statement->bindParam(':mark_machine', $mark);
            $statement->bindParam(':model_machine', $model);
            $statement->bindParam(':serie_machine', $serie);
            $statement->bindParam(':observation_machine', $description);
            $statement->bindParam(':date_machine', $date);
            $statement->bindParam(':status_machine', $status);
            $statement->bindParam(':company_id', $company);

            if($statement->execute()){

                return '';

            }else{
                return 'Error en la actualización';
            }

        }else{

            //Actualización con imagen
            $query = 'UPDATE machines SET name_machine = :name_machine, mark_machine = :mark_machine, model_machine = :model_machine, serie_machine = :serie_machine, observation_machine = :observation_machine, date_machine = :date_machine, status_machine = :status_machine, image_machine = :image_machine, company_id = :company_id WHERE id_machine = :id_machine';

            $statement = $this->connection->prepare($query);
            $statement->bindParam(':id_machine', $id);
            $statement->bindParam(':name_machine', $name);
            $statement->bindParam(':mark_machine', $mark);
            $statement->bindParam(':model_machine', $model);
            $statement->bindParam(':serie_machine', $serie);
            $statement->bindParam(':observation_machine', $description);
            $statement->bindParam(':date_machine', $date);
            $statement->bindParam(':status_machine', $status);
            $statement->bindParam(':image_machine', $image);
            $statement->bindParam(':company_id', $company);

            if($statement->execute()){

                return '';

            }else{
                return 'Error en la actualización';
            }
        }
    }

    function deleteMachine($id){

        $query = "UPDATE machines SET status_machine = '0' WHERE id_machine = :id_machine";
        //$query = 'DELETE FROM maquinas WHERE ID_maquina = :id';

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':id_machine', $id);

        if($statement->execute()){
            return '';
        }else{
            return 'Error';
        }
    }
}

?>