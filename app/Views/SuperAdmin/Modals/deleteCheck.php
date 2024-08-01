<!-- Modal -->
<div class="modal fade" id="deleteCheckModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="deleteCheckModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="deleteCheckModalLabel">Eliminar check</h1>
            <button type="button" class="btn-close" onclick="" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

            <div class="table-responsive">

                <div id="divMessageDeleteStatusChecksModal" class="text-center">
                    <!-- Mensaje de error -->
                </div>

                <table id="tableDeleteChecksModal" class="text-center" style="width:100%;">
                    <thead>
                        <tr>
                            <th class="col-8 p-2 bg-black text-white" scope="col">CHECK</th>
                            <th class="col-4 p-2 bg-black text-white" scope="col">AGREGAR</th>
                        </tr>
                    </thead>

                    <tbody id="tbodyDeleteChecksModal">

                        <!-- Registros de checks -->        

                    </tbody>
                </table>

                <div id="divMessageDeleteTableChecksModal" class="mt-2 text-center text-danger">
                    <!-- Mensaje de error -->
                 </div>
            </div>

        </div>
        
        </div>
    </div>
</div>