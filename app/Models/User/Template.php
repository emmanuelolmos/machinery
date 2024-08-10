<?php 

require_once "../../../config/Connection.php";

class Template{

    //Variable pública
    public $connection;

    function __construct()
    {
        $this->connection = Connection::ConnectDB();
    }

    function getTemplatesAll(){

        $query = "SELECT * FROM templates WHERE status_template = '1' ORDER BY name_template";

        $statement = $this->connection->prepare($query);

        if($statement->execute()){

            $templates = $statement->fetchAll();

            if(isset($templates[0]['id_template'])){
                return $templates;
            }else{
                return 'Empty';
            }
        }else{
            return 'Error';
        }
    }

    function getTemplates($id_category){

        $query = "SELECT * FROM templates WHERE category_id = :category_id AND status_template = '1'";

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':category_id', $id_category);

        if($statement->execute()){

            $templates = $statement->fetchAll();

            if(isset($templates[0]['id_template'])){
                return $templates;
            }else{
                return 'Empty';
            }
        }else{
            return 'Error';
        }
    }

    function insertTemplate($name, $category, $checks){

        //Se comprueba que no haya otra plantilla con el mismo nombre
        $query = 'SELECT * FROM templates WHERE name_template = :name_template';

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':name_template', $name);

        if($statement->execute()){

            $templates = $statement->fetchAll();

            if(!isset($templates[0]['id_template'])){

                //Se inserta el registro en la tabla Templates
                $query = "INSERT INTO templates (name_template, category_id, status_template) VALUES (:name_template, :category_id, '1')";

                $statement = $this->connection->prepare($query);
                $statement->bindParam(':name_template', $name);
                $statement->bindParam(':category_id', $category);

                if($statement->execute()){

                    $query = "SELECT * FROM templates WHERE name_template = :name_template";

                    $statement = $this->connection->prepare($query);
                    $statement->bindParam(':name_template', $name);
                    $statement->execute();

                    $template = $statement->fetch(PDO::FETCH_ASSOC);
                    $id_template = $template['id_template'];

                    //El nombre se registró 

                    //Se insertan los checks en la tabla templates_contents
                    for($i = 0; $i < count($checks); $i++){

                        $query = "INSERT INTO templates_contents (template_id, check_id, status_templates_contents) VALUES (:template_id, :check_id, '1')";

                        $statement = $this->connection->prepare($query);
                        $statement->bindParam(':template_id', $id_template);
                        $statement->bindParam(':check_id', $checks[$i]);

                        $statement->execute();
                    }

                    return '';

                }else{
                    return 'Error desconocido';
                }

            }else{
                return 'Ya se encuentra una plantilla registrada con el mismo nombre';
            }

        }else{
            return 'Error desconocido';
        }
    }

    function updateTemplate($id, $name, $category, $checks){

        //Se comprueba que no haya otra plantilla con el mismo nombre
        $query = 'SELECT * FROM templates WHERE name_template = :name_template AND id_template != :id_template';

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':name_template', $name);
        $statement->bindParam(':id_template', $id);

        if($statement->execute()){

            $templates = $statement->fetchAll();

            if(!isset($templates[0]['id_template'])){

                //Se actualiza el registro en la tabla Templates
                $query = "UPDATE templates SET name_template = :name_template, category_id = :category_id WHERE id_template = :id_template";
                $statement = $this->connection->prepare($query);
                $statement->bindParam(':name_template', $name);
                $statement->bindParam(':category_id', $category);
                $statement->bindParam(':id_template', $id);

                if($statement->execute()){

                    //Se eliminan los checks anteriores
                    $query = "DELETE FROM templates_contents WHERE template_id = :template_id";
                    $statement = $this->connection->prepare($query);
                    $statement->bindParam(':template_id', $id);
                    $statement->execute();

                    //Se insertan los checks en la tabla templates_contents
                    for($i = 0; $i < count($checks); $i++){

                        $query = "INSERT INTO templates_contents (template_id, check_id, status_templates_contents) VALUES (:template_id, :check_id, '1')";

                        $statement = $this->connection->prepare($query);
                        $statement->bindParam(':template_id', $id);
                        $statement->bindParam(':check_id', $checks[$i]);

                        $statement->execute();
                    }

                    return '';

                }else{
                    return 'Error desconocido';
                }

            }else{
                return 'Ya se encuentra una plantilla registrada con el mismo nombre';
            }

        }else{
            return 'Error desconocido';
        }

    }

    function deleteTemplate($id_template){
        
        $query = "UPDATE templates SET status_template = '0' WHERE id_template = :id_template";
        $statement = $this->connection->prepare($query);
        $statement->bindParam(':id_template', $id_template);

        if($statement->execute()){

            $query = "UPDATE templates_contents SET status_templates_contents = '0' WHERE template_id = :template_id";
            $statement = $this->connection->prepare($query);
            $statement->bindParam(':template_id', $id_template);

            if($statement->execute()){

                return '';
                
            }else{

                return 'Error';
            }
    
        }else{
            return 'Error';
        }
    }

    function getChecksOfTemplate($id_template){

        $query = 'SELECT * FROM templates_contents WHERE template_id = :template_id';

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':template_id', $id_template);

        if($statement->execute()){

            $check_ids = $statement->fetchAll();

            return $check_ids;

        }else{
            return 'Error';
        }
    }

    
}

?>