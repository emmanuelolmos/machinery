<!-- Modal -->
<div class="modal fade" id="showReportOptionsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="showReportOptionsModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="showReportOptionsModalLabel">Opciones de reporte</h1>
            <button type="button" class="btn-close" onclick="deleteMessageReportOptions()" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

            <div id="spaceShowReportOptionsModal">

                <div id="divIdMachineShowReportOptionsModal">
                    <!-- Input con el valor del id --> 
                </div>

                <div id="divMessageErrorMachineShowReportOptionsModal">
                    <!-- Error --> 
                </div>

                <div>

                    <div class="text-center">
                        <label>Último mantenimiento:</label>
                        <button onclick="generateLastReport()" class="btn btn-dark ms-2"><i class="bi bi-filetype-pdf"></i></button>
                    </div>

                    <div class="mt-3">

                        <h2 class="fs-6 text-center">Por rango de fechas</h2>
                        
                        <div>
                            <label class="form-label">Desde: </label>
                            <input id="inputStartDateShowReportOptionsModal" class="form-control" type="date">
                        </div>

                        <div class="mt-2">
                            <label class="form-label">Hasta: </label>
                            <input id="inputEndDateShowReportOptionsModal" class="form-control" type="date">
                        </div>

                        <div class="text-center mt-3">
                            <button type="button" onclick="generateGeneralReport()" class="btn btn-dark">Generar reporte</button>
                        </div>

                    </div>

                </div>

            </div>

        </div>
        
        </div>
    </div>
</div>