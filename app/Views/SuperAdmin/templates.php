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
            <div class="divCategories" style="width: 80%;">

                <!-- Abarca las categorias-->
                <div class="mt-2 mx-5">

                    <div class="d-flex">
                        <h2 class="fs-4">Categorias</h2>
                        <button class="btn btn-dark ms-2" type="button"><i class="bi bi-plus-circle"></i></button>
                    </div>

                    <div class="card-container">
                        <!-- Categoria 1 -->
                        <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 mt-2 mb-2">
                            <div class="card">
                                <img class="mx-auto mt-1" src="../../../assets/img/iconoAuto.jpeg" style="width: 120px; height:100px;" alt="">
                                <button class="btn btn-primary btn-sm dropdown-toggle" type="button" id="dropdownCategoriesBtn" data-bs-toggle="dropdown" aria-expanded="false">Autos</button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownCategoriesBtn">
                                    <li class="dropdown-item" onclick="">Plantilla 1</li>
                                    <li class="dropdown-item" onclick="">Plantilla 2</li>
                                    <li class="dropdown-item" onclick="">Plantilla 3</li>
                                </ul>
                            </div>
                        </div>

                        <!-- Categoria 2 -->
                        <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 mt-2 mb-2">
                            <div class="card">
                                <img class="mx-auto mt-1" src="../../../assets/img/iconoCamion.jpg" style="width: 120px; height:100px;" alt="">
                                <button class="btn btn-primary btn-sm dropdown-toggle" type="button" id="dropdownCategoriesBtn" data-bs-toggle="dropdown" aria-expanded="false">Camiones</button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownCategoriesBtn">
                                    <li class="dropdown-item" onclick="">Plantilla 4</li>
                                    <li class="dropdown-item" onclick="">Plantilla 5</li>
                                    <li class="dropdown-item" onclick="">Plantilla 6</li>
                                </ul>
                            </div>
                        </div>

                        <!-- Categoria 3 -->
                        <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 mt-2 mb-2">
                            <div class="card">
                                <img class="mx-auto mt-1" src="../../../assets/img/iconoTrailer.avif" style="width: 120px; height:100px;" alt="">
                                <button class="btn btn-primary btn-sm dropdown-toggle" type="button" id="dropdownCategoriesBtn" data-bs-toggle="dropdown" aria-expanded="false">Trailers</button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownCategoriesBtn">
                                    <li class="dropdown-item" onclick="">Plantilla 7</li>
                                    <li class="dropdown-item" onclick="">Plantilla 8</li>
                                    <li class="dropdown-item" onclick="">Plantilla 9</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- Titulo -->
                <h3 class="mt-1 fs-4 text-center">Nueva plantilla</h3>

                <!-- Abarca la tabla de la plantilla -->
                <div class="mt-1 mb-5 mx-5">

                    <div class="table-responsive">

                        <table class="text-center" style="width:100%;">

                            <thead>
                                <tr>
                                    <th class="col-8 p-2 bg-secondary text-white" scope="col">CHECK</th>
                                    <th class="col-4 p-2 bg-secondary text-white" scope="col">OPCIONES</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td style="padding: 10px;">Limpiar con trapo</td>
                                    <td style="padding: 10px;">
                                        <button class="btn btn-success" onclick="loadDataUser()" data-bs-toggle="modal" data-bs-target="#editUserModal">
                                            <i class="bi bi-pencil-fill"></i>
                                        </button>
                                        <button class="btn btn-danger" onclick="removeUser()">
                                            <i class="bi bi-trash-fill"></i>
                                        </button>
                                    </td>
                                    
                                </tr>

                                <tr>
                                    <td style="padding: 10px;">Cambiar cartuchos</td>
                                    <td style="padding: 10px;">
                                        <button class="btn btn-success" onclick="loadDataUser()" data-bs-toggle="modal" data-bs-target="#editUserModal">
                                            <i class="bi bi-pencil-fill"></i>
                                        </button>
                                        <button class="btn btn-danger" onclick="removeUser()">
                                            <i class="bi bi-trash-fill"></i>
                                        </button>
                                    </td>
                                    
                                </tr>
                            </tbody>

                        </table>
                    </div>

                </div>

            </div>

            <!-- Segunda división -->
            <div class="divChecks" style="width: 20%;">

                <div class="mt-2 mx-1">
                    
                    <div class="row">

                        <div class="col-12 col-sm-8">
                            <h4 class="ms-2 fs-5 text-center">Checks</h4>
                        </div>

                        <div class="col-12 col-sm-4">
                            <button class="btn btn-dark btn-sm ms-1 mb-1" type="button"><i class="bi bi-plus-circle"></i></button>
                        </div>

                    </div>

                    <div class="table-responsive">
                        <table class="text-center" style="width:100%;">
                        <thead>
                                <tr>
                                    <th class="col-8 p-2 bg-black text-white" scope="col">CHECK</th>
                                    <th class="col-4 p-2 bg-black text-white" scope="col">AGREGAR</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td style="padding: 10px;">Limpiar con trapo</td>
                                    <td class="text-center" style="padding: 10px;">
                                        <button class="btn btn-success" onclick="loadDataUser()" data-bs-toggle="modal" data-bs-target="#editUserModal">
                                            <i class="bi bi-plus-square"></i>
                                        </button>
                                    </td>
                                    
                                </tr>

                                <tr>
                                    <td style="padding: 10px;">Cambiar cartuchos</td>
                                    <td class="text-center" style="padding: 10px;">
                                        <button class="btn btn-success" onclick="loadDataUser()" data-bs-toggle="modal" data-bs-target="#editUserModal">
                                            <i class="bi bi-plus-square"></i>
                                        </button>
                                    </td>
                                    
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </div>
        
    </div>

    <!-- Modales -->
    <?php
        include 'Modals/addCategory.php';
    ?>

    <!-- Scripts -->
    <script src="../../../assets/js/jquery/jquery.min.js"></script>
    <script src="../../../assets/js/bootstrap/bootstrap.bundle.js"></script>
    <script src="../../../assets/js/superadmin/templates.js"></script>
</body>
</html>
