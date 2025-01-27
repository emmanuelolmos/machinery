<?php
session_start();

// Se verifica que el usuario haya iniciado sesión
if (!isset($_SESSION['id_user'])) {
    header('Location: ../../../');
} else {
    // Se verifica que el usuario tenga el rol correcto
    if ($_SESSION['role_id'] != 2) {
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
    <link rel="stylesheet" href="../../../assets/css/superadmin/maintenance.css">
    <script src="../../../assets/js/sweetalert/sweetalert2@11.js"></script>
    <link rel="stylesheet" href="../../../assets/css/bootstrap_icons/font/bootstrap-icons.css">
</head>
<body>

    <?php include 'Components/navbar.php'; ?>

    <div class="card shadow mt-4 mb-5 mx-5">
        
        <div class="d-flex mb-4">

            <div id="divAlarms" class="divAlarms mx-2" style="width: 100%;">
                
                <div>
                    <h2 class="text-center mt-4 fs-3">Mantenimientos pendientes</h2>

                    <div class="mt-5">

                        <!-- Botones para mostrar Reportes y Pendientes --> 
                        <div class="divButtonsRP">
                            <div class="divButtonsRP ms-5">
                                <button onclick="showNextMaintenancesModal()" class="btn btn-primary">Próximos</button>
                            </div>
                        </div>

                        <div class="table-responsive text-center mt-3 mx-2" style="max-height: 650px; overflow-y: auto;">
                            <table id="tableMaintenance" style="width: 100%;">
                                <thead class="bg-dark text-white">
                                    <tr>
                                        <th class="p-2" style="width: 60%;">Maquina</th>
                                        <th class="p-2" style="width: 20%;">Fecha</th>
                                        <th class="p-2" style="width: 20%;">Checks</th>
                                    </tr>
                                </thead>
                                
                                <!-- tbody --> 
                            </table>
                        </div>

                        <div id="divMessageEmptyListMaintenance">
                            <!-- Mensaje de vacío --> 
                        </div>
                    </div>
                </div>

            </div>

            <div id="divNextMaintenance" class="divNextMaintenance mx-3" style="width: 50%;">
                <div>
                    <h3 class="text-center mt-4 fs-3">Próximos</h3>

                    <br>

                    <div class="table-responsive text-center mt-3" style="max-height: 650px; overflow-y: auto;">
                        <table id="tableNextMaintenance" style="width: 100%;">
                            <thead class="bg-success text-white">
                                <tr>
                                    <th class="p-2" style="width: 60%;">Maquinas</th>
                                    <th class="p-2" style="width: 25%;">Fecha</th>
                                    <th class="p-2" style="width: 15%;">Mostrar</th>
                                </tr>
                            </thead>
                            
                            <!-- tbody --> 
                        </table>
                    </div>

                    <div id="divMessageEmptyNextMaintenance">
                        <!-- Mensaje de vacío -->
                    </div>
                </div>
            </div>

        </div>

    </div>

    <!-- Modales -->
    <?php
        include 'Modals/showListMaintenance.php';
        include 'Modals/showNextMaintenance.php';
        include 'Modals/showListReportsModal.php';
        include 'Modals/showReportOptionsModal.php';
        include 'Modals/messageMaintenanceModal.php';
    ?>

    <!-- Scripts -->
    <script src="../../../assets/js/jquery/jquery.min.js"></script>
    <script src="../../../assets/js/bootstrap/bootstrap.bundle.js"></script>
    <script src="../../../assets/js/user/maintenance.js"></script>
</body>
</html>
