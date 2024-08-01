<?php
session_start();

// Se verifica que el usuario haya iniciado sesión
if (!isset($_SESSION['id_user'])) {
    header('Location: ../../../');
} else {
    // Se verifica que el usuario tenga el rol correcto
    if ($_SESSION['role_id'] != 1) {
        header('Location: ../../../');
    }
}

// Carga de archivo .env
$env = parse_ini_file('../../../.env');
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plantillas</title>
    <link rel="stylesheet" href="../../../assets/css/bootstrap/bootstrap.css">
    <link rel="stylesheet" href="../../../assets/css/superadmin/templates.css">
    <script src="../../../assets/js/sweetalert/sweetalert2@11.js"></script>
    <link rel="stylesheet" href="../../../assets/css/bootstrap_icons/font/bootstrap-icons.css">
    <style>
        .card-container {
            display: flex;
            overflow-x: auto;
            padding: 10px;
            white-space: nowrap;
        }
        .card-container .card {
            flex: 0 0 auto;
            margin-right: 15px;
        }
    </style>
</head>
<body>

    <?php include 'Components/navbar.php'; ?>

    <div class="card shadow mt-4 mb-5 mx-5">
        
        <div class="text-center mt-3">
            <h1 class="fs-2">Plantillas para listas de checks</h1>
        </div>

        <!-- Divide la vista en dos partes -> Categorias con la tabla y los checks -->
        <div class="d-flex">

            <!-- Primer división -->
            <div class="divCategories" style="width: 100%;">

                <!-- Abarca las categorias-->
                <div class="mt-2 mx-5">

                    <div class="d-flex">
                        <h2 class="fs-4 mt-1">Categorias</h2>
                        <button class="btn btn-dark ms-2" onclick="deleteMessageAddCategory()" type="button" data-bs-toggle="modal" data-bs-target="#addCategoryModal"><i class="bi bi-plus-circle"></i></button>
                    </div>

                    <div id="divCardsCategories">
                        <div id="cardsCategories" class="card-container">

                            <!-- Categorias --> 

                        </div>
                    </div>

                    <div id="divMessageCardsCategories" class="text-danger">
                        
                        <!-- Mensaje de error --> 

                    </div>
                </div>

                <div class="divShowChecks mt-3 mx-5">
                    <div class="d-flex">
                        <h4 class="mt-1">Checks</h4>
                        <button class="ms-2 btn btn-dark" data-bs-toggle="modal" data-bs-target="#showChecksModal" onclick="showChecks()">Mostrar</button>
                        <button class="ms-2 btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteCheckModal" onclick="loadDeleteChecks()"><i class="bi bi-trash-fill"></i></button>
                    </div>
                </div>

                <!-- Titulo -->
                <h3 class="mt-3 fs-4 text-center">Nueva plantilla</h3>

                <div id="divStatusTemplate">

                    <!-- Mensaje de estatus del registro de la plantilla --> 
                    <!-- <h4 class="mt-2 fs-5 text-center text-success">Plantilla registrada</h4>-->
                </div>

                <!-- Abarca la tabla de la plantilla -->
                <div class="mt-1 mb-5 mx-5">

                    <div id="divNameAddTemplate">
                        <label class="form-label" for="inputNameAddTemplate">Nombre</label>
                        <input class="form-control" type="text" name="inputNameAddTemplate" id="inputNameAddTemplate" placeholder="Ingresa el nombre de la plantilla">
                    </div>

                    <div id="divCategoryAddTemplate" class="mt-2">
                        <label class="form-label" for="selectCategoryAddTemplate">Categoria</label>
                        <select class="form-select" name="selectCategoryAddTemplate" id="selectCategoryAddTemplate">
                            
                            <!-- Categorias --> 

                        </select>
                    </div>

                    <div class="table-responsive mt-2">

                        <table id="tableTemplate" class="text-center" style="width:100%;">

                            <thead>
                                <tr>
                                    <th class="col-8 p-2 bg-secondary text-white" scope="col">CHECKS</th>
                                    <th class="col-4 p-2 bg-secondary text-white" scope="col">OPCIONES</th>
                                </tr>
                            </thead>

                            <!--<tbody id="tbodyTemplate">-->

                                <!-- Contenido de la plantilla --> 

                            <!--</tbody>-->

                        </table>
                    </div>

                    <div id="divDownAddTemplate" class="mt-2 text-center">

                        <!-- Se muestra el botón para registrar plantilla o mensaje --> 

                    </div>

                </div>

            </div>

            <!-- Segunda división -->
            <div class="divChecks" style="width: 35%;">

                <div class="mt-2 me-3">
                    
                    <div class="d-flex">

                        <h4 class="ms-2 fs-5">Checks</h4>
                        
                        <button class="btn btn-dark btn-sm ms-2 mb-1" type="button" data-bs-toggle="modal" data-bs-target="#addCheckModal"><i class="bi bi-plus-circle"></i></button>
                        
                        <button class="btn btn-danger btn-sm ms-2 mb-1" type="button" data-bs-toggle="modal" data-bs-target="#deleteCheckModal" onclick="loadDeleteChecks()"><i class="bi bi-dash-circle"></i></button>

                    </div>

                    <div class="table-responsive">
                        <table id="tableChecks" class="text-center" style="width:100%;">
                            <thead>
                                <tr>
                                    <th class="col-8 p-2 bg-black text-white" scope="col">CHECK</th>
                                    <th class="col-4 p-2 bg-black text-white" scope="col">AGREGAR</th>
                                </tr>
                            </thead>

                            <tbody id="tbodyChecks">

                                <!-- Registros de checks -->
                                
                            </tbody>
                        </table>

                        <div id="divMessageTableChecks" class="mt-2 text-center text-danger">
                            <!-- Mensaje de error -->
                        </div>
                        
                    </div>
                </div>

            </div>

        </div>
        
    </div>

    <!-- Modales -->
    <?php
        include 'Modals/addCategory.php';
        include 'Modals/showChecks.php';
        include 'Modals/addCheck.php';
        include 'Modals/deleteCheck.php';
    ?>

    <!-- Scripts -->
    <script src="../../../assets/js/jquery/jquery.min.js"></script>
    <script src="../../../assets/js/bootstrap/bootstrap.bundle.js"></script>
    <script src="../../../assets/js/superadmin/templates.js"></script>
</body>
</html>
