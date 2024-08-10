<?php 

require_once "../../../config/Connection.php";

class Role{

    //Variable pública
    public $connection;

    function __construct()
    {
        $this->connection = Connection::ConnectDB();
    }

    function getRoles(){

        $query = "SELECT * FROM roles";

        $statement = $this->connection->prepare($query);
        
        if($statement->execute()){

            $roles = $statement->fetchAll();
            
            if(isset($roles)){

                return $roles;

            }else{
                return 'Empty';
            }

        }else{
            return 'Error';
        }
    }

    
}

?>