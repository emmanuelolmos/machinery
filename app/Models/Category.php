<?php 

require_once "../../../config/Connection.php";

class Category{

    //Variable pública
    public $connection;

    function __construct()
    {
        $this->connection = Connection::ConnectDB();
    }

    function insertCategory($name, $image){

        //Antes se verifica que no haya una categoria con el mismo nombre
        $query = 'SELECT * FROM categories WHERE name_category = :name_category';

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':name_category', $name);

        if($statement->execute()){

            $categories = $statement->fetchAll();

            if(!isset($categories[0]['id_category'])){

                //Se guarda la foto con la API
                $urlApi = 'http://tallergeorgio.hopto.org:5613/tallergeorgio/api/subirimagenes.php';

                $postData = array(
                    'method' => 'post',
                    'opcion' => 13,
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
                    //$error = curl_error($curl);
                    return 'Error en la carga del icono';
                }

                curl_close($curl);

                // Procesar la respuesta de la API y obtener el nombre del archivo subido
                $name_image = $response;

                //Se guarda la categoria
                $query = "INSERT INTO categories (name_category, image_category, status_category) VALUES (:name_category, :image_category, '1')";

                $statement = $this->connection->prepare($query);
                $statement->bindParam(':name_category', $name);
                $statement->bindParam(':image_category', $name_image);

                if($statement->execute()){

                    return '';
                    
                }else{
                    return 'Error';
                }

            }else{
                return 'Ya se encuentra una categoria con el mismo nombre';
            }

        }else{
            return 'Error';
        }
        
    }

    function getCategories(){

        //Se prepara el query
        $query = "SELECT * FROM categories WHERE status_category = '1' ORDER BY name_category";

        $statement = $this->connection->prepare($query);
        
        if($statement->execute()){

            $categories = $statement->fetchAll();

            //Se comprueba que no tenga datos vacíos
            if(isset($categories[0]['id_category'])){

                return $categories;

            }else{
                return 'Empty';
            }

        }else{
            return 'Error';
        }
    }

    function deleteCategory($id_category){

        $query = "UPDATE categories SET status_category = '0' WHERE id_category = :id_category";

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':id_category', $id_category);

        if($statement->execute()){
            return '';
        }else{
            return 'Error';
        }
    }

    
}

?>