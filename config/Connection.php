<?php 

    class Connection{

        static function ConnectDB(){

            require "Global.php";

            try{

                $connection = new PDO(DSN, USERNAME, PASSWORD);
                $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return $connection;

            }catch(PDOException $e){
                error_log("Error en la conexión: " + $e->getMessage());
            }

        }
    }

?>