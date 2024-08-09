<!-- Modal -->
<div class="modal fade" id="showListMaintenanceModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="showListMaintenanceModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="showListMaintenanceModalLabel">Mantenimiento</h1>
        </div>
        <div class="modal-body">

        <!-- Formulario --> 
        <form id="formShowListMaintenanceModal" enctype="multipart/form-data">

            <div id="divInputIdShowListMaintenanceModal">
                <!-- Id de la maquina --> 
            </div>

            <div id="errorMessageShowListMaintenanceModal" class="text-center">
                <!--Mensaje de error-->
            </div>

            <div id="divTitleShowListMaintenanceModal">
                <!-- Nombre de la maquina --> 
            </div>

            <div class="table-responsive text-center mt-3">
                <table id="tableShowListMaintenanceModal" style="width: 100%;">
                    <thead class="bg-dark text-white">
                        <tr>
                            <th class="p-1">Checks</th>
                            <th class="p-1">Estatus</th>
                        </tr>
                    </thead>

                    <!-- tbody --> 

                </table>
            </div>

            <div id="spacedivImageShowListMaintenanceModal">
                <!-- Input para subir imagenes de evidencia --> 
            </div>

            <div id="divMessageEmptyShowListMaintenanceModal">
                <!-- Mensaje de vacío -->
            </div>

            <div class="text-center mt-3">
                <button type="button" type="button" data-bs-dismiss="modal" aria-label="Close" class="btn btn-primary">Salir</button>
            </div>

        </form>

        </div>
        
        </div>
    </div>
</div>