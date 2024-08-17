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

//Se obtienen los modelos necesarios
require "../../Models/SuperUser/Machine.php";
require "../../Models/SuperUser/Company.php";
require "../../Models/SuperUser/Report.php";
require "../../Models/SuperUser/User.php";
require "../../Models/SuperUser/Image.php";

// Carga de archivo .env
$env = parse_ini_file('../../../.env');

ob_start();

//Se obtienen las variables
$id_machine = $_POST['id_machine'];
$start_date = $_POST['start_date'];
$end_date = $_POST['end_date'];

//Se obtiene la información necesaria

$machine = new Machine();
$machineFound = $machine->getMachineItem($id_machine);

$company = new Company();
$companyFound = $company->getCompanyItem($machineFound['company_id']);

$report = new Report();
$reports = $report->getReportsForDates($start_date, $end_date, $id_machine);

?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte</title>
    <style>

        @page {
            margin-top: 1.75cm;
        }

        body {
            font-family: Arial, sans-serif;
        }

        .titleReport {
            font-size: 24px;
            text-align: center;
            margin-top: -30px;
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
            height: auto;
            width: 250px;
            margin: 0 auto;
        }

        .divSpaceMaintenances{
            margin-top: 10px;
        }

        .divContainerChecksObserv {
            display: table; 
            width: 100%; 
            margin-top: -20px;
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
            margin-right: 20px;
            margin-bottom: 10px;
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

            <h1 class="titleReport">REPORTE DE MANTENIMIENTOS</h1>

            <div class="divContainerGeneralInfo">

                <div class="divGeneralInfo">

                    <p class="subtitleReport pGeneralInfo textCenter">DATOS DE LA MAQUINA</p>

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
                        </tbody>
                    </table>

                </div>

                <div class="divImg">
                    <img class="imgMachine" src="http://tallergeorgio.hopto.org:5613/tallergeorgio/imagenes/maquinas/<?php echo $machineFound['image_machine']; ?>">
                </div>

            </div>

            <?php

                $page = '';

                for($i = 0; $i < count($reports); $i++){

                    //Se obtiene la información de cada mantenimiento 

                    $user = new User();
                    $userFound = $user->getUser($reports[$i]['user_id']);

                    $report_contents = $report->getReportContent($reports[$i]['id_report']);

                    $image = new Image();
                    $images = $image->getImagesForReport($reports[$i]['id_report']);

                    //Se imprime la información
                    $page = $page . 
                    '<div class="divSpaceMaintenances">'.
                        '<hr>'.
                        '<p>Mantenimiento del ' . $reports[$i]['madeDate_report'] . '</p>'.
                        '<p>Realizado por: ' . $userFound['name_user'] . '</p>'.
                        '<div class="divContainerChecksObserv">'.
                            '<div class="divChecks">'. 
                                '<div class="divTableChecks">'.
                                    '<table>'. 
                                        '<thead>'.
                                            '<tr class="bgBlack">'.
                                                '<th class="textCenter">CHECKS REALIZADOS</th>'.
                                            '</tr>'.
                                        '</thead>'.
                                        '<tbody>';
                     
                                        for($j = 0; $j < count($report_contents); $j++){
                                            $page = $page.'<tr><td class="textCenter">' . $report_contents[$j]['assigned_check_content'] . '</td></tr>';
                                        }
                    $page = $page .
                                        '</tbody>'.
                                    '</table>'.
                                '</div>'.
                            '</div>'.
                            '<div class="divObservation">'.
                                '<p class="subtitleReport pObservation">OBSERVACIONES</p>'.
                                '<p class="pObservationContent">' . $reports[$i]['observation_report'] . '</p>'.
                            '</div>'.
                        '</div>'.
                        '<div class="divContentImgEvidence">'. 
                            '<p class="subtitleReport pEvidence">EVIDENCIAS DEL MANTENIMIENTO</p>'.
                            '<div class="divImgEvidence">';
                            for($k = 0; $k < count($images); $k++){
                                $page = $page . '<img class="imgEvidence" src="http://tallergeorgio.hopto.org:5613/tallergeorgio/imagenes/maquinas/' . $images[$k]['image_evidence_image'] . '"></img>';
                            }
                    $page = $page .
                            '</div>'.
                        '</div>'.
                    '</div>';

                    
                }

                echo $page;
            ?>

            <!-- Plantilla --> 
            <!-- Espacio para colocar la información de los reportes 
            <div class="divSpaceMaintenances">

                <hr>

                -- Información del mantenimineto registrado --
                <p>Mantenimiento del 2024-08-10</p>
                <p>Realizado por: Emmanuel Olmos</p>

                -- Div para la lista de checks y las observaciones --
                <div class="divContainerChecksObserv">

                    -- Div de la lista de checks --
                    <div class="divChecks">

                        <div class="divTableChecks">
                            <table>
                                <thead>
                                    <tr class="bgBlack">
                                        <th class="textCenter">CHECKS REALIZADOS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="textCenter">Check 1</td>
                                    </tr>
                                    <tr>
                                        <td class="textCenter">Check 2</td>
                                    </tr>
                                    <tr>
                                        <td class="textCenter">Check 3</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>

                    -- Div de las observaciones --
                    <div class="divObservation">

                        <p class="subtitleReport pObservation">OBSERVACIONES</p>

                        <p class="pObservationContent">
                            El mantenimiento tuvo un costo de $1200.00 pues se necesitó de un mecánico 
                            para el cambio de bujías.
                        </p>
                    </div>

                </div>

                -- Div para mostrar las imagenes de evidencia --
                <div class="divContentImgEvidence">

                    <p class="subtitleReport pEvidence">EVIDENCIAS DEL MANTENIMIENTO</p>

                    <div class="divImgEvidence">
                        <img class="imgEvidence" src="http://tallergeorgio.hopto.org:5613/tallergeorgio/imagenes/maquinas/0cf196c7e50257bbc7548e717a859271.jpg">
                        <img class="imgEvidence" src="http://tallergeorgio.hopto.org:5613/tallergeorgio/imagenes/maquinas/0cf196c7e50257bbc7548e717a859271.jpg">
                        <img class="imgEvidence" src="http://tallergeorgio.hopto.org:5613/tallergeorgio/imagenes/maquinas/0cf196c7e50257bbc7548e717a859271.jpg">
                        <img class="imgEvidence" src="http://tallergeorgio.hopto.org:5613/tallergeorgio/imagenes/maquinas/0cf196c7e50257bbc7548e717a859271.jpg">
                    </div>

                </div>
                
            </div>--> 

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