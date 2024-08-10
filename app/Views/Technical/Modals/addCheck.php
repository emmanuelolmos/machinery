<!-- Modal -->
<div class="modal fade" id="addCheckModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addCheckModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="addCheckModalLabel">Nuevo check</h1>
            <button type="button" class="btn-close" onclick="deleteMessageAddCheck()" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

            <form id="formAddCheckModal" enctype="multipart/form-data">
                <div id="errorMessageAddCheckModal" class="text-center">
                    <!--Mensaje de error-->
                </div>
                <div class="">
                    <label class="form-label" for="inputContentAddCheck">Contenido:</label>
                    <input class="form-control" id="inputContentAddCheck" name="inputContentAddCheck" type="text" placeholder="Ingresa el contenido del check">
                </div>
                <div class="text-center mt-4">
                    <button type="submit" class="btn btn-primary">Registrar</button>
                </div>
            </form>

        </div>
        
        </div>
    </div>
</div>