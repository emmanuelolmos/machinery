<!-- Modal -->
<div class="modal fade" id="showListReportsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="showListReportsModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="showListReportsModalLabel">Reportes</h1>
            <button type="button" class="btn-close" onclick="" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

            <div id="spaceShowListReportsModal">

                <div class="table-responsive text-center mt-3 mb-1" style="max-height: 650px; overflow-y: auto;">
                    <table id="tableReportsMaintenanceModal" class="" style="width: 100%;">
                        <thead class="bg-success text-white">
                            <tr class="">
                                <th class="p-2" style="width: 60%;">Maquinas</th>
                                <th class="p-2" style="width: 40%;">Generar reporte</th>
                            </tr>
                        </thead>
                            
                        <!-- tbody --> 
                    </table>
                </div>

                <div id="divMessageEmptyListReportsMaintenanceModal" class="mb-3">
                    <!-- Mensaje de vacío --> 
                </div>

            </div>

        </div>
        
        </div>
    </div>
</div>