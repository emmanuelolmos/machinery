<!-- Modal -->
<div class="modal fade" id="editMaintenanceModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editMaintenanceModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="editMaintenanceModalLabel">Mantenimiento</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

        <!-- Formulario --> 
        <form id="formEditMaintenanceModal" enctype="multipart/form-data">

            <div id="errorMessageMaintenanceModal" class="text-center">
                <!--Mensaje de error-->
            </div>

            <label class="form-label">Frecuencia asignada</label>

            <!-- Input y select --> 
            <div class="d-flex">
                <div style="width: 35%;">
                    <input class="form-control" id="inputNumberEditMaintenanceModal" name="inputNumberEditMaintenanceModal" type="number" min="1" value="1">
                </div>
                <div style="width: 65%;">
                    <select class="form-select" id="selectEditMaintenanceModal" name="selectEditMaintenanceModal">
                        <option value="1">Dia(s)</option>
                        <option value="2">Semana(s)</option>
                        <option value="3">Mes(es)</option>
                    </select>
                </div>
            </div>

            <div class="text-center mt-3">
                <button type="submit" class="btn btn-primary">Editar</button>
            </div>

        </form>

        </div>
        
        </div>
    </div>
</div>