<nav class="navbar navbar-expand-md navbar-light bg-light">
    <div class="container-fluid">
        <a class="navbar-brand mb-0 h1" href="<?php echo $env["APP_URL"]; ?>">MAQUINAS</a>

        <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarMachines">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarMachines">

            <!-- Contenedor derecho -->
            <ul class="navbar-nav ms-auto d-flex align-items-start">
                <li class="nav-item">
                    <p class="nav-link me-2 mt-md-3 fw-bold" style="font-size: 17px;" href=""><?php echo $_SESSION['name_user'] ?></p>
                </li>

                <!-- Alertas de mantenimientos pendientes --> 
                <?php 
                    require "../../Models/SuperUser/Maintenance.php";

                    $maintenance = new Maintenance();
                    $maintenances = $maintenance->getAllMaintenances();
            
                    if($maintenances != 'Error' && $maintenances != 'Empty'){

                        $numberMaintenances = count($maintenances);

                        echo '
                        <li class="nav-item">
                            <a href="' . $env["APP_URL"] . '/app/Views/SuperAdmin/maintenance.php" class="nav-link d-flex position-relative mt-md-3 me-2">
                                <i class="bi bi-bell-fill text-dark" style="font-size: 20px;"></i>
                                <span class="badge bg-danger position-absolute translate-middle p-1 rounded-circle" style="font-size: 10px; top: 10px; right: -10px;">' . $numberMaintenances . '</span>
                            </a>
                        </li>
                      ';
                    }else{

                        if($maintenances == 'Empty'){

                            echo '
                                <li class="nav-item">
                                    <a data-bs-toggle="modal" data-bs-target="#messageMaintenanceModal" class="nav-link d-flex position-relative mt-md-3 me-2">
                                        <i class="bi bi-bell-fill text-dark" style="font-size: 20px;"></i>
                                    </a>
                                </li>
                                ';
                        }

                    }
                ?>

                <li class="nav-item">
                    <a href="<?php echo $env["APP_URL"] . '/app/Controllers/Login/SessionController.php?function=exitSession'; ?>" class="nav-link mt-md-3">
                        <i class="bi bi-box-arrow-right text-dark" style="font-size: 24px;"></i>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
