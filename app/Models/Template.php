<?php 

require_once "../../../config/Connection.php";

class Template{

    //Variable pública
    public $connection;

    function __construct()
    {
        $this->connection = Connection::ConnectDB();
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

    
}

?>