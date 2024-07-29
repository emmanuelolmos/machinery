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
                <div class="">
                    <label class="form-label" for="inputNameAddMachineModal">Nombre:</label>
                    <input class="form-control" id="inputNameAddMachineModal" name="inputNameAddMachineModal" type="text" placeholder="Ingresa el nombre">
                </div>
                <div class="mt-3">
                    <label class="form-label" for="inputMarkAddMachineModal">Marca:</label>
                    <input class="form-control" id="inputMarkAddMachineModal" name="inputMarkAddMachineModal" type="text" placeholder="Ingresa la marca">
                </div>
                <div class="mt-3">
                    <label class="form-label" for="inputModelAddMachineModal">Modelo:</label>
                    <input class="form-control" id="inputModelAddMachineModal" name="inputModelAddMachineModal" type="text" placeholder="Ingresa el modelo">
                </div>
                <div class="mt-3">
                    <label class="form-label" for="inputSerieAddMachineModal">Número de serie:</label>
                    <input class="form-control" id="inputSerieAddMachineModal" name="inputSerieAddMachineModal" type="text" placeholder="Ingresa el número de serie">
                </div>
                <div class="mt-3">
                    <label class="form-label" for="inputDescriptionAddMachineModal">Observaciones:</label>
                    <textarea class="form-control" id="inputDescriptionAddMachineModal" name="inputDescriptionAddMachineModal" placeholder="Ingresa las observaciones"></textarea>
                </div>
                <div class="mt-3">
                    <label class="form-label" for="inputDateAddMachineModal">Fecha de compra:</label>
                    <input class="form-control" id="inputDateAddMachineModal" name="inputDateAddMachineModal" type="date" required pattern="\d{4}-\d{2}-\d{2}">
                </div>
                <div class="mt-3">
                    <label class="form-label" for="inputImageAddMachineModal">Imagen:</label>
                    <input class="form-control" id="inputImageAddMachineModal" name="inputImageAddMachineModal" type="file" accept="image/*">
                </div>
                
                <div class="text-center mt-4">
                    <button type="submit" class="btn btn-primary">Registrar</button>
                </div>
            </form>

        </div>
        
        </div>
    </div>
</div>