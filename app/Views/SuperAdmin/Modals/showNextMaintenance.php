<!-- Modal -->
<div class="modal fade" id="showNextMaintenanceModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="showNextMaintenanceModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="showNextMaintenanceModalLabel">Próximos mantenimientos</h1>
            <button type="button" class="btn-close" onclick="" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

            <div id="spaceShowNextMaintenanceModal">

                <div class="table-responsive text-center mt-2 mb-1" style="max-height: 650px; overflow-y: auto;">
                    <table id="tableShowNextMaintenance" style="width: 100%;">
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

                <div id="divMessageEmptyShowNextMaintenance" class="mb-3">
                    <!-- Mensaje de vacío -->
                </div>

            </div>

        </div>
        
        </div>
    </div>
</div>