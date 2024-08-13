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

//Se obtienen los modelos necesarios
require "../../Models/User/Machine.php";
require "../../Models/User/Company.php";
require "../../Models/User/Report.php";
require "../../Models/User/User.php";
require "../../Models/User/Image.php";

// Carga de archivo .env
$env = parse_ini_file('../../../.env');

//Se recupera el id de la maquina
$id_machine = $_POST['id_machine'];

//Se obtiene la información necesaria

$machine = new Machine();
$machineFound = $machine->getMachineItem($id_machine);

$company = new Company();
$companyFound = $company->getCompanyItem($machineFound['company_id']);

$report = new Report();
$reports = $report->getLastReport($id_machine);
$reportFound = $reports[0];

$user = new User();
$userFound = $user->getUser($reportFound['user_id']);

$report_contents = $report->getReportContent($reportFound['id_report']);

$image = new Image();
$images = $image->getImagesForReport($reportFound['id_report']);

ob_start();

?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        .titleReport {
            font-size: 24px;
            text-align: center;
            margin-top: 0px;
        }

        .divContainerGeneralInfo {
            display: table; 
            width: 100%; 
            margin-top: 30px;
        }

        .divInfo {
            display: table-cell;
        }

        .pGeneralInfo {
            margin-top: -1px; 
            padding: 5px;
        }

        .tableData {
            margin-top: -16px;
        }

        .divImg {
            display: table-cell; 
            text-align: center; 
            width: 40%;
        }

        .imgMachine {
            height: 150px;
            width: 250px;
            margin-top: 60px;
        }

        .divContainerChecksObserv {
            display: table; 
            width: 100%; 
            margin-top: 20px;
        }

        .divChecks {
            display: table-cell; width: 50%;
        }

        .divTableChecks {
            margin-top: 20px;
        }

        .divObservation {
            display: table-cell; 
            width: 50%;
        }

        .pObservation {
            padding: 8px; 
            margin-top: 20px; 
            margin-left: 20px;
        }

        .pObservationContent {
            margin-left: 20px; 
            text-align: justify;
        }

        .divContentImgEvidence {
            margin-top: 10px;
        }

        .divImgEvidence {
            margin-top: 60px;
        }

        .pEvidence {
            padding: 8px;
        }

        .imgEvidence {
            height: 200px;
            width: 150px;
            margin-right: 20px;
        }

        .subtitleReport {
            font-weight: bold; 
            background-color: black; 
            color: white;
        }

        .textCenter {
            text-align: center;
        }

        .textBold {
            font-weight: bold;
        }

        .bgBlack {
            background-color: black;
            color: white;
        }

        table {
            border-collapse: collapse;
            margin: 0 auto;
            width: 100%;
            max-width: 600px;
        }

        table, th, td {
            border: 1px solid black;
        }

        th, td {
            padding: 8px;
            text-align: left;
        }
    </style>
</head>

<body>
    <div id="spaceShowReport">

        <div id="divShowLastReport">

            <h1 class="titleReport">REPORTE DE MANTENIMIENTO</h1>

            <div class="divContainerGeneralInfo">

                <div class="divGeneralInfo">

                    <p class="subtitleReport pGeneralInfo textCenter">DATOS DEL MANTENIMIENTO</p>

                    <table class="tableData">
                        <tbody>
                            <tr>
                                <td class="textBold">Nombre:</td>
                                <td><?php echo $machineFound['name_machine']; ?></td>
                            </tr>
                            <tr>
                                <td class="textBold">Marca:</td>
                                <td><?php echo $machineFound['mark_machine']; ?></td>
                            </tr>
                            <tr>
                                <td class="textBold">Modelo:</td>
                                <td><?php echo $machineFound['model_machine']; ?></td>
                            </tr>
                            <tr>
                                <td class="textBold">Serie:</td>
                                <td><?php echo $machineFound['serie_machine']; ?></td>
                            </tr>
                            <tr>
                                <td class="textBold">Empresa:</td>
                                <td><?php echo $companyFound['name_company']; ?></td>
                            </tr>
                            <tr>
                                <td class="textBold">Realizado por:</td>
                                <td><?php echo $userFound['name_user']; ?></td>
                            </tr>
                            <tr>
                                <td class="textBold">Fecha:</td>
                                <td><?php echo $reportFound['madeDate_report']; ?></td>
                            </tr>
                        </tbody>
                    </table>

                </div>

                <div class="divImg">
                    <img class="imgMachine" src="http://tallergeorgio.hopto.org:5613/tallergeorgio/imagenes/maquinas/<?php echo $machineFound['image_machine']; ?>">
                </div>

            </div>

            <div class="divContainerChecksObserv">

                <div class="divChecks">

                    <div class="divTableChecks">
                        <table>
                            <thead>
                                <tr class="bgBlack">
                                    <th class="textCenter">CHECKS REALIZADOS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php 
                                    for($i = 0; $i < count($report_contents); $i++){
                                        echo '<tr><td class="textCenter">' . $report_contents[$i]['assigned_check_content'] . '</td></tr>';
                                    }
                                ?>
                            </tbody>
                        </table>
                    </div>

                </div>

                <div class="divObservation">

                    <p class="subtitleReport pObservation">OBSERVACIONES</p>

                    <p class="pObservationContent"><?php echo $reportFound['observation_report']; ?></p>

                </div>

            </div>

            <div class="divContentImgEvidence">
                <p class="subtitleReport pEvidence">EVIDENCIAS DEL MANTENIMIENTO</p>
                <div class="divImgEvidence">
                    <?php 
                        for($i = 0; $i < count($images); $i++){
                            echo '<img class="imgEvidence" src="http://tallergeorgio.hopto.org:5613/tallergeorgio/imagenes/maquinas/' . $images[$i]['image_evidence_image'] . '"></img>';
                        }
                    ?>
                </div>
            </div>

        </div>

    </div>
</body>
</html>


<?php 

    $html = ob_get_clean();

    require_once '../../../libraries/dompdf/autoload.inc.php';

    use Dompdf\Dompdf;
    $dompdf = new Dompdf();

    $options = $dompdf->getOptions();
    $options->set(array('isRemoteEnabled' => true));
    $dompdf->setOptions($options);

    $dompdf->loadHtml($html);
    $dompdf->setPaper('letter');

    $dompdf->render();

    $dompdf->stream("reporte_.pdf", array("Attachment" => false));

?>