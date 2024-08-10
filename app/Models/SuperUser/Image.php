<?php 

require_once "../../../config/Connection.php";

class Image{

    //Variable pública
    public $connection;

    function __construct()
    {
        $this->connection = Connection::ConnectDB();
    }

    function sendEvidenceImages($id_report, $images){

        for($i = 0; $i < count($images['name']); $i++){
            
            $urlApi = 'http://tallergeorgio.hopto.org:5613/tallergeorgio/api/subirimagenes.php';
            $method = 'post';

            $postData = array(
                'method' => $method,
                'opcion' => 13,
                'image' => new CURLFile($images['tmp_name'][$i])
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
            $nameImage = $response;

            $query = "INSERT INTO evidences_images (image_evidence_image, report_id) VALUES (:image_evidence_image, :report_id)";

            $statement = $this->connection->prepare($query);
            $statement->bindParam(':image_evidence_image', $nameImage);
            $statement->bindParam(':report_id', $id_report);

            if(!$statement->execute()){
                return 'La imagen ' . $i . ' no se registró correctamente';
            }

        }

        return '';
        
    }

    
}

?>