<!-- Modal -->
<div class="modal fade" id="editMachineModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editMachineModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="editMachineModalLabel">Editar maquina</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

            <form id="formEditMachineModal" enctype="multipart/form-data">
                <div id="divIdEditMachineModal">
                    <!--Id oculto-->
                </div>
                <div id="errorMessageEditMachineModal" class="text-center">
                    <!--Mensaje de error-->
                </div>
                <div id="divNameEditMachineModal" class="">
                    <label class="form-label" for="inputNameEditMachineModal">Nombre:</label>
                    <!--<input id="inputNameEditMachineryModal" name="inputNameEditMachineryModal" type="text" placeholder="Ingresa el nombre" style="margin-left: 8px; width: 250px;">-->
                </div>
                <div id="divMarkEditMachineModal" class="mt-3">
                    <label class="form-label" for="inputMarkEditMachineModal">Marca:</label>
                    <!--<input id="inputMarkEditMachineryModal" name="inputMarkEditMachineryModal" type="text" placeholder="Ingresa la marca" style="margin-left: 8px; width: 250px;">-->
                </div>
                <div id="divModelEditMachineModal" class="mt-3">
                    <label class="form-label" for="inputModelEditMachineModal">Modelo:</label>
                    <!--<input id="inputModelEditMachineryModal" name="inputModelEditMachineryModal" type="text" placeholder="Ingresa el modelo" style="margin-left: 8px; width: 250px;">-->
                </div>
                <div id="divSerieEditMachineModal" class="mt-3">
                    <label class="form-label" for="inputSerieEditMachineModal">Número de serie:</label>
                    <!--<input id="inputSerieEditMachineryModal" name="inputSerieEditMachineryModal" type="text" placeholder="Ingresa el número de serie" style="margin-left: 8px; width: 250px;">-->
                </div>
                <div id="divDescriptionEditMachineModal" class="mt-3">
                    <label class="form-label" for="inputDescriptionEditMachineModal">Observaciones:</label>
                    <!--Observaciones-->
                </div>
                <div id="divDateEditMachineModal" class="mt-3">
                    <label class="form-label" for="inputDateEditMachineModal">Fecha de compra:</label>
                    <!--<input id="inputDateEditMachineryModal" name="inputDateEditMachineryModal" type="date" required pattern="\d{4}-\d{2}-\d{2}" style="margin-left: 8px; width: 250px;">-->
                </div>
                <div id="divCompanyEditMachine" class="mt-3">
                    <label class="form-label" for="role">Empresa:</label>
                    <!--Empresas-->
                </div>
                <div class="mt-3">
                    <label class="form-label" for="inputImageEditMachineModal">Imagen:</label>
                    <input class="form-control" id="inputImageEditMachineModal" name="inputImageEditMachineModal" type="file" accept="image/*">
                </div>

                <div id="divImageEditMachineModal" class="row text-center mt-4">
                    <label for="imageEditMachineModal" class="form-label mb-2">Imagen actual</label>
                    <!--<img id="imageEditMachineryModal" class="mx-auto" src="../../../../assets/img/default.png" style="width: 350px; height:200px;" alt="">-->
                </div>
                
                <div class="text-center mt-3">
                    <button type="submit" class="btn btn-primary">Registrar</button>
                </div>
            </form>

        </div>
        
        </div>
    </div>
</div>