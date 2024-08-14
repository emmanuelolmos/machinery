<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">

    <a class="navbar-brand" href="<?php echo $env["APP_URL"]; ?>">MAQUINAS</a>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">

      <ul class="navbar-nav me-auto mb-2 mb-lg-0">

        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="<?php echo $env["APP_URL"] . '/app/Views/Technical/machines.php'; ?>">Maquinas</a>
        </li>

        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="<?php echo $env["APP_URL"] . '/app/Views/Technical/templates.php'; ?>">Plantillas</a>
        </li>

        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="<?php echo $env["APP_URL"] . '/app/Views/Technical/maintenance.php'; ?>">Mantenimiento</a>
        </li>

      </ul>

      <ul class="navbar-nav">
      <?php 

        require "../../Models/User/Maintenance.php";

        $maintenance = new Maintenance();
        $maintenances = $maintenance->getAllMaintenancesAlert();

        if($maintenances != 'Error' || $maintenances != 'Empty'){
          echo '
          <li id="alertMaintenances" class="nav-item dropdown">
            <a class="nav-link text-danger" href="' . $env["APP_URL"] . '/app/Views/Technical/maintenance.php" role="button">
              <i class="bi bi-exclamation-circle-fill"></i>
            </a>
          </li>
          ';
        }

      ?>

            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="bi bi-person-circle"></i> <?php echo $_SESSION['name_user'] ?>
                </a>
                <div class="dropdown-menu " style="width: 0px;">
                    <a class="dropdown-item text-center" href="<?php echo $env["APP_URL"] . '/app/Controllers/Login/SessionController.php?function=exitSession'; ?>">
                        <i class="bi bi-box-arrow-right"></i> Cerrar Sesión
                    </a>
                </div>
            </li>
        </ul>

    </div>

  </div>
</nav>