<?php 

require_once "../../../config/Connection.php";

class Company{

    //Variable pública
    public $connection;

    function __construct()
    {
        $this->connection = Connection::ConnectDB();
    }

    function getCompanies(){
        
        $query = "SELECT * FROM companies";

        $statement = $this->connection->prepare($query);
        
        if($statement->execute()){

            $companies = $statement->fetchAll();
            
            if(isset($companies)){

                return $companies;

            }else{
                return 'Empty';
            }

        }else{
            return 'Error';
        }
    }

    function getCompany(){

        $id = $_SESSION['company_id'];

        $query = "SELECT * FROM companies WHERE id_company = :id";

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':id', $id);

        if($statement->execute()){

            $company = $statement->fetch(PDO::FETCH_ASSOC);

            if(isset($company['name_company'])){
                return $company;
            }else{
                return 'Empty';
            }
            
        }else{
            return 'Error';
        }
    }

    function removeCompany($id){

        $query = 'DELETE FROM empresa WHERE ID_empresa = :id';

        $statement = $this->connection->prepare($query);
        $statement->bindParam(':id', $id);

        return $statement->execute();

    }
}

?>