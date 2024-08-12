<!-- Modal -->
<div class="modal fade" id="showReportOptionsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="showReportOptionsModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="showReportOptionsModalLabel">Opciones de reporte</h1>
            <button type="button" class="btn-close" onclick="" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

            <div id="spaceShowReportOptionsModal">

                <div id="divIdMachineShowReportOptionsModal">
                    <!-- Input con el valor del id --> 
                </div>

                <div class="text-center">
                    <button class="btn btn-primary" onclick="generateLastReport()">Último reporte</button>
                    <button class="btn btn-primary ms-3" onclick="generateGeneralReport()">Reporte general</button>
                </div>

            </div>

        </div>
        
        </div>
    </div>
</div>