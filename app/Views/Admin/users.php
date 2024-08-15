<?php
    session_start();

    //Se verifica que el usuario haya iniciado sesión
    if(!isset($_SESSION['id_user'])){
        header('Location: ../../../');
    }else{
        //Se verifica que el usuario tenga el rol correcto
        if($_SESSION['role_id'] != 2){
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
    <title>Usuarios</title>
    <link rel="stylesheet" href="../../../assets/css/bootstrap/bootstrap.css">
    <script src="../../../assets/js/sweetalert/sweetalert2@11.js"></script>
    <link rel="stylesheet" href="../../../assets/css/bootstrap_icons/font/bootstrap-icons.css">
</head>
<body>

    <?php
        include 'Components/navbar.php';
    ?>

    <div class="card shadow ms-4 me-4 mt-4">

        <div class="d-flex justify-content-between p-2 bg-primary text-white mx-3 mt-3 rounded">

        <div>
            <h1 class="fs-5 ms-3 mt-1">
                Administrar usuarios
            </h1>
        </div>
        <div>
            <button class="btn btn-secondary me-3" onclick="loadCompanies()" data-bs-toggle="modal" data-bs-target="#addUserModal">
                <i class="bi bi-person-plus-fill"></i> Agregar
            </button>
        </div>
           
        </div>

        <div id="divUsers" class="table-responsive mx-3 mt-3">
            <table id="tableUsers" class="text-center" style="width: 100%;">
                <thead>
                    <tr>
                        <th class="p-2 bg-secondary text-white" scope="col">NOMBRE</th>
                        <th class="p-2 bg-secondary text-white" scope="col">TELEFONO</th>
                        <th class="p-2 bg-secondary text-white" scope="col">EMPRESA</th>
                        <th class="p-2 bg-secondary text-white" scope="col">CARGO</th>
                        <th class="p-2 bg-secondary text-white" scope="col">OPCIONES</th>
                    </tr>
                </thead>

                <tbody id="listUsers">
                    
                </tbody>
            </table>
        </div>

        <br>
      
    </div>
    
    <!-- Modales -->
    <?php
        include 'Modals/addUser.php';
        include 'Modals/editUser.php';
        include 'Modals/messageMaintenanceModal.php';
    ?>

    <!-- Scripts -->
    <script src="../../../assets/js/jquery/jquery.min.js"></script>
    <script src="../../../assets/js/bootstrap/bootstrap.bundle.js"></script>
    <script src="../../../assets/js/user/users.js"></script>

</body>
</html>