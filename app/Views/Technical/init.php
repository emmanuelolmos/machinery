<?php
    session_start();

    //Se verifica que el usuario haya iniciado sesión
    if(!isset($_SESSION['id_user'])){
        header('Location: ../../../');
    }else{
        //Se verifica que el usuario tenga el rol correcto
        if($_SESSION['role_id'] != 3){
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
    <title>Inicio</title>
    <link rel="stylesheet" href="../../../assets/css/bootstrap/bootstrap.css">
    <link rel="stylesheet" href="../../../assets/css/bootstrap_icons/font/bootstrap-icons.css">
</head>
<body>

    <?php
        include 'Components/navbarInit.php';
    ?>

    <div class="card shadow mx-5 mt-5">

        <!--Mensaje de bienvenida-->
        <div class="mt-5 mx-auto">
            <h1 class="fs-2">Bienvenido Técnico</h1>
        </div>

        <br>

        <div class="mb-5">

            <div class="row mx-5">

                <div class="col-md-4 mt-3 mb-3 mb-sm-0">

                    <div class="card">

                        <div class="card-header fs-5 text-white bg-primary text">Maquinas</div>

                        <div class="card-body text-center fs-1">

                            <div class="row mx-4">
                            <i class="bi bi-truck-front-fill mt-2"></i>
                                <button onclick="redirectMachinesPanel()" class="btn btn-primary mt-2">Ir al panel</button>
                            </div>

                        </div>

                    </div>

                </div>

                <div class="col-md-4 mt-3 mb-3 mb-sm-0">

                    <div class="card">

                        <div class="card-header fs-5 text-white bg-primary text">Plantillas</div>

                        <div class="card-body text-center fs-1">

                            <div class="row mx-4">
                                <i class="bi bi-card-list mt-2"></i>
                                <button onclick="redirectTemplatesPanel()" class="btn btn-primary mt-2">Ir al panel</button>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
      
    </div>

    <!-- Scripts -->
    <script src="../../../assets/js/jquery/jquery.min.js"></script>
    <script src="../../../assets/js/bootstrap/bootstrap.bundle.js"></script>
    <script src="../../../assets/js/admin/init.js"></script>

</body>
</html>