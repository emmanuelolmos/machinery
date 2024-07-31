<!-- Modal -->
<div class="modal fade" id="addCategoryModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addCategoryModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="addCategoryModalLabel">Crear nueva categoria</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

                <form id="formAddCheck">
                    
                    <div>
                        <label class="form-label" for="inputNameAddCategory">Nombre</label>
                        <input class="form-control" type="text" placeholder="Ingresa el nombre de la categoria">
                    </div>

                    <div class="mt-2">
                        <label class="form-label" for="inputImageAddCategory">Icono</label>
                        <input class="form-control" id="inputImageAddCategory" name="inputImageAddCategory" type="file" accept="image/*">
                    </div>
                    
                    <div class="text-center mt-3">
                        <button class="btn btn-primary text-center" type="submit">Crear</button>
                    </div>
                </form>

            </div>
        </div>
    </div>
</div>