<!-- Modal -->
<div class="modal fade" id="addMachineModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addMachineModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="addMachineModalLabel">Nueva maquina</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

            <form id="formAddMachineModal" enctype="multipart/form-data">
                <div id="errorMessageAddMachineModal" class="text-center">
                    <!--Mensaje de error-->
                </div>
                <div class="text-center">
                    <label for="inputNameAddMachineModal">Nombre:</label>
                    <input id="inputNameAddMachineModal" name="inputNameAddMachineModal" type="text" placeholder="Ingresa el nombre" style="margin-left: 8px; width: 250px;">
                </div>
                <div class="text-center mt-4">
                    <label for="inputMarkAddMachineModal">Marca:</label>
                    <input id="inputMarkAddMachineModal" name="inputMarkAddMachineModal" type="text" placeholder="Ingresa la marca" style="margin-left: 8px; width: 250px;">
                </div>
                <div class="text-center mt-4">
                    <label for="inputModelAddMachineModal">Modelo:</label>
                    <input id="inputModelAddMachineModal" name="inputModelAddMachineModal" type="text" placeholder="Ingresa el modelo" style="margin-left: 8px; width: 250px;">
                </div>
                <div class="text-center mt-4">
                    <label for="inputSerieAddMachineModal">Número de serie:</label>
                    <input id="inputSerieAddMachineModal" name="inputSerieAddMachineModal" type="text" placeholder="Ingresa el número de serie" style="margin-left: 8px; width: 250px;">
                </div>
                <div class="text-center mt-4">
                    <div class="d-flex align-items-center justify-content-center">
                        <label for="inputDescriptionAddMachineModal">Observaciones:</label>
                        <textarea id="inputDescriptionAddMachineModal" name="inputDescriptionAddMachineModal" style="margin-left: 8px; width:250px" placeholder="Ingresa las observaciones"></textarea>
                    </div>
                </div>
                <div class="text-center mt-4">
                    <label for="inputDateAddMachineModal">Fecha de compra:</label>
                    <input id="inputDateAddMachineModal" name="inputDateAddMachineModal" type="date" required pattern="\d{4}-\d{2}-\d{2}" style="margin-left: 8px; width: 250px;">
                </div>
                <div class="text-center mt-4">
                    <label for="inputImageAddMachineModal">Imagen:</label>
                    <input id="inputImageAddMachineModal" name="inputImageAddMachineModal" type="file" accept="image/*" style="margin-left: 8px; width: 250px;">
                </div>
                
                <div class="text-center mt-4">
                    <button type="submit" class="btn btn-primary">Registrar</button>
                </div>
            </form>

        </div>
        
        </div>
    </div>
</div>