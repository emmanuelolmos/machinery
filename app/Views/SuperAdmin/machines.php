<?php
    session_start();

    //Se verifica que el usuario haya iniciado sesión
    if(!isset($_SESSION['id_user'])){
        header('Location: ../../../');
    }else{
        //Se verifica que el usuario tenga el rol correcto
        if($_SESSION['role_id'] != 1){
            header('Location: ../../../');
        }
    }

    //Carga de archivo .env
    $env = parse_ini_file('../../../.env')
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maquinas</title>
    <link rel="stylesheet" href="../../../assets/css/bootstrap/bootstrap.css">
    <script src="../../../assets/js/sweetalert/sweetalert2@11.js"></script>
    <link rel="stylesheet" href="../../../assets/css/bootstrap_icons/font/bootstrap-icons.css">
</head>
<body>

    <?php
        include 'Components/navbar.php';
    ?>

    <div class="card shadow mt-4 mb-5 mx-5">

        <div class="d-flex row justify-content-between p-2 bg-primary text-white mt-2 ms-3 me-3 rounded">

        <div class="col-12 col-md-4 text-center text-md-start">
            <h1 class="fs-5 mt-1 ms-3">
                Administrar maquinas
            </h1>
        </div>

        <div class="col-12 col-md-4 text-center">
            <input id="inputNameMachine" class="form-control form-control-sm mt-1" onkeyup="findMachine()" type="text" placeholder="Ingresa el nombre de la maquina a buscar">
        </div>

        <div class="col-12 col-md-4 mt-2 mt-md-0 text-center text-md-end">
            <button class="btn btn-secondary" onclick="loadCompaniesAddMachine()" data-bs-toggle="modal" data-bs-target="#addMachineModal">
                <i class="bi bi-plus-circle"></i></i> Agregar
            </button>
        </div>
    
        </div>

        <div id="divPrincipalTable" class="container p-3">
            <br>
            <div id="divRowTable" class="row">
                <!--Tabla de maquinaria-->
                
            </div>

            <br id="brCards">

        </div>
      
    </div>
    
    <!-- Modales -->
    <?php
        include 'Modals/addMachine.php';
        include 'Modals/editMachine.php';
        include 'Modals/addMaintenance.php';
        include 'Modals/editMaintenance.php';
        include 'Modals/messageMaintenanceModal.php';
        include 'Modals/showListMaintenance.php';
        include 'Modals/showReportOptionsModal.php';
    ?>

    <!-- Scripts -->
    <script src="../../../assets/js/jquery/jquery.min.js"></script>
    <script src="../../../assets/js/bootstrap/bootstrap.bundle.js"></script>
    <script src="../../../assets/js/superuser/machines.js"></script>

</body>
</html>