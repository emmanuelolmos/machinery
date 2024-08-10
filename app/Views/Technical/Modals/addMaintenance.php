<!-- Modal -->
<div class="modal fade" id="addMaintenanceModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addMaintenanceModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="addMaintenanceModalLabel">Mantenimiento</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

        <!-- Formulario --> 
        <form id="formAddMaintenanceModal" enctype="multipart/form-data">

            <div id="errorMessageMaintenanceModal" class="text-center">
                <!--Mensaje de error-->
            </div>

            <label class="form-label">Asignación de frecuencia</label>

            <!-- Input y select --> 
            <div class="d-flex">
                <div style="width: 35%;">
                    <input class="form-control" id="inputNumberAddMaintenanceModal" name="inputNumberAddMaintenanceModal" type="number" min="1" value="1">
                </div>
                <div style="width: 65%;">
                    <select class="form-select" id="selectAddMaintenanceModal" name="selectAddMaintenanceModal">
                        <option value="days">Dia(s)</option>
                        <option value="weeks">Semana(s)</option>
                        <option value="months">Mes(es)</option>
                    </select>
                </div>
            </div>

            <div class="text-center mt-3">
                <button type="submit" class="btn btn-primary">Registrar</button>
            </div>

        </form>

        </div>
        
        </div>
    </div>
</div>